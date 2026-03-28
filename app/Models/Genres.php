<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Genres extends Pivot
{
    protected $table = 'genre';

    protected $fillable = [
        'name',
    ];

    public function movies()
    {
        return $this->belongsToMany(Movies::class, 'genres__movie', 'genre_id', 'movie_id');
    }
}
