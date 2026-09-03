
interface EmptyMessageProps {
  hasActiveFilters: boolean
}

export const EmptyMessage = ({ hasActiveFilters }: EmptyMessageProps) => {
  const title = hasActiveFilters
    ? '¡Oh geez! No hay coincidencias'
    : '¡Oh geez! El portal está vacío'
  const message = hasActiveFilters
    ? 'Ningún personaje coincide con los filtros aplicados.'
    : 'No hay personajes disponibles en esta dimensión.'

  return (
    <div className="mx-auto my-12 w-full max-w-[600px] rounded-2xl border-2 border-dashed border-[#00b0c8] bg-[#24283b] px-8 py-16 text-center text-[#a9b1d6]">
      <h2 className="mb-4 text-[1.8rem] font-bold text-[#97ce4c]">{title}</h2>
      <p className="text-[1.1rem]">{message}</p>
    </div>
  );
}
