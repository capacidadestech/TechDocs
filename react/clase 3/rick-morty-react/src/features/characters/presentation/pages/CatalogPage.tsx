import { Header } from '../../../../shared/components/Header/Header'
import { CharacterList } from '../components/CharacterList'
import { SearchFilters } from '../components/SearchFilters'
import { useCharactersContext } from '../context/useCharactersContext'

export function CatalogPage() {
  const {
    clearFilters,
    filters: { gender, page, searchTerm, species, status },
    setPage,
    updateGender,
    updateSearchTerm,
    updateSpecies,
    updateStatus,
  } = useCharactersContext()

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1a1a2e] px-4 py-12 font-[Nunito,sans-serif]">
      <Header />
      <SearchFilters
        gender={gender}
        onClearFilters={clearFilters}
        onGenderChange={updateGender}
        onSearchTermChange={updateSearchTerm}
        onSpeciesChange={updateSpecies}
        onStatusChange={updateStatus}
        searchTerm={searchTerm}
        species={species}
        status={status}
      />
      <CharacterList
        gender={gender}
        onPageChange={setPage}
        page={page}
        searchTerm={searchTerm}
        species={species}
        status={status}
      />
    </div>
  )
}
