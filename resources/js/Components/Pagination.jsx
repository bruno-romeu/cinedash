import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange, className = "" }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={`flex items-center gap-2 justify-end p-4 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded border border-surface-800 text-surface-800 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        &lt;
      </button>
      {getPages().map((page, idx) =>
        page === '...'
          ? <span key={`ellipsis-${idx}`} className="px-2 text-surface-400">...</span>
          : <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded border border-surface-800 transition ${page === currentPage ? "bg-brand-700 text-white" : "bg-surface-500 text-surface-100 hover:bg-surface-100 hover:text-surface-800"}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded border border-surface-800 text-surface-500 disabled:opacity-90 disabled:cursor-not-allowed"
        aria-label="Próxima página"
      >
        &gt;
      </button>
    </div>
  );
}