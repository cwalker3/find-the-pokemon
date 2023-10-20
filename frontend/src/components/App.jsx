import { useState, useEffect } from "react";
import { getPokemonData, preloadImages } from "../utils/utils";
import Header from "./Header";
import PokemonGrid from "./PokemonGrid";
import GameOver from "./GameOver";

const backendUrl = "http://localhost:3000";

function App() {
  const [gameId, setGameId] = useState(null);
  const [targetIds, setTargetIds] = useState([]);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonLoaded, setPokemonLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    initializeGame();
  }, []);

  async function initializeGame() {
    try {
      let response = await fetch(backendUrl + "/games", {
        method: "POST",
      });
      const game = await response.json();
      setGameId(game.id);
      setPokemonIds(game.pokemon_ids);
      setTargetIds(game.target_ids);
      const pokemonData = await getPokemonData(game.pokemon_ids);
      preloadImages(pokemonData);
      setPokemonData(pokemonData);
      setPokemonLoaded(true);
    } catch {
      console.log("error initializing game");
    }
  }

  async function sendClick(clickedId) {
    if (started) {
      const response = await fetch(
        backendUrl + `/games/${gameId}/check_input/${clickedId}`,
        {
          method: "POST",
        },
      );
      const game = await response.json();
      setScore(game.score);
      setTargetIds(game.target_ids);
    }
  }

  async function startGame() {
    if (userName) {
      await fetch(backendUrl + `/games/${gameId}/update_name/${userName}`, {
        method: "POST",
      });
    }
    const response = await fetch(backendUrl + `/games/${gameId}/start`, {
      method: "POST",
    });
    const game = await response.json();
    setStarted(true);
    setTimeRemaining(game.time_remaining);
  }

  function endGame() {
    setGameOver(true);
  }

  function restartGame() {
    setPokemonLoaded(false);
    setStarted(false);
    setGameOver(false);
    initializeGame();
  }

  return (
    <>
      {gameOver && (
        <GameOver
          gameId={gameId}
          backendUrl={backendUrl}
          restartGame={restartGame}
        />
      )}
      <Header
        targetIds={targetIds}
        pokemonLoaded={pokemonLoaded}
        pokemonData={pokemonData}
        score={score}
        started={started}
        startGame={startGame}
        endGame={endGame}
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        userName={userName}
        setUserName={setUserName}
      />

      <PokemonGrid
        pokemonIds={pokemonIds}
        sendClick={sendClick}
        pokemonData={pokemonData}
        pokemonLoaded={pokemonLoaded}
      />
    </>
  );
}

export default App;
