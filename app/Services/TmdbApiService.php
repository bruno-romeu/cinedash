<?php

namespace App\Services;

use App\Clients\TmdbClient;

class TmdbApiService
{
    public function __construct(protected TmdbClient $client) {}

    public function getPopularMovies(int $page = 1): array
    {
        $response = $this->client->discoverMovies([
            'sort_by' => 'popularity.desc',
            'page' => $page,
        ]);

        if (!isset($response['results'])) {
            dd($response); 
        }

        return collect($response['results'])->map(function ($movie) {
            return [
                'id' => $movie['id'],
                'title' => $movie['title'],
                'poster' => 'https://image.tmdb.org/t/p/w500' . $movie['poster_path'],
                'release_date' => substr($movie['release_date'], 0, 4),
            ];
        })->toArray();
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
                'reviews' => collect($reviews['results'])->map(function ($review) {
                    return [
                        'author' => $review['author'] ?? null,
                        'content' => $review['content'] ?? null,
                        'rating' => $review['author_details']['rating'] ?? null,
                    ];
                })->toArray(),
            ];
    }

}