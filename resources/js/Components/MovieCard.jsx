import { router } from "@inertiajs/react";
import { Star } from "lucide-react";

export default function MovieCard({ movie }) {
    const handleCLick = () => {
        router.get(route('movies.show', movie.id))
    };
    return (
        <div className="relative bg-gradient-to-b from-transparent to-surface-800/50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col" onClick={handleCLick}>
            <div className="absolute top-1.5 right-1.5 z-20 bg-surface-800/70 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center gap-0.5 sm:gap-1">
                <span className="flex items-center gap-0.5 sm:gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm md:text-base font-semibold text-surface-100">{movie.rating.toFixed(1)}</span>
                </span>
            </div>
            <div className="w-full aspect-[2/3] bg-surface-700 overflow-hidden relative group cursor-pointer hover:scale-105 transition duration-300 flex items-center justify-center">
                <img src={movie.poster} alt={movie.title}
                className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-surface-100 max-w-full overflow-hidden text-ellipsis whitespace-nowrap" title={movie.title}>
                    {movie.title}
                </h3>
                <p className="text-sm text-surface-500 mt-1">{movie.release_date} • {movie.genres[0]}</p>
            </div>
        </div>
    )
}