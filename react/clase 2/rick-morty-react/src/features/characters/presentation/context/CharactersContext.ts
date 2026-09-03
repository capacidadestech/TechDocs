import { createContext } from 'react'

export interface CatalogFilters {
  searchTerm: string
  status: string
  species: string
  gender: string
  page: number
}

export interface CharactersContextValue {
  filters: CatalogFilters
  updateSearchTerm: (value: string) => void
  updateStatus: (value: string) => void
  updateSpecies: (value: string) => void
  updateGender: (value: string) => void
  setPage: (page: number) => void
  clearFilters: () => void
}

export const CharactersContext = createContext<CharactersContextValue | undefined>(undefined)
