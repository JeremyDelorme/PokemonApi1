//Creating Pokemon Repository as IIFE
let pokemonRepository = (function() {

  //Creating Array of Pokemons
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
    }
  ];

  //Creating a function for adding a Pokemon
  function add(pokemon) {

    //Validating whether all parameters are objects
    if(typeof pokemon === 'object' ){

      //Validating Object.keys() to equal expected keys
      if(Object.keys(pokemon)[0] === 'name' &&
        Object.keys(pokemon)[1] === 'height' &&
        Object.keys(pokemon)[2] === 'type'){
        pokemonList.push(pokemon);
      }
    }
  }

//Creating a function for the Array "pokemonList"
  function getAll() {
    return pokemonList;
  }

//Returning the two functions
  return {
    add: add,
    getAll: getAll,
  };

})();

//Adding a Pokemon the to the list
pokemonRepository.add({
  name: 'Mewtwo',
  height: 2,
  type: 'Psy'
});

//Writing pokemonRepository as unordered list
document.write('<ul>');

//Creating forEach loop
pokemonRepository.getAll().forEach(function(pokemon) {

  //Writing pokemons as items of the unordered list pokemonList
  document.write('<li>');
    document.write(`
    ${pokemon.name} ${' mesures '} ${pokemon.height} ${'meters: '}
    `);

  //Creating "if....else" condition
  if(pokemon.height > 3.5) {
    document.write(' Wow, that\'s big! :) ');
  } else if(pokemon.height <= 3.5) {
    document.write(' Oh, that\'s not so big :( ');
  }
})
  document.write('</li>')

document.write('</ul>');
