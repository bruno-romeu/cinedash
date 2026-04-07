<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movie_user', function (Blueprint $table) {
            $table->id();
            $table->integer('rating')->nullable();
            $table->text('review')->nullable();
            $table->enum('status', ['watched', 'watchlist'])->default('watchlist');
            $table->unsignedBigInteger('movie_id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unique(['movie_id', 'user_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_user');
    }
};
