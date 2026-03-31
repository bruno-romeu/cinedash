import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import MovieCard from "@/Components/MovieCard";
import TextInput from "@/Components/TextInput";
import { Search } from "lucide-react";
import { useState } from "react";
import Pagination from "@/Components/Pagination";
import { router } from "@inertiajs/react";

export default function Explore({ movies, page, totalPages }) {
    const handlePageChange = (newPage) => {
        router.get(route('explore.index'), { page: newPage }, { preserveScroll: true });
    };
    return (
        <AuthenticatedLayout 
        header={
                <h2 className="text-xl font-semibold leading-tight text-surface-100">
                    Explorar 
                </h2>
            }
        >

            <Head title="Explorar" />

            <div className="flex justify-between items-center mt-4 mx-10">
                <div className="relative w-fit sm:w-64 ">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                        <Search size={18} />
                    </span>
                    <TextInput
                        id="search"
                        type="text"
                        placeholder="Buscar filmes, atores, diretores..."
                        className="pl-10 bg-surface-700/50 text-surface-100 placeholder:text-surface-500 border-surface-600 focus:ring-brand-500 focus:border-brand-500 rounded-2xl w-full sm:w-[28rem] transition"
                    />
                </div>

                <div className="ml-10 flex items-center text-surface-500 border-surface-600 px-4 py-2 rounded-lg border hover:bg-surface-700/50 transition cursor-not-allowed border-dashed">
                    <span>Espaço para filtros (em desenvolvimento)</span>
                </div>
            </div>

            <div className="py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-10">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
        </AuthenticatedLayout>
    );
}
