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

    public function explore(TmdbApiService $tmdb, Request $request)
    {
        $page = $request->get('page', 1);
        $moviesData = $tmdb->getPopularMovies($page);

        return Inertia::render('Explore/Index', [
            'movies' => $moviesData['results'],
            'page' => $moviesData['page'],
            'totalPages' => $moviesData['total_pages'],
        ]);
    }
}
