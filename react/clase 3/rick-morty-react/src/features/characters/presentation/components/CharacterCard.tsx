import type { Character } from '../../domain/entities/Character'
import { Link } from 'react-router-dom'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const statusClassName =
    character.status.toLowerCase() === 'alive'
      ? 'bg-[#55cc44] text-[#10210c]'
      : character.status.toLowerCase() === 'dead'
        ? 'bg-[#d63d2e] text-white'
        : 'bg-[#9e9e9e] text-[#1a1a2e]'

  return (
    <article className="overflow-hidden rounded-2xl border-2 border-transparent bg-[#24283b] shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out hover:-translate-y-[10px] hover:border-[#97ce4c] hover:shadow-[0_15px_35px_rgba(151,206,76,0.3)]">
      {/* Link cambia la URL sin recargar la aplicación completa. */}
      <Link to={`/characters/${character.id}`} aria-label={`Ver detalle de ${character.name}`} className="block">
        <img src={character.image} alt={character.name} className="h-60 w-full object-cover" />
        <div className="p-6">
          <h2 className="mb-2 text-[1.5rem] font-extrabold text-white">{character.name}</h2>
          <div className="flex flex-wrap gap-2 text-sm font-bold">
            <span className={`rounded-full px-3 py-1 ${statusClassName}`}>
              {character.status}
            </span>
            <span className="rounded-full border border-[#00b0c8] bg-[#1a1a2e] px-3 py-1 text-[#a9b1d6]">
              Species: {character.species}
            </span>
            <span className="rounded-full border border-[#97ce4c] bg-[#1a1a2e] px-3 py-1 text-[#97ce4c]">
              Gender: {character.gender}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
