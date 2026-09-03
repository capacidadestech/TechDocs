
interface SearchFiltersProps {
  searchTerm: string
  gender: string
  species: string
  status: string
  onSearchTermChange: (value: string) => void
  onClearFilters: () => void
  onGenderChange: (value: string) => void
  onSpeciesChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function SearchFilters({
  searchTerm,
  gender,
  species,
  status,
  onSearchTermChange,
  onClearFilters,
  onGenderChange,
  onSpeciesChange,
  onStatusChange,
}: SearchFiltersProps) {
  return (
    <div className="mt-8 grid w-[90%] max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_2.5rem]">
      <div>
        <label
          className="mb-2 block text-sm font-extrabold uppercase tracking-[1px] text-[#97ce4c]"
          htmlFor="character-search"
        >
          Buscar personaje
        </label>
        <input
          className="w-full rounded-xl border-2 border-transparent bg-white/90 px-4 py-3 text-[#1a1a2e] shadow-[0_8px_16px_rgba(0,0,0,0.25)] outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-[#00b0c8] focus:ring-4 focus:ring-[#00b0c8]/30"
          id="character-search"
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Ej. Rick Sanchez"
          type="search"
          value={searchTerm}
        />
      </div>
      <div>
        <label
          className="mb-2 block text-sm font-extrabold uppercase tracking-[1px] text-[#97ce4c]"
          htmlFor="character-status"
        >
          Estado
        </label>
        <select
          className="w-full rounded-xl border-2 border-transparent bg-white/90 px-4 py-3 text-[#1a1a2e] shadow-[0_8px_16px_rgba(0,0,0,0.25)] outline-none transition-all duration-300 focus:border-[#00b0c8] focus:ring-4 focus:ring-[#00b0c8]/30"
          id="character-status"
          onChange={(event) => onStatusChange(event.target.value)}
          value={status}
        >
          <option value="">Todos</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
      <div>
        <label
          className="mb-2 block text-sm font-extrabold uppercase tracking-[1px] text-[#97ce4c]"
          htmlFor="character-species"
        >
          Especie
        </label>
        <select
          className="w-full rounded-xl border-2 border-transparent bg-white/90 px-4 py-3 text-[#1a1a2e] shadow-[0_8px_16px_rgba(0,0,0,0.25)] outline-none transition-all duration-300 focus:border-[#00b0c8] focus:ring-4 focus:ring-[#00b0c8]/30"
          id="character-species"
          onChange={(event) => onSpeciesChange(event.target.value)}
          value={species}
        >
          <option value="">Todas</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Poopybutthole">Poopybutthole</option>
          <option value="Mythological Creature">Mythological Creature</option>
          <option value="Robot">Robot</option>
          <option value="Animal">Animal</option>
          <option value="Disease">Disease</option>
          <option value="Cronenberg">Cronenberg</option>
          <option value="Planet">Planet</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
      <div>
        <label
          className="mb-2 block text-sm font-extrabold uppercase tracking-[1px] text-[#97ce4c]"
          htmlFor="character-gender"
        >
          Género
        </label>
        <select
          className="w-full rounded-xl border-2 border-transparent bg-white/90 px-4 py-3 text-[#1a1a2e] shadow-[0_8px_16px_rgba(0,0,0,0.25)] outline-none transition-all duration-300 focus:border-[#00b0c8] focus:ring-4 focus:ring-[#00b0c8]/30"
          id="character-gender"
          onChange={(event) => onGenderChange(event.target.value)}
          value={gender}
        >
          <option value="">Todos</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="Male">Male</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
      <div className="flex items-end">
        <button
          aria-label="Limpiar filtros"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#f0e14a] bg-[#24283b] text-[#f0e14a] shadow-[0_8px_16px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f0e14a] hover:text-[#1a1a2e] focus:outline-none focus:ring-4 focus:ring-[#f0e14a]/40"
          onClick={onClearFilters}
          title="Limpiar filtros"
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 5h18l-7 8v5l-4 2v-7L3 5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="m16 16 5 5m0-5-5 5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
