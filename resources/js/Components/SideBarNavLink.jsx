import { Link } from '@inertiajs/react';
export default function SidebarNavLink({ href, icon, label, attribute, active, disabled, isSecondary }) {
    const className = `
        flex items-center space-x-3 px-4 rounded-lg transition text-surface-100
        ${isSecondary ? 'py-2 text-sm' : 'py-3'}
        ${disabled
            ? 'opacity-60 cursor-not-allowed'
            : active
                ? 'bg-brand-500/10 border-brand-500 pl-[calc(1rem-3px)] shadow-[0_0_12px_2px_theme(colors.brand.500/.35)] ring-2 ring-brand-500 ring-opacity-50'
                : 'hover:bg-brand-500/5'
        }
    `;

    const content = (
        <>
            {icon && <span className={`flex-shrink-0 w-6 text-surface-100`}>{icon}</span>}
            <div className="min-w-0">
                <span className="block truncate font-medium">{label}</span>
                {attribute && <span className="block text-xs opacity-70 capitalize truncate mt-0.5">{attribute}</span>}
            </div>
        </>
    );

    if (disabled) {
        return <div className={className}>{content}</div>;
    }

    return (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
}