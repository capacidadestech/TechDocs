import './CharacterCard.css'

export function CharacterCard({ character }) {
  return (
    <article className="character-card">
      <img src={character.image} alt={character.name} className="card-image" />
      <div className="card-content">
        <h2 className="card-name">{character.name}</h2>
        <p className="card-species">
          <span
            className={`status-icon ${character.status.toLowerCase()}`}
          ></span>
          {character.status} - {character.species}
        </p>
      </div>
    </article>
  );
}
