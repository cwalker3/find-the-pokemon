import PokemonGrid from './PokemonGrid'
import { useState } from 'react'
import { shuffledPokemonIds } from '../utils/utils';


function App() {
  const [ids, setIds] = useState(shuffledPokemonIds());

  return (
    <PokemonGrid ids={ids}/>
  )
}

export default App
