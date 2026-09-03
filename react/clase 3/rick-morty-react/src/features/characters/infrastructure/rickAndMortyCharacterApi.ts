import type { Character, PaginatedCharacters } from '../domain/entities/Character'
import type { CharacterDetail } from '../domain/entities/CharacterDetail'

const API_URL = import.meta.env.VITE_API_URL

interface RickAndMortyPlaceDto {
  name: string
  url: string
}

interface RickAndMortyCharacterDto {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: RickAndMortyPlaceDto
  location: RickAndMortyPlaceDto
  image: string
  episode: string[]
  created: string
}

interface RickAndMortyCharacterPageDto {
  info: {
    count: number
    next: string | null
    pages: number
    prev: string | null
  }
  results: RickAndMortyCharacterDto[]
}

function mapCharacter(character: RickAndMortyCharacterDto): Character {
  return {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    gender: character.gender,
    image: character.image,
  }
}

function mapCharacterPage(page: RickAndMortyCharacterPageDto): PaginatedCharacters {
  return {
    info: {
      count: page.info.count,
      next: page.info.next,
      pages: page.info.pages,
      prev: page.info.prev,
    },
    results: page.results.map(mapCharacter),
  }
}

function mapCharacterDetail(character: RickAndMortyCharacterDto): CharacterDetail {
  return {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    type: character.type,
    gender: character.gender,
    origin: { name: character.origin.name, url: character.origin.url },
    location: { name: character.location.name, url: character.location.url },
    image: character.image,
    episode: character.episode,
    created: character.created,
  }
}

export async function fetchCharacters(
  name: string,
  status: string,
  species: string,
  gender: string,
  page: number,
  signal: AbortSignal,
): Promise<PaginatedCharacters | null> {
  const searchParams = new URLSearchParams({ page: page.toString() })
  if (name.trim()) searchParams.set('name', name.trim())
  if (status) searchParams.set('status', status.toLowerCase())
  if (species.trim()) searchParams.set('species', species.trim())
  if (gender) searchParams.set('gender', gender.toLowerCase())

  const response = await fetch(`${API_URL}/character?${searchParams.toString()}`, { signal })
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
  return mapCharacterPage((await response.json()) as RickAndMortyCharacterPageDto)
}

// Infraestructura centraliza las peticiones HTTP de listado y detalle.
export async function fetchCharacterById(
  characterId: number,
  signal: AbortSignal,
): Promise<CharacterDetail | null> {
  const response = await fetch(`${API_URL}/character/${characterId}`, { signal })
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
  return mapCharacterDetail((await response.json()) as RickAndMortyCharacterDto)
}
