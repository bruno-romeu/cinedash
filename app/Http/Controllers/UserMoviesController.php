<?php

namespace App\Http\Controllers;

use App\Models\UserMovies;
use Illuminate\Http\Request;

class UserMoviesController extends Controller
{
    public function favorite(Request $request, $movieId)
    {
        UserMovies::updateOrCreate(
            ['user_id' => $request->user()->id, 'movie_id' => $movieId],
            ['status' => 'watchlist']
        );

        return redirect()->route('movies.show', ['id' => $movieId])->with('success', 'Filme adicionado a lista!');
    }

    public function watched(Request $request, $movieId)
    {
        UserMovies::updateOrCreate(
            ['user_id' => $request->user()->id, 'movie_id' => $movieId],
            ['status' => 'watched']
        );

        return redirect()->route('movies.show', ['id' => $movieId])->with('success', 'Filme marcado como assistido!');
    }
}
