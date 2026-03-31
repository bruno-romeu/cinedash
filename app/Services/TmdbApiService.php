<?php

namespace App\Services;

use App\Clients\TmdbClient;
use Illuminate\Support\Facades\Cache;

class TmdbApiService
{
    public function __construct(protected TmdbClient $client) {}

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
                    return [
                        'id' => $movie['id'],
                        'title' => $movie['title'],
                        'poster' => 'https://image.tmdb.org/t/p/w500' . $movie['poster_path'],
                        'release_date' => substr($movie['release_date'], 0, 4),
                        'genres' => collect($movie['genre_ids'])->map(function ($genreId) use ($genresMap) {
                            return $genresMap[$genreId] ?? null;
                        })->filter()->values()->toArray(),
                        'rating' => $movie['vote_average'],
                        'adult' => $movie['adult'],
                    ];
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
            return [
                'id' => $response['id'],
                'title' => $response['title'],
                'tagline' => $response['tagline'],
                'poster' => 'https://image.tmdb.org/t/p/w500' . $response['poster_path'],
                'release_date' => substr($response['release_date'], 0, 4),
                'runtime' => $response['runtime'],
                'overview' => $response['overview'],
                'rating' => $response['vote_average'],
                'genres' => collect($response['genres'] ?? [])->pluck('name')->toArray(),       
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
                    return [
                        'id' => $movie['id'],
                        'title' => $movie['title'],
                        'poster' => 'https://image.tmdb.org/t/p/w500' . $movie['poster_path'],
                        'release_date' => substr($movie['release_date'], 0, 4),
                        'rating' => $movie['vote_average'],
                        'adult' => $movie['adult'],
                        'genres' => collect($movie['genre_ids'])->map(function ($genreId) use ($genresMap) {
                            return $genresMap[$genreId] ?? null;
                        })->filter()->values()->toArray(),
                    ];
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
                return [
                    'id' => $movie['id'],
                    'title' => $movie['title'],
                    'poster' => 'https://image.tmdb.org/t/p/w500' . $movie['poster_path'],
                    'release_date' => substr($movie['release_date'], 0, 4),
                    'genres' => collect($movie['genre_ids'] ?? [])->map(function ($genreId) use ($genresMap) {
                        return $genresMap[$genreId] ?? null;
                    })->filter()->values()->toArray(),
                    'rating' => $movie['vote_average'],
                ];
            })->toArray(),
            'total_pages' => $response['total_pages'] ?? 1,
            'page' => $response['page'] ?? 1,
        ];
    }

}