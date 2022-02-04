// Creating the array pokemonList

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
];

// Writing array as a unordered list from index.html

document.write('<ul class="pokemon-list">');

// Creating forEach loop

pokemonList.forEach(function(pokemon) {

  // 1. Writing name + height of each pokemon
  // 2. Making each pokemon an item of unordered list pokemonList
  document.write(`
    <li class="pokemon-list__item">
      ${pokemon.name} ${'mesures'} ${pokemon.height} ${'cm:'}
  `);

  // Creating if...else condition statement

  if (pokemon.height > 3.5) {
    document.write(' Wow, that\'s big!');
  } else if (pokemon.height <= 3.5) {
    document.write(' Oh, that\'s not so big');
  }
})

    document.write('</li>');

document.write('</ul>');
