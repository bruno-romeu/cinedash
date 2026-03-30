export default function UserAvatar ({ user, showName = false, className = '' }) {
    const bgColors = [
            'bg-red-500',
            'bg-green-500',
            'bg-blue-500',
            'bg-yellow-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-indigo-500',
            'bg-teal-500',
        ];
        const colorIndex = user.id % bgColors.length;
        const bgColorClass = bgColors[colorIndex];
        
    return (
        
        <div className={`flex items-center gap-2 ${className}`}>
            {user.avatar_url ? (
                <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                />
            ) : (
                <div className={`w-8 h-8 rounded-full ${bgColorClass} flex items-center justify-center text-sm text-surface-100`}>
                    {user.name.charAt(0).toUpperCase()}
                </div>
            )}
            {showName && <span className="text-sm text-surface-100">{user.name}</span>}
        </div>
    )
}