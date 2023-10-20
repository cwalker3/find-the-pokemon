import PropTypes from "prop-types";
import Timer from "./Timer";
import { useState } from "react";
import { capitalizeFirstLetter } from "../utils/utils";

export default function Header({
  targetIds,
  pokemonLoaded,
  pokemonData,
  score,
  started,
  startGame,
  endGame,
  timeRemaining,
  setTimeRemaining,
  userName,
  setUserName,
}) {
  const [collapsed, setCollapsed] = useState(false);

  function findPokemon(id) {
    return pokemonData.find((pokemon) => pokemon.id == id);
  }

  function handleButtonClick() {
    startGame();
  }

  function onChange(e) {
    setUserName(e.target.value);
  }

  function onKeyDown(e) {
    if (e.key == "Enter") {
      startGame();
    }
  }

  function toggleCollapse() {
    collapsed ? setCollapsed(false) : setCollapsed(true);
  }

  let content;
  if (pokemonLoaded && started) {
    content = (
      <div className="targets">
        {targetIds.map((id) => (
          <div
            key={id}
            className={
              collapsed ? "pokemon-container collapsed" : "pokemon-container"
            }
          >
            <img
              src={findPokemon(id).sprites.front_default}
              alt={findPokemon(id).name}
            />
            <div>{capitalizeFirstLetter(findPokemon(id).name)}</div>
          </div>
        ))}
      </div>
    );
  } else if (pokemonLoaded) {
    content = (
      <div>
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Enter your name"
          value={userName}
        ></input>
        <button onClick={handleButtonClick}>Start Game</button>
      </div>
    );
  } else {
    content = <div>Loading</div>;
  }

  return (
    <header>
      <div className="left">
        <Timer
          started={started}
          endGame={endGame}
          timeRemaining={timeRemaining}
          setTimeRemaining={setTimeRemaining}
        />
      </div>
      <div className="middle">{content}</div>

      <div className="right">Score: {score}</div>
      {started && (
        <img
          src={collapsed ? "/expand.svg" : "/collapse.svg"}
          alt={collapsed ? "expand" : "collapse"}
          className="expand-collapse"
          onClick={toggleCollapse}
        />
      )}
    </header>
  );
}

Header.propTypes = {
  targetIds: PropTypes.array,
  pokemonLoaded: PropTypes.bool,
  pokemonData: PropTypes.array,
  score: PropTypes.number,
  started: PropTypes.bool,
  startGame: PropTypes.func,
};
