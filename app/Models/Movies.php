<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Movies extends Pivot
{
    protected $table = 'movie';

    protected $fillable = [
        'title',
        'description',
        'poster_path',
        'release_date',
        'runtime',
        'overview',
    ];

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genres__movie', 'movie_id', 'genre_id');
    }
}
