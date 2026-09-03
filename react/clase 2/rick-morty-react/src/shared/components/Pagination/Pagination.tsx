
interface PaginationProps {
  hasNextPage: boolean
  hasPreviousPage: boolean
  onPageChange: (page: number) => void
  page: number
  totalPages: number
}

export function Pagination({
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  page,
  totalPages,
}: PaginationProps) {
  return (
    <nav
      aria-label="Paginación de personajes"
      className="mb-12 flex items-center justify-center gap-4 text-[#a9b1d6]"
    >
      <button
        className="rounded-lg border border-[#00b0c8] px-4 py-2 font-bold transition-colors hover:bg-[#00b0c8] hover:text-[#1a1a2e] disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(page - 1)}
        type="button"
      >
        Anterior
      </button>
      <span aria-live="polite" className="font-bold">
        Página {page} de {totalPages}
      </span>
      <button
        className="rounded-lg border border-[#97ce4c] px-4 py-2 font-bold text-[#97ce4c] transition-colors hover:bg-[#97ce4c] hover:text-[#1a1a2e] disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        Siguiente
      </button>
    </nav>
  )
}
