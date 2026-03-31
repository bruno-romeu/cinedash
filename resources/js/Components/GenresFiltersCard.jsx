import { Funnel } from "lucide-react";

export default function GenresFiltersCard({ genres = {}, onGenreClick }) {
    const genresArr = Object.entries(genres).map(([id, name]) => ({ id, name }));

    const handleSelectChange = (e) => {
        const value = e.target.value;
        if (value) {
            onGenreClick && onGenreClick(value);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center bg-brand-500 px-3 py-2 rounded-lg">
                <Funnel className="text-surface-100" />
                <span className="text-surface-100 ml-2">Filtros</span>
            </div>
            <div className="flex flex-row items-center gap-2 w-full">
                {genresArr.slice(0, 3).map((genre) => (
                    <button
                        key={genre.id}
                        className="bg-surface-900/10 border border-surface-600 px-3 py-2 rounded-lg hover:bg-surface-700/50 text-sm font-bold text-surface-100 cursor-pointer transition"
                        onClick={() => onGenreClick && onGenreClick(genre.id)}
                        type="button"
                    >
                        {genre.name}
                    </button>
                ))}
                <select
                    className="bg-surface-900 border border-surface-600 px-3 py-2 rounded-lg text-sm font-bold text-surface-100 cursor-pointer transition"
                    onChange={handleSelectChange}
                    defaultValue=""
                >
                    <option value="" disabled>Ver todos</option>
                    {genresArr.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}