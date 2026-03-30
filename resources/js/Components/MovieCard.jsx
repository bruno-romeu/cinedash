import { router } from "@inertiajs/react";

export default function MovieCard({ movie }) {
    const handleCLick = () => {
        router.get(route('movies.show', movie.id))
    };
    return (
        <div className="bg-gradient-to-b from-transparent to-surface-800/50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300" onClick={handleCLick}>
            <div className="flex items-center justify-center h-64 bg-surface-700 overflow-hidden relative group cursor-pointer hover:scale-105 transition duration-300 ">
                <img src={movie.poster} alt={movie.title} 
                className="max-w-full h-auto object-contain" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-surface-100 max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={movie.title}>
                    {movie.title}
                </h3>
                <p className="text-sm text-surface-500 mt-1">{movie.release_date}</p>
            </div>
        </div>
    )
}