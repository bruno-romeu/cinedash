<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $foreignKeyExists = DB::table('information_schema.KEY_COLUMN_USAGE')
            ->where('TABLE_SCHEMA', DB::raw('DATABASE()'))
            ->where('TABLE_NAME', 'movie_user')
            ->where('COLUMN_NAME', 'movie_id')
            ->whereNotNull('REFERENCED_TABLE_NAME')
            ->exists();

        if ($foreignKeyExists) {
            Schema::table('movie_user', function (Blueprint $table) {
                // Existing databases may have a FK to local movies table; we persist TMDB ids instead.
                $table->dropForeign(['movie_id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('movie_user', function (Blueprint $table) {
            $table->foreign('movie_id')->references('id')->on('movie')->onDelete('cascade');
        });
    }
};
