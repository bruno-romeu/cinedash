import UserAvatar from "./UserAvatar";
import RatingStars from "./RatingStars";

export default function RatingCard ({ rating, user, content }) {
    return (
        <div className="flex items-center gap-4 bg-surface-700 rounded-lg shadow-sm p-4 hover:bg-surface-600 transition-colors duration-200 max-w-md">
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
    )
}