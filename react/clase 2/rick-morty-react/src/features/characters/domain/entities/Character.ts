
export interface Character {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
}

export interface CharacterPageInfo {
  count: number
  next: string | null
  pages: number
  prev: string | null
}

export interface PaginatedCharacters {
  info: CharacterPageInfo
  results: Character[]
}
