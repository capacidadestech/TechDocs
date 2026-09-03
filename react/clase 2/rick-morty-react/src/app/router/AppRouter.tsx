import { Route, Routes } from 'react-router-dom'
import { CharactersProvider } from '../../features/characters/presentation/context/CharactersProvider'
import { CharacterDetailPage } from '../../features/characters/presentation/pages/CharacterDetailPage'
import { CatalogPage } from '../../features/characters/presentation/pages/CatalogPage'
import { NotFoundPage } from '../../shared/presentation/pages/NotFoundPage'

export function AppRouter() {
  return (
    <CharactersProvider>
      <Routes>
        {/* Cada Route relaciona una URL con la página que debe mostrar React. */}
        <Route path="/" element={<CatalogPage />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        {/* El comodín captura cualquier URL que no coincide con las rutas conocidas. */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CharactersProvider>
  )
}
