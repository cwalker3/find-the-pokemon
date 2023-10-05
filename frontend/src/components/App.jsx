import PokemonGrid from "./PokemonGrid";
import { useState, useCallback, useEffect } from "react";
import { shuffledPokemonIds, sample, getAllPokemonData } from "../utils/utils";
import Header from "./Header";

function App() {
  const [ids, setIds] = useState(shuffledPokemonIds());
  const [targetId, setTargetId] = useState(sample(ids));
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [pokemonLoaded, setPokemonLoaded] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const pokemonData = await getAllPokemonData();
        setAllPokemonData(pokemonData);
        setPokemonLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPokemon();
  }, []);

  function checkClick(clickedId) {
    if (clickedId == targetId) {
      console.log("correct");
      setTargetId(sample(ids));
    } else {
      console.log("wrong");
    }
  }

  return (
    <>
      <Header />

      {pokemonLoaded ? (
        <PokemonGrid
          ids={ids}
          checkClick={checkClick}
          pokemon={allPokemonData}
        />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default App;
