import React, { useState, useEffect, useRef } from 'react';

export async function getPokemonData(pokemonIds) {
  try {
    const promises = pokemonIds.map(async (id) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      return response.json();
    });
    return Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
}

export function sample(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

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

export async function preloadImages(pokemonData) {
  pokemonData.forEach((pokemon) => {
    new Image().src = pokemon.sprites.front_default;
  });
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Use string interpolation to format the time
  const formattedTime = `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;

  return formattedTime;
}

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
