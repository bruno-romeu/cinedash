<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TmdbApiService;
use Inertia\Inertia;

class MoviesController extends Controller
{
    public function index(TmdbApiService $tmdb)
    {
        return Inertia::render('Dashboard', [
            'movies' => $tmdb->getPopularMovies(),
        ]);
    }

    public function show($id, TmdbApiService $tmdb)
    {
        $movie = $tmdb->getMovieDetails($id);

        if (!$movie) {
            return redirect()->route('dashboard')->with('error', 'Filme não encontrado.');
        }

        return Inertia::render('Movies/Show', [
            'movie' => $movie,
        ]);
    }
}
