import PropTypes from "prop-types";
import { useState } from "react";

export default function Header({
  targetIds,
  pokemonLoaded,
  pokemon,
  score,
  started,
  startGame,
}) {
  let content;
  if (pokemonLoaded && started) {
    content = (
      <div className="targets">
        {targetIds.map((id) => (
          <div key={id} className="pokemon-container">
            <img
              src={pokemon[id - 1].sprites.front_default}
              alt={pokemon[id - 1].name}
            />
            <div>{pokemon[id - 1].name}</div>
          </div>
        ))}
      </div>
    );
  } else if (pokemonLoaded) {
    content = <button onClick={startGame}>Start Game</button>;
  } else {
    content = <div>Loading</div>;
  }

  return (
    <header>
      <div className="left"></div>
      <div className="middle">{content}</div>

      <div className="right">Score: {score}</div>
    </header>
  );
}

Header.propTypes = {
  targetIds: PropTypes.array,
  pokemonLoaded: PropTypes.bool,
  pokemon: PropTypes.array,
  score: PropTypes.number,
  started: PropTypes.bool,
  startGame: PropTypes.func,
};
