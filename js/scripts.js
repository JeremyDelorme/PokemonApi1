// Creating the array pokemonList

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

  function printArrayDetails(pokemon){
    let output = "";
    list.forEach(function(pokemon){
      output = `${pokemon.name} ${'mesures'} ${pokemon.height} ${'cm:'}`;
      if (pokemon.height > 3.5) {
       document.write(' Wow, that\'s big!');
      } else if (pokemon.height <= 3.5) {
      document.write(' Oh, that\'s not so big');
      }
    });
    return output;
  };

  let string = printArrayDetails(pokemonRepository.getAll());
  document.getElementById('pokemon-list') = string
