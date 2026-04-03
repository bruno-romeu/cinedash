<?php

namespace App\Services;

use App\Clients\TmdbClient;
use Illuminate\Support\Facades\Cache;

class TmdbApiService
{
    public function __construct(protected TmdbClient $client) {}

    private function mapMovie(array $movie, array $genresMap): array
    {
        return [
            'id' => $movie['id'],
            'title' => $movie['title'],
            'poster' => 'https://image.tmdb.org/t/p/w500' . $movie['poster_path'],
            'release_date' => substr($movie['release_date'], 0, 4),
            'genres' => collect($movie['genre_ids'] ?? [])->map(function ($genreId) use ($genresMap) {
                return $genresMap[$genreId] ?? null;
            })->filter()->values()->toArray(),
            'rating' => $movie['vote_average'],
            'adult' => $movie['adult'] ?? false,
        ];
    }

    public function getGenres(): array
    {
        return Cache::remember('tmdb_genres', 86400, function () {
            $response = $this->client->genresMovies();

            if (!isset($response['genres'])) {
                return [];
            }

            return collect($response['genres'])->mapWithKeys(function ($genre) {
                return [$genre['id'] => $genre['name']];
            })->toArray();
        });
    }

    public function getMovieCast(int $id): array
    {
        $response = $this->client->movieCast($id);

        if (!isset($response['cast'])) {
            return [];
        }

        return collect($response['cast'])->map(function ($cast) {
            return [
                'name' => $cast['name'] ?? null,
                'character' => $cast['character'] ?? null,
                'profile_path' => isset($cast['profile_path']) ? 'https://image.tmdb.org/t/p/w185' . $cast['profile_path'] : null,
                'order' => $cast['order'] ?? null,
            ];
        })->toArray();
    }

    public function getPopularMovies(int $page = 1): array
    {
        $response = $this->client->PopularMovies([
            'page' => $page,
        ]);

        if (!isset($response['results'])) {
            dd($response); 
        }

        $genresMap = $this->getGenres();


        return [
            'results' => collect($response['results'])
                ->filter(function ($movie) {
                    return isset($movie['adult']) && $movie['adult'] === false;
                })
                ->map(function ($movie) use ($genresMap) {
                    return $this->mapMovie($movie, $genresMap);
                })
                ->values()
                ->toArray(),
            'total_pages' => $response['total_pages'] ?? 1,
            'page' => $response['page'] ?? 1,
        ];
    }

    public function getMovieDetails(int $id): array
    {
            $response = $this->client->getMovieDetails($id);

            $reviews = $this->client->getMovieReviews($id);
    
            if (!isset($response['id'])) {
                dd($response); 
            }

            $castMap = collect($this->getMovieCast($id))->keyBy('order');

            return [
                'id' => $response['id'],
                'backdrop_path' => 'https://image.tmdb.org/t/p/w780' . $response['backdrop_path'],
                'title' => $response['title'],
                'tagline' => $response['tagline'],
                'poster' => 'https://image.tmdb.org/t/p/w500' . $response['poster_path'],
                'release_date' => substr($response['release_date'], 0, 4),
                'runtime' => $response['runtime'],
                'overview' => $response['overview'],
                'rating' => $response['vote_average'],
                'genres' => collect($response['genres'] ?? [])->pluck('name')->toArray(),  
                'cast' => $castMap->sortBy('order')->take(5)->values()->toArray(),   
                'reviews' => collect($reviews['results'])->map(function ($review) {
                    return [
                        'author' => $review['author'] ?? null,
                        'content' => $review['content'] ?? null,
                        'rating' => $review['author_details']['rating'] ?? null,
                    ];
                })->toArray(),
            ];
    }

    public function searchMovies(string $query, int $page = 1): array
    {
        $response = $this->client->searchMovies(
            $query,
            $page
        );

        if (!isset($response['results'])) {
            dd($response); 
        }

        $genresMap = $this->getGenres();

        return [
            'results' => collect($response['results'])
                ->filter(function ($movie) {
                    return isset($movie['adult']) && $movie['adult'] === false;
                })
                ->map(function ($movie) use ($genresMap) {
                    return $this->mapMovie($movie, $genresMap);
                })
                ->values()
                ->toArray(),
            'total_pages' => $response['total_pages'] ?? 1,
            'page' => $response['page'] ?? 1,
        ];
    }

    public function getMoviesByGenre(int $genreId, int $page = 1): array
    {
        $response = $this->client->moviesByGenre($genreId, $page);

        if (!isset($response['results'])) {
            dd($response); 
        }

        $genresMap = $this->getGenres();

        return [
            'results' => collect($response['results'])->map(function ($movie) use ($genresMap) {
                return $this->mapMovie($movie, $genresMap);
            })->toArray(),
            'total_pages' => $response['total_pages'] ?? 1,
            'page' => $response['page'] ?? 1,
        ];
    }

    public function getMoviesBySearchAndGenre(string $query, int|array $genreId, int $page = 1): array
    {
        $response = $this->client->searchMovies($query, $page);

        if (!isset($response['results'])) {
            dd($response);
        }

        $genresMap = $this->getGenres();
        $genreIds = array_map('intval', is_array($genreId) ? $genreId : [$genreId]);

        return [
            'results' => collect($response['results'])
                ->filter(function ($movie) {
                    return isset($movie['adult']) && $movie['adult'] === false;
                })
                ->filter(function ($movie) use ($genreIds) {
                    return !empty(array_intersect($movie['genre_ids'] ?? [], $genreIds));
                })
                ->map(function ($movie) use ($genresMap) {
                    return $this->mapMovie($movie, $genresMap);
                })
                ->values()
                ->toArray(),
            'total_pages' => $response['total_pages'] ?? 1,
            'page' => $response['page'] ?? 1,
        ];
    }

}