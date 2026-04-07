<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserMovies extends Model
{
    protected $table = 'movie_user';

    protected $casts = [
        'movie_id' => 'integer',
    ];

    protected $fillable = [
        'user_id',
        'movie_id',
        'status',
        'rating',
        'review',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
