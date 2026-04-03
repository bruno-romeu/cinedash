import UserAvatar from "./UserAvatar";
import RatingStars from "./RatingStars";
import { useState } from "react";

export default function RatingCard ({ rating, user, content }) {
    const [fullCard, setFullCard] = useState(false);

    return (
        <>
            <div 
            className="flex items-center gap-4 bg-surface-700 rounded-lg shadow-sm p-4 hover:bg-surface-600 transition-colors duration-200 max-w-md"
            onClick={() => setFullCard(true)}
            >
                <div className="items-center">
                    <div className="flex flex-col-2 gap-4">
                        <UserAvatar user={user} size="md" />
                        <div>
                            <h3 className="text-lg font-bold text-surface-100">{user.name}</h3>
                            <RatingStars rating={rating} />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-surface-300 text-justify normal-case max-w-sm line-clamp-6 overflow-y-hidden my-2 mx-2 ">{content}</p>
                    </div>
                </div>
            </div>

            {fullCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setFullCard(false)}>
                    <div className="bg-surface-700 rounded-lg shadow-lg p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-4 mb-4">
                            <UserAvatar user={user} size="md" />
                            <div>
                                <h3 className="text-lg font-bold text-surface-100">{user.name}</h3>
                                <RatingStars rating={rating} />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-surface-300 text-justify normal-case">{content}</p>
                        </div>
                    </div>
                </div>
            )}
        </>


    )
}