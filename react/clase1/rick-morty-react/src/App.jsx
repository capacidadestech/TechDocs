
import { CharacterList } from "./components/CharacterList/CharacterList";
import { Header } from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <CharacterList />
    </div>
  );
}

export default App;
