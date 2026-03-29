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
}