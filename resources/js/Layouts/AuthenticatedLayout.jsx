import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import SidebarNavLink from '@/Components/SideBarNavLink';
import TextInput from '@/Components/TextInput';
import ApplicationLogoSideBar from '@/Components/ApplicationLogoSideBar';
import { House, Search, Bookmark, History, Trophy, User } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {

    const { url } = usePage();
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-surface-900 flex">
            <aside className="w-64 bg-surface-900 border-r border-surface-800 flex flex-col min-h-screen">
                {/* Logo */}
                <div className="p-4 flex flex-col items-center">
                    <ApplicationLogoSideBar />
                </div>

                {/* Menu */}
                <nav className="py-4">
                    <div className="px-4 space-y-2">
                        <SidebarNavLink href={'/dashboard'} icon={<House />} label={'Início'} active={url === '/dashboard'} />
                        <SidebarNavLink href={'/explorar'} icon={<Search />} label={'Explorar'} active={url.startsWith('/explorar')} disabled/>
                        <SidebarNavLink href={'/minha-lista'} icon={<Bookmark />} label={'Minha Lista'} active={url.startsWith('/minha-lista')} disabled/>
                        <SidebarNavLink href={'/historico'} icon={<History />} label={'Histórico'} active={url.startsWith('/historico')} disabled/>
                        <SidebarNavLink href={'/ranking'} icon={<Trophy />} label={'Ranking'} active={url.startsWith('/ranking')} disabled/>
                        <SidebarNavLink href={'/profile'} icon={<User />} label={'Perfil'} active={url.startsWith('/profile')}/>
                    </div>
                </nav>

                <div className="p-4">
                    <div className="relative" >
                        <button
                            type="button"
                            className="w-full flex items-center space-x-3 rounded-lg px-4 py-3 text-left text-brand-primary transition hover:bg-brand-primary/5"
                            aria-label="Abrir menu do usuário"
                            title="Menu do usuário"
                        >
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                                <i className="fas fa-user text-sm"></i>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-base font-medium text-brand-primary leading-tight"></p>
                                <p className="truncate text-xs text-brand-primary/70 capitalize mt-0.5"></p>
                            </div>
                        </button>
                    </div>
                </div>
            </aside>
            <div className="flex-1 flex flex-col min-h-screen">
                {header && (
                    <header className="bg-surface-900/50">
                        <div className="flex justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                            {!url.startsWith('/profile') && 
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                                        <Search size={18} />
                                    </span>
                                    <TextInput
                                        id="search"
                                        type="text"
                                        placeholder="Pesquisa rápida..."
                                        className="pl-10 bg-surface-800 text-surface-100 placeholder:text-surface-500 border-surface-600 focus:ring-brand-500 focus:border-brand-500 rounded-lg w-full sm:w-64 transition"
                                    />
                                </div>
                            }
                            
                        </div>
                    </header>
                )}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
