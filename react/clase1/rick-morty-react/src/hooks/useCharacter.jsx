import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;


export function useCharacter() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getCharacters() {
      try {
        setLoading(true);
        setError(null);

        // 2. Retraso artificial (Timer de 1 segundo) usando Promesas
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await fetch(`${API_URL}/character`, { signal });

        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        setCharacters(data.results);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log(
            "Petición cancelada: el componente se desmontó antes de terminar."
          );
          return; 
        }

        
        console.error("Error al obtener los personajes:", err);
        setError(
          "Hubo un problema al cargar los personajes. Intenta de nuevo más tarde."
        );
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    getCharacters();

    return () => {
      controller.abort();
    };
  }, []); 
  
  return { characters, loading, error };
}
