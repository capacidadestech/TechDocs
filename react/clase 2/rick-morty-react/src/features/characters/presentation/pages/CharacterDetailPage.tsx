import { Link, useParams } from 'react-router-dom'
import { Header } from '../../../../shared/components/Header/Header'
import { useCharacterDetail } from '../hooks/useCharacterDetail'

function DetailState({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-12 w-full max-w-2xl rounded-2xl border-2 border-[#00b0c8] bg-[#24283b] px-8 py-12 text-center text-[#a9b1d6] shadow-[0_0_20px_rgba(0,176,200,0.25)]">
      {children}
    </div>
  )
}

function getEpisodeNumber(episodeUrl: string) {
  return episodeUrl.split('/').at(-1)
}

export function CharacterDetailPage() {
  // useParams obtiene el valor dinámico de /characters/:id desde la URL.
  const { id } = useParams<{ id: string }>()
  const { character, error, loading, notFound, retry } = useCharacterDetail(id)

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-[#1a1a2e] px-4 py-12 font-[Nunito,sans-serif]">
        <Header />
        <DetailState>
          <p className="animate-pulse text-xl font-bold text-[#97ce4c]">
            Abriendo el portal del personaje...
          </p>
        </DetailState>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-[#1a1a2e] px-4 py-12 font-[Nunito,sans-serif]">
        <Header />
        <DetailState>
          <h2 className="text-2xl font-extrabold text-[#d63d2e]">No pudimos abrir el portal</h2>
          <p className="mt-4 text-lg">{error}</p>
          <button
            type="button"
            onClick={retry}
            className="mt-8 rounded-lg border-2 border-[#97ce4c] px-5 py-3 font-bold text-[#97ce4c] transition-colors hover:bg-[#97ce4c] hover:text-[#1a1a2e]"
          >
            Reintentar consulta
          </button>
        </DetailState>
      </main>
    )
  }

  if (notFound || !character) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-[#1a1a2e] px-4 py-12 font-[Nunito,sans-serif]">
        <Header />
        <DetailState>
          <h2 className="text-2xl font-extrabold text-[#97ce4c]">Personaje no encontrado</h2>
          <p className="mt-4 text-lg">Este portal no lleva a ningún personaje conocido.</p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-lg border-2 border-[#00b0c8] px-5 py-3 font-bold text-[#00b0c8] transition-colors hover:bg-[#00b0c8] hover:text-[#1a1a2e]"
          >
            Volver al catálogo
          </Link>
        </DetailState>
      </main>
    )
  }

  const statusClassName =
    character.status.toLowerCase() === 'alive'
      ? 'bg-[#55cc44] text-[#10210c]'
      : character.status.toLowerCase() === 'dead'
        ? 'bg-[#d63d2e] text-white'
        : 'bg-[#9e9e9e] text-[#1a1a2e]'

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#1a1a2e] px-4 py-12 font-[Nunito,sans-serif]">
      <Header />
      <section className="my-12 grid w-full max-w-5xl overflow-hidden rounded-2xl border-2 border-[#00b0c8] bg-[#24283b] shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:grid-cols-[minmax(280px,0.8fr)_1.2fr]">
        <img src={character.image} alt={character.name} className="h-full min-h-80 w-full object-cover" />
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{character.name}</h1>
            <span className={`rounded-full px-3 py-1 text-sm font-bold ${statusClassName}`}>
              {character.status}
            </span>
          </div>
          <dl className="mt-8 grid gap-5 text-[#a9b1d6] sm:grid-cols-2">
            <div>
              <dt className="font-bold text-[#97ce4c]">Especie</dt>
              <dd>{character.species}</dd>
            </div>
            {character.type && (
              <div>
                <dt className="font-bold text-[#97ce4c]">Tipo</dt>
                <dd>{character.type}</dd>
              </div>
            )}
            <div>
              <dt className="font-bold text-[#97ce4c]">Género</dt>
              <dd>{character.gender}</dd>
            </div>
            <div>
              <dt className="font-bold text-[#97ce4c]">Origen</dt>
              <dd>{character.origin.name}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-bold text-[#97ce4c]">Última ubicación</dt>
              <dd>{character.location.name}</dd>
            </div>
          </dl>
          <div className="mt-8 border-t border-[#a9b1d6]/30 pt-6">
            <h2 className="text-xl font-extrabold text-white">Episodios ({character.episode.length})</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {character.episode.map((episodeUrl) => (
                <li key={episodeUrl} className="rounded-full bg-[#1a1a2e] px-3 py-1 text-sm font-bold text-[#00b0c8]">
                  Episodio {getEpisodeNumber(episodeUrl)}
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/"
            className="mt-10 inline-block rounded-lg border-2 border-[#97ce4c] px-5 py-3 font-bold text-[#97ce4c] transition-colors hover:bg-[#97ce4c] hover:text-[#1a1a2e]"
          >
            Volver al catálogo
          </Link>
        </div>
      </section>
    </main>
  )
}
