
import { Star } from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';

export default function ReviewCard() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleStarClick = (star, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const isLeftHalf = x < rect.width / 2;
        setRating(isLeftHalf ? star - 0.5 : star);
    };

    const handleMouseMove = (star, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const isLeftHalf = x < rect.width / 2;
        setHoverRating(isLeftHalf ? star - 0.5 : star);
    };

    return (
        <div className="bg-surface-800 rounded-lg shadow-md p-4">
            <div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-surface-100 mb-2">
                        Avaliação
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={(e) => handleStarClick(star, e)}
                                onMouseMove={(e) => handleMouseMove(star, e)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="focus:outline-none transition cursor-pointer"
                            >
                                <Star
                                    size={28}
                                    className={`${
                                        star <= (hoverRating || rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : star - 0.5 === (hoverRating || rating)
                                            ? 'fill-yellow-400 text-yellow-400 opacity-50'
                                            : 'text-surface-600'
                                    } transition`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <textarea
                    className="w-full h-24 p-2 mt-2 bg-surface-700 rounded-md text-sm text-surface-100 focus:outline-none focus:ring-brand-500 focus:bg-surface-700 transition duration-150 ease-in-out"
                    placeholder="Escreva sua avaliação aqui..."
                />

                <PrimaryButton className="mt-2">
                    Enviar Avaliação
                </PrimaryButton>
            </div>
        </div>
    );
}