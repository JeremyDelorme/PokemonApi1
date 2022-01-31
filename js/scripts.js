
// Display the data on the page as an unordered list
document.write('<ul class="pokemon-list">');
// List of Pokemons with attributes
let pokemonList = [
  {
    name: 'Bulbasaur',
    height: 2.04,
    types: ['grass', 'poison']
  },
  {
    name: 'Charmander',
    height: 2.00,
    types: ['fire']
  },
  {
    name: 'Gengar',
    height: 4.11,
    types: ['ghost', 'poison']
  },
]

// For loop
for (let i = 0; i < pokemonList.length; i++) {
  let currentPokemon = pokemonList[i];

  document.write(`
    <li class="pokemon-list__item">
      ${currentPokemon.name} (height: <span>${currentPokemon.height}</span>)
  `);
  // If condition
  if (currentPokemon.height > 3.5) {
    document.write(' - Wow, that\'s big!');
  } else if (currentPokemon.height <= 3.5) {
    document.write(' - Oh, that\'s not so big');
  }
  document.write('</li>');
}
document.write('</ul>');
