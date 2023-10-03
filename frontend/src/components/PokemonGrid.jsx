import { useEffect, useState } from "react"
import { preloadImages, zIndexFor } from "../utils/utils";

export default function PokemonGrid({ids}) {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const promises = ids.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          return await response.json();
      })
        const pokemonData = await Promise.all(promises)
        await preloadImages(pokemonData);
        setPokemonArray(pokemonData);
        setIsLoading(false);

      }
      catch(error) {
        console.log(error)
      }

    }
    fetchPokemon();
  }, [ids])

  if (isLoading) {
    return(<div className='loading'>Loading</div>)
  } else {
    return (
      <div className='container'>
        <div className="pokemonGrid">
          {
            pokemonArray.map(pokemon =>
              <img key={pokemon.id} src={pokemon.sprites.front_default} style={{zIndex: zIndexFor(pokemon)}}/>
            )
            }
        </div>
      </div>
    )
  }
}