


//Created a Pokemon Repository as IIFE
let pokemonRepository = (function() {

  //Created an Array of Pokemons
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 2.04,
      type: ['grass', 'poison']
    },
    {
      name: 'Charmander',
      height: 2.00,
      type: ['fire']
    },
    {
      name: 'Gengar',
      height: 4.11,
      type: ['ghost', 'poison']
    }
  ];

  //Created a function for adding a Pokemon
  function add(pokemon) {
    //Validated whether all parameters are objects
    if(typeof pokemon === 'object' ){
      //Validated Object.keys() to equal expected keys
      if(Object.keys(pokemon)[0] === 'name' &&
        Object.keys(pokemon)[1] === 'height' &&
        Object.keys(pokemon)[2] === 'type'){
        pokemonList.push(pokemon);
      }
    }
  }

  //Created a function for the Array "pokemonList"
  function getAll() {
    return pokemonList;
  }
  //Created a function adding a button for each item of the pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  //Created a function to show pokemon list details
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

//Returned the four(4) functions inside the IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };

})();

//Added a Pokemon the to the list
pokemonRepository.add({
  name: 'Mewtwo',
  height: 2,
  type: 'Psy'
});
console.log(pokemonRepository.getAll());

//Created a forEach loop
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
