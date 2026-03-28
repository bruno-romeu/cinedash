<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Genres_Movie extends Pivot
{
    protected $table = 'genres__movie';

    protected $fillable = [
        'movie_id',
        'genre_id',
    ];

    public function movie()
    {
        return $this->belongsTo(Movies::class, 'movie_id');
    }

    public function genre()
    {
        return $this->belongsTo(Genres::class, 'genre_id');
    }
}
