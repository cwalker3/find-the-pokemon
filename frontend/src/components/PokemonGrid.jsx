import { zIndexFor } from "../utils/utils";
import PropTypes from "prop-types";

export default function PokemonGrid({ ids, checkClick, pokemon }) {
  function onClick(e) {
    checkClick(+e.target.dataset.id);
  }

  return (
    <div className="pokemon-grid">
      {ids.map((id) => (
        <div
          key={id}
          className="pokemon-container"
          data-id={id}
          onClick={onClick}
        >
          <img
            src={pokemon[id - 1].sprites.front_default}
            style={{ zIndex: zIndexFor(pokemon[id - 1]) }}
          />
        </div>
      ))}
    </div>
  );
}

PokemonGrid.propTypes = {
  ids: PropTypes.array,
  checkClick: PropTypes.func,
  pokemon: PropTypes.array,
};
