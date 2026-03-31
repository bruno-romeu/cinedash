<?php

namespace App\Clients;

use Illuminate\Support\Facades\Http;

class TmdbClient
{
    protected string $baseUrl = 'https://api.themoviedb.org/3';
    protected array $defaultParams = [
        'language' => 'pt-BR',
        'region' => 'BR',
    ];

    public function get(string $endpoint, array $params = [])
    {
        return Http::withToken(config('services.tmdb.key'))
        ->get($this->baseUrl . $endpoint, array_merge($this->defaultParams, $params))
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

    public function popularMovies(array $params = [])
    {
        return $this->get('/movie/popular', $params);
    }

    public function getMovieDetails(int $id)
    {
        return $this->get("/movie/{$id}");
    }

    public function getMovieReviews(int $id, array $params = [])
    {
        return $this->get("/movie/{$id}/reviews", $params);
    }

    public function searchMovies(string $query, int $page = 1)
    {
        return $this->get('/search/movie', [
            'query' => $query,
            'page' => $page,
        ]);
    }

    public function genresMovies()
    {
        return $this->get('/genre/movie/list');
    }

    /**
     * @param int|array $genreId Pode ser um id único ou array de ids
     */
    public function moviesByGenre($genreId, int $page = 1)
    {
        // Permitir múltiplos ids separados por pipe (|)
        $withGenres = is_array($genreId) ? implode('|', $genreId) : $genreId;
        return $this->discoverMovies([
            'with_genres' => $withGenres,
            'page' => $page,
        ]);
    }
}