
interface LoaderProps {
  hasActiveFilters: boolean
  page: number
}

export function Loader({ hasActiveFilters, page }: LoaderProps) {
  const message =
    page > 1
      ? `Cambiando a la página ${page}...`
      : hasActiveFilters
        ? 'Aplicando filtros interdimensionales...'
        : 'Cargando información interdimensional...'

  return (
    <div className="my-12 flex w-full flex-col items-center justify-center p-16">
      <div className="relative size-[120px] animate-[spin_1.5s_linear_infinite] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#97ce4c_0%,#00b0c8_25%,#1a1a2e_50%,#00b0c8_75%,#97ce4c_100%)] shadow-[0_0_20px_#97ce4c,0_0_40px_#00b0c8] after:absolute after:inset-[15px] after:rounded-full after:bg-[#1a1a2e] after:shadow-[inset_0_0_15px_rgba(0,240,255,0.5)]" />
      <p className="mt-8 animate-[pulse_1.5s_ease-in-out_infinite] text-center text-[1.3rem] font-bold uppercase tracking-[1px] text-[#97ce4c]">
        {message}
      </p>
    </div>
  );
}
