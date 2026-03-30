import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MovieCard from '@/Components/MovieCard';
import { TrendingUp, ArrowRight } from 'lucide-react';

export default function Dashboard({ movies }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-surface-100">
                    Início
                </h2>
            }
        >
            <Head title="Início" />

            <div className="py-12">
                <div className='flex px-10 mb-6 items-center justify-between gap-2'>
                    <div className='flex'>
                        <TrendingUp className="inline-block mr-2 text-brand-500 size-9" />
                        <h1 className='text-3xl font-bold text-surface-100'>Em Destaque</h1>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span
                         className='text-surface-500 text-sm hover:text-surface-100 cursor-pointer'>
                            Ver tudo 
                            <ArrowRight className="inline-block ml-1 size-4" />
                        </span>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-10">
                        {movies.slice(0, 6).map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
