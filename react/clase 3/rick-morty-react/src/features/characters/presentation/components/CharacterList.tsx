import { EmptyMessage } from '../../../../shared/components/EmptyMessage/EmptyMessage'
import { ErrorMessage } from '../../../../shared/components/ErrorMessage/ErrorMessage'
import { Loader } from '../../../../shared/components/Loader/Loader'
import { Pagination } from '../../../../shared/components/Pagination/Pagination'
import { CharacterCard } from './CharacterCard'
import { ResultsSummary } from './ResultsSummary'
import { useCharacters } from '../hooks/useCharacters'

interface CharacterListProps {
  searchTerm: string
  species: string
  status: string
  gender: string
  onPageChange: (page: number) => void
  page: number
}

export function CharacterList({
  searchTerm,
  status,
  species,
  gender,
  onPageChange,
  page,
}: CharacterListProps) {
  const hasActiveFilters = Boolean(searchTerm.trim() || status || species || gender)
  const { characters, loading, error, resultInfo, retry } = useCharacters(
    searchTerm,
    status,
    species,
    gender,
    page,
  )

  if (loading) {
    return <Loader hasActiveFilters={hasActiveFilters} page={page} />;
  }

  if(error) {
    return <ErrorMessage error={error} onRetry={retry} />;
  }
  
  if (characters.length === 0) {
    return <EmptyMessage hasActiveFilters={hasActiveFilters} />;
  }

  return (
    <>
      {resultInfo && <ResultsSummary count={resultInfo.count} />}
      <section className="my-12 grid w-full max-w-[1400px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </section>
      {resultInfo && (
        <Pagination
          hasNextPage={resultInfo.next !== null}
          hasPreviousPage={resultInfo.prev !== null}
          onPageChange={onPageChange}
          page={page}
          totalPages={resultInfo.pages}
        />
      )}
    </>
  )
}
