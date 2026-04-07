<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserMovies;
use App\Services\TmdbApiService;
use Inertia\Inertia;

class MoviesController extends Controller
{
    public function index(TmdbApiService $tmdb)
    {
        return Inertia::render('Dashboard', [
            'movies' => $tmdb->getPopularMovies(),
            'genres' => $tmdb->getGenres(),
        ]);
    }

    public function show($id, TmdbApiService $tmdb, Request $request)
    {
        $movie = $tmdb->getMovieDetails($id);

        if (!$movie) {
            return redirect()->route('dashboard')->with('error', 'Filme não encontrado.');
        }

        $userMovie = UserMovies::query()
            ->where('user_id', $request->user()->id)
            ->where('movie_id', $id)
            ->first();

        return Inertia::render('Movies/Show', [
            'movie' => $movie,
            'userMovieStatus' => [
                'isInList' => in_array($userMovie?->status, ['watchlist', 'watched'], true),
                'isWatched' => $userMovie?->status === 'watched',
            ],
        ]);
    }

    public function explore(TmdbApiService $tmdb, Request $request)
    {
        $page = $request->get('page', 1);
        $search = $request->get('search', null);
        $genre = $request->get('genre', null);

        // Permitir múltiplos ids separados por pipe (|) vindos da query string
        $genreIds = null;
        if ($genre) {
            // Se vier como string '12|18', transforma em array [12,18]
            $genreIds = is_string($genre) && str_contains($genre, '|')
                ? explode('|', $genre)
                : $genre;
        }

        if ($search && $genreIds) {
            $moviesData = $tmdb->getMoviesBySearchAndGenre($search, $genreIds, $page);
        } elseif ($genreIds) {
            $moviesData = $tmdb->getMoviesByGenre($genreIds, $page);
        } else {
            $moviesData = $search ? $tmdb->searchMovies($search, $page) : $tmdb->getPopularMovies($page);
        }

        return Inertia::render('Explore/Index', [
            'movies' => $moviesData['results'],
            'page' => $moviesData['page'],
            'search' => $search,
            'totalPages' => $moviesData['total_pages'],
            'genre' => $genre,
            'genres' => $tmdb->getGenres(),
        ]);
    }
}
