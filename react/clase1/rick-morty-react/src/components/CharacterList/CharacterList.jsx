import { CharacterCard } from "../CharacterCard/CharacterCard";
import { Loader } from "../Loader/Loader";
//import { CHARACTERS } from "../../mocks/characters";
import { EmptyMessage } from "../EmptyMessage/EmptyMessage";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useCharacter } from "../../hooks/useCharacter";
import './CharacterList.css'


export function CharacterList() {

  const { characters, loading, error } = useCharacter();

  if (loading) {
    return <Loader />;
  }

  if(error) {
    return <ErrorMessage error={error} />;
  }
  
  if (characters.length === 0) {
    return <EmptyMessage />;
  }

  return (
    <section className="character-list">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </section>
  );
}