import { Head, Link } from '@inertiajs/react';
import { Play, ArrowRight, Clapperboard, Users, Layout } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';


export default function Welcome({ auth }) {

    return (
        <>
            <Head title="Bem-vindo ao CineDash" />

            <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 text-zinc-100">
                {/* Background com Blur e Gradiente */}
                <div className="absolute inset-0 z-0">
                    <img src="/images/bg.png" alt="background" className='w-full'/>
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                    {/* Overlay de textura opcional */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>

                <div className="relative z-10 max-w-4xl w-full px-6 text-center">
                    {/* Botões de Login/Dashboard no topo (Estilo Breeze) */}
                    <div className="fixed top-0 right-0 p-6 text-right z-30">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-zinc-400 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-zinc-400 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="ms-4 font-semibold text-zinc-400 hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Logo */}
                    <div className="flex justify-center mb-8 animate-in fade-in zoom-in duration-700">
                        <ApplicationLogo />
                    </div>

                    {/* Texto Principal */}
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 leading-tight h-auto animate-in fade-in duration-700">
                        Sua jornada no cinema <br /> começa aqui.
                    </h1>
                    
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Organize sua lista, avalie filmes com amigos e descubra sua próxima obsessão cinematográfica em uma interface feita para cinéfilos.
                    </p>

                    {/* Botões de Ação Atualizados para Inertia */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 relative z-10">
                        {auth.user ? (
                             <Link 
                                href={route('dashboard')}
                                className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-200 transition-all active:scale-95 w-full md:w-auto"
                            >
                                Ir para o Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    href={route('register')}
                                    className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-200 transition-all active:scale-95 w-full md:w-auto"
                                >
                                    Começar Agora <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link 
                                    href={route('login')}
                                    className="px-8 py-4 rounded-2xl font-bold text-lg text-white border border-zinc-800 hover:bg-zinc-900 transition-all w-full md:w-auto"
                                >
                                    Fazer Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Features Rápidas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-left bg-zinc-900/50 rounded-lg p-8 animate-in fade-in duration-700">
                        <div className="flex gap-4">
                            <div className="text-indigo-500 shrink-0"><Layout size={24} /></div>
                            <div>
                                <h3 className="font-bold text-white">Organização Limpa</h3>
                                <p className="text-sm text-zinc-500">Listas minimalistas e intuitivas.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-indigo-500 shrink-0"><Users size={24} /></div>
                            <div>
                                <h3 className="font-bold text-white">Social Integrado</h3>
                                <p className="text-sm text-zinc-500">Veja o que seus amigos estão vendo.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-indigo-500 shrink-0"><Clapperboard size={24} /></div>
                            <div>
                                <h3 className="font-bold text-white">Dados Reais</h3>
                                <p className="text-sm text-zinc-500">Milhares de filmes e estatísticas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
