import PokemonGrid from "./PokemonGrid";
import { useState, useCallback, useEffect } from "react";
import { shuffledPokemonIds, sample, getAllPokemonData } from "../utils/utils";
import Header from "./Header";

function App() {
  const [ids, setIds] = useState(shuffledPokemonIds());
  const [availableIds, setAvailableIds] = useState(ids);
  const [targetIds, setTargetIds] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [pokemonLoaded, setPokemonLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const initialTargets = [];
    let availableIdsCopy = [...availableIds];
    for (let i = 0; i < 3; i++) {
      const idSample = sample(availableIdsCopy);
      //ensure we don't get duplicate IDs
      availableIdsCopy = availableIdsCopy.filter((id) => id != idSample);
      initialTargets.push(idSample);
    }
    setAvailableIds(availableIdsCopy);
    setTargetIds(initialTargets);
  }, []);

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
    if (started) {
      if (targetIds.includes(clickedId)) {
        const sampleId = sample(availableIds);
        setAvailableIds([...availableIds.filter((id) => id != sampleId)]);
        setTargetIds(
          targetIds.map((id) => {
            return id == clickedId ? sampleId : id;
          }),
        );
        setScore(score + 1);
      } else {
        console.log("wrong");
      }
    }
  }

  function startGame() {
    setStarted(true);
  }

  function endGame() {
    setStarted(false);
  }

  return (
    <>
      <Header
        targetIds={targetIds}
        pokemonLoaded={pokemonLoaded}
        pokemon={allPokemonData}
        score={score}
        started={started}
        startGame={startGame}
      />

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
