export default function RatingStars ({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, index) => (
                <svg key={index} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09L5.64 12.545.762 9.455l6.09-.545L10 3l2.148 5.91 6.09.545-4.878 3.09L15.878 15z" />
                </svg>
            ))}
            {hasHalfStar && (
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09L5.64 12.545.762 9.455l6.09-.545L10 3v12z" />
                </svg>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <svg key={index} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09L5.64 12.545.762 9.455l6.09-.545L10 3l2.148 5.91 6.09.545-4.878 3.09L15.878 15z" />
                </svg>
            ))}
        </div>
    )
}