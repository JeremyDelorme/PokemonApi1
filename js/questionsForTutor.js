// QUESTIONS FOR TUTOR

// 1: HOW DO I WRITE THIS ON MY PAGE AS AN UNORDERED LIST?

let pokemonRepository = (function() {
  let pokemonList = [];
    pokemonList[0] = {
      name: 'Bulbasaur',
      height: 2.04,
      types: ['grass', 'poison']
    },
    pokemonList[1] = {
      name: 'Charmander',
      height: 2.00,
      types: ['fire']
    },
    pokemonList[2] = {
      name: 'Gengar',
      height: 4.11,
      types: ['ghost', 'poison']
    }
  };

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }

    return {
      add: add,
      getAll: getAll,
    };

})();

pokemonList.forEach(function(pokemon) {
  document.write(pokemon.name + " mesures " + pokemon.height + " cm: ");

  // Creating if...else condition statement

  if (pokemon.height > 3.5) {
    document.write(' Wow, that\'s big!');
  } else if (pokemon.height <= 3.5) {
    document.write(' Oh, that\'s not so big');
  }
});
