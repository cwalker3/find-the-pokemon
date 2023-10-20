import { zIndexFor } from "../utils/utils";
import PropTypes from "prop-types";

export default function PokemonGrid({
  pokemonIds,
  sendClick,
  pokemonData,
  pokemonLoaded,
}) {
  function onClick(e) {
    sendClick(+e.target.dataset.id);
  }

  return (
    <div className="pokemon-grid-container">
      {pokemonLoaded ? (
        <div className="pokemon-grid">
          {pokemonData.map((pokemon) => (
            <div
              key={pokemon.id}
              className="pokemon-container"
              data-id={pokemon.id}
              onClick={onClick}
            >
              <img
                src={pokemon.sprites.front_default}
                style={{ zIndex: zIndexFor(pokemon) }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

PokemonGrid.propTypes = {
  pokemonIds: PropTypes.array,
  sendClick: PropTypes.func,
  pokemonData: PropTypes.array,
};
