import { Play } from "lucide-react";

export default function ApplicationLogo(props) {
    return (
        <div className="flex flex-col justify-center mb-8 animate-in fade-in zoom-in duration-700 group relative">
            <div className="h-20 w-20 bg-indigo-600 rounded-[22px] flex items-center justify-center shadow-2xl shadow-indigo-600/40 transform hover:rotate-6 transition-transform">
                <Play size={40} className="fill-white text-white ml-1" />
            </div>
            <h2 className="font-bold text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">CineDash</h2>
        </div>
    );
}
