import { useState, type ReactNode } from 'react'
import { CharactersContext } from './CharactersContext'

export function CharactersProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('')
  const [species, setSpecies] = useState('')
  const [gender, setGender] = useState('')
  const [page, setPage] = useState(1)

  function resetPage() {
    setPage(1)
  }

  function updateSearchTerm(value: string) {
    setSearchTerm(value)
    resetPage()
  }

  function updateStatus(value: string) {
    setStatus(value)
    resetPage()
  }

  function updateSpecies(value: string) {
    setSpecies(value)
    resetPage()
  }

  function updateGender(value: string) {
    setGender(value)
    resetPage()
  }

  function clearFilters() {
    setSearchTerm('')
    setStatus('')
    setSpecies('')
    setGender('')
    resetPage()
  }

  const value = {
    filters: { searchTerm, status, species, gender, page },
    updateSearchTerm,
    updateStatus,
    updateSpecies,
    updateGender,
    setPage,
    clearFilters,
  }

  // El Provider conserva filtros entre rutas sin convertir los datos remotos en estado global.
  return <CharactersContext.Provider value={value}>{children}</CharactersContext.Provider>
}
