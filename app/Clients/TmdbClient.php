<?php

namespace App\Clients;

use Illuminate\Support\Facades\Http;

class TmdbClient
{
    protected string $baseUrl = 'https://api.themoviedb.org/3';

    public function get(string $endpoint, array $params = [])
    {
        return Http::withToken(config('services.tmdb.key'))
        ->get($this->baseUrl . $endpoint, $params)
        ->json();
    }

    public function discoverMovies(array $params = [])
    {
        return $this->get('/discover/movie', $params);
    }

    public function moviesTopRated(array $params = [])
    {
        return $this->get('/movie/top_rated', $params);
    }

    public function getMovieDetails(int $id)
    {
        return $this->get("/movie/{$id}");
    }

    public function getMovieReviews(int $id, array $params = [])
    {
        return $this->get("/movie/{$id}/reviews", $params);
    }
}