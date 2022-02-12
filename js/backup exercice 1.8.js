
//Created a Pokemon Repository as IIFE
let pokemonRepository = (function() {

  //Created an Array of Pokemons
  let pokemonList = [];

  //Added API URL
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Created a function for adding a Pokemon
  function add(pokemon) {
    //Validated whether all parameters are objects
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  //Created a function for the Array "pokemonList"
  function getAll() {
    return pokemonList;
  }
  //Created a function adding a button for each item of the pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  //Added a loadList function
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Added a loadDetails function
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //Now we add the details to the item
      item.imgUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Created a function to show pokemon list details
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

//Returned the four(4) functions inside the IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();



// //Added a Pokemon the to the list
// pokemonRepository.add({
//   name: 'Mewtwo',
//   height: 2,
//   types: 'Psy'
// });
// console.log(pokemonRepository.getAll());

//Loaded list of Pokemons
pokemonRepository.loadList().then(function () {

  //Printed the forEach loop
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
