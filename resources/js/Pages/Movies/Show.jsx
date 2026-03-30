import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { Star } from "lucide-react"
import UserAvatar from "@/Components/UserAvatar"
import { usePage } from "@inertiajs/react"

export default function MovieShow ({ movie}) {
    const { props } = usePage();
    const auth = props.auth;
    const user = auth.user;
    return (
        <AuthenticatedLayout
        header={
                <h2 className="text-xl font-semibold leading-tight text-surface-100">
                    Detalhes Do Filme
                </h2>
            }
        >
            <Head title={movie.title} />

            <div className="container mx-auto px-4 py-8 bg-surface-900 rounded-lg shadow-md">
                <div className="flex flex-col-2 md:flex-row items-start md:items-center gap-6">
                    <div className="w-full h-[36rem] rounded-lg shadow-3xl shadow-surface-100 overflow-hidden">
                        <img src={movie.poster} alt={movie.title} 
                        className="w-auto h-[36rem] object-cover rounded-lg shadow-md" />
                    </div>
                    <div className="md:ml-8">
                        <p className="text-sm font-bold text-brand-500 mt-2 drop-shadow-2xl">{movie.release_date} • {movie.runtime} min</p>
                        <h1 className="text-6xl font-bold text-surface-100">{movie.title}</h1>
                        <p className="text-lg font-semibold text-brand-500 mt-2">{movie.tagline}</p>
                        <div className="flex flex-col-2 items-center gap-2 mt-4 border-y border-surface-100/20 py-4">
                            <div className="flex flex-col items-center gap-2 border-r border-surface-100/20 px-20">
                                <span className="text-surface-500">MÉDIA</span>
                                <div className="flex items-center gap-2">
                                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                                    <span className="text-2xl font-bold text-surface-100">{movie.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 px-20">
                                <span className="text-surface-500">AMIGOS</span>
                                <div className="flex -space-x-4 items-center gap-2">
                                    <UserAvatar className="inline-block ring-2 ring-surface-100 rounded-full" user={user} size="md" />
                                    <UserAvatar className="inline-block ring-2 ring-surface-100 rounded-full" user={user} size="md" />
                                    <UserAvatar className="inline-block ring-2 ring-surface-100 rounded-full" user={user} size="md" />
                                    <UserAvatar className="inline-block ring-2 ring-surface-100 rounded-full" user={user} size="md" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-surface-100 mt-4">Sinopse</h2>
                            <p className=" text-surface-400 mt-4">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}