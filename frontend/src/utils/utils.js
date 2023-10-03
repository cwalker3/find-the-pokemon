//returns a larger z-index for smaller pokemon
export function zIndexFor(pokemon) {
  const height = pokemon.height;
  if (height < 5) {
    return 5;
  } else if (height < 10) {
    return 4;
  } else if (height < 20) {
    return 3;
  } else if (height < 50) {
    return 2;
  } else {
    return 1;
  }
}

export function shuffledPokemonIds() {
  return shuffleArray(pokemonIds());
}

function pokemonIds() {
  let ids = [];
  for (let i = 1; i <= 1010; i++) {
    ids.push(i);
  }
  return ids;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function preloadImages(pokemonData) {
  pokemonData.forEach((pokemon) => {
    new Image().src = pokemon.sprites.front_default;
  });
}
