import { useCallback, useEffect, useState } from 'react'
import { fetchCharacters } from '../../infrastructure/rickAndMortyCharacterApi'
import type { Character, PaginatedCharacters } from '../../domain/entities/Character'

export function useCharacters(
  searchTerm: string,
  status: string,
  species: string,
  gender: string,
  page: number,
) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [resultInfo, setResultInfo] = useState<PaginatedCharacters['info'] | null>(
    null,
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const retry = useCallback(() => {
    setRetryCount((currentRetryCount) => currentRetryCount + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function getCharacters() {
      try {
        setLoading(true)
        setError(null)
        setResultInfo(null)

        await new Promise<void>((resolve) => setTimeout(resolve, 1000))

        const data = await fetchCharacters(
          searchTerm,
          status,
          species,
          gender,
          page,
          signal,
        )
        setCharacters(data?.results ?? [])
        setResultInfo(data?.info ?? null)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }

        console.error('Error al obtener los personajes:', err)
        setError(
          'Hubo un problema al cargar los personajes. Intenta de nuevo más tarde.',
        )
      } finally {
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    }

    getCharacters()

    return () => {
      controller.abort()
    }
  }, [searchTerm, status, species, gender, page, retryCount])

  return { characters, error, loading, resultInfo, retry }
}
