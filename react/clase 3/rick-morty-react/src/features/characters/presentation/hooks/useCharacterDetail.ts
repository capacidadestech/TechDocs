import { useCallback, useEffect, useState } from 'react'
import type { CharacterDetail } from '../../domain/entities/CharacterDetail'
import { fetchCharacterById } from '../../infrastructure/rickAndMortyCharacterApi'

export function useCharacterDetail(characterId: string | undefined) {
  const normalizedId = Number(characterId)
  const isValidCharacterId = Number.isInteger(normalizedId) && normalizedId > 0
  const [character, setCharacter] = useState<CharacterDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const retry = useCallback(() => {
    setRetryCount((currentRetryCount) => currentRetryCount + 1)
  }, [])

  useEffect(() => {
    if (!isValidCharacterId) {
      return
    }

    const controller = new AbortController()

    async function getCharacter() {
      try {
        setLoading(true)
        setError(null)
        setNotFound(false)

        // El hook coordina el estado visual y delega la petición HTTP al servicio.
        const characterDetail = await fetchCharacterById(normalizedId, controller.signal)
        setCharacter(characterDetail)
        setNotFound(characterDetail === null)
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return
        }

        setCharacter(null)
        setError('No pudimos cargar este personaje. Intenta de nuevo.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    getCharacter()

    return () => controller.abort()
  }, [isValidCharacterId, normalizedId, retryCount])

  return {
    character: isValidCharacterId ? character : null,
    error: isValidCharacterId ? error : null,
    loading: isValidCharacterId ? loading : false,
    notFound: !isValidCharacterId || notFound,
    retry,
  }
}
