<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TmdbApiService;
use Inertia\Inertia;

class MoviesController extends Controller
{
    public function index(TmdbApiService $tmdb)
    {
        return Inertia::render('Movies/Index', [
            'movies' => $tmdb->getPopularMovies(),
        ]);
    }
}
