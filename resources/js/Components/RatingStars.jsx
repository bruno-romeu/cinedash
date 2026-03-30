import { Star, StarHalf } from "lucide-react"

export default function RatingStars ({ rating }) {
    let safeRating = Number(rating);
    if (isNaN(safeRating) || safeRating < 0) safeRating = 0;
    // TMDB ratings vão de 0 a 10, normalizar para 0 a 5
    safeRating = safeRating > 10 ? 10 : safeRating;
    safeRating = safeRating / 2;
    if (safeRating > 5) safeRating = 5;
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, index) => (
                <Star key={"full-"+index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            {hasHalfStar && (
                <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <Star key={"empty-"+index} className="w-4 h-4 text-gray-300" />
            ))}
        </div>
    )
}