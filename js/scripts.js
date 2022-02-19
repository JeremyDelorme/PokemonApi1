//BEGGINNING OF POKEMON REPOSITORY SCRIPT

//BEGGINNING OF IIFE FOR POKEMON REPOSITORY
let pokemonRepository = (function() {
  //Assigned an Array to the variable 'pokemonList'
  let pokemonList = [];
  //Added API URL
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Created a function to call the pokemonList array
  function getAll() {
    return pokemonList;
  }

  //Created a Function to ADD a Pokemon
  function add(newPokemon) {
    //Validated whether all parameters are objects
    if (typeof newPokemon === "object") {
      pokemonList.push(newPokemon);
      //If they aren't objects
    } else {
      console.log("pokemon is not correct");
    }
  }

  //Created a function to add a button for each pokemon from the apiUrl
  function addListItem(pokemon) {
    let expandablePokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('listItem-style');

    let openModalButton = document.createElement('button');
    openModalButton.innerText = pokemon.name;
    openModalButton.classList.add("button-class", "btn", "btn-primary", "btn-sm");

    openModalButton.setAttribute('data-toggle', 'modal');
    openModalButton.setAttribute('data-target', '#pokemonModal');

    listItem.appendChild(openModalButton);
    expandablePokemonList.appendChild(listItem);


    openModalButton.addEventListener('click', function() {
      showDetails(pokemon);
    })
  }

  //Created a function LOAD the details and PRINT them onto screen
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //Created a function to LOAD LIST of the pokemon List from apiUrl
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Created a function to LOAD the DETAILS of the pokemon List from apiUrl
  function loadDetails(item) {
    //Assigned the variable 'url' to the details of each item
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //Added the details to the item
      item.imgUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
       for (let i = 0; i < details.types.length; i++) {
         let typesDetails = details.types[i].type.name;
         item.types.push(typesDetails[0].toUpperCase() + typesDetails.substring(1));
       }
       item.abilities = [];
       for (let i = 0; i < details.abilities.length; i++) {
         let abilitiesDetails = details.abilities[i].ability.name;
         item.abilities.push(abilitiesDetails[0].toUpperCase() + abilitiesDetails.substring(1));
       }
    }).catch(function (e) {
      console.error(e);
    });
  }


//END OF POKEMON REPOSITORY SCRIPT

//BEGGINNING OF MODAL SCRIPT

  //Create a Function to SHOW the Modal with the POKEMON DETAILS
  function showModal(pokemon) {
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    //Cleared preexisting content
    modalTitle.empty();
    modalBody.empty();


    //Modal Header
    let titleElement = $('<h1>' + pokemon.name + '</h1>');
    let heightElement = $('<p>' + pokemon.height + '</p>');
    let weightElement = $('<p>' + pokemon.weight + '</p>');
    let typesElement = $('<p>' + pokemon.types + '</p>');

    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", pokemon.imgUrl);


    //Appendoing elements to modalBody
    modalTitle.append(titleElement);

    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  // END OF MODAL CONTENT

  // //Created a Function To HIDE the Modal
  // function hideModal() {
  //   //Made a variable out of 'modal-container' html class
  //   let modalContainer = document.querySelector('#modal-container');
  //   //Removed the CSS class 'is-visible' when the Modal is hidden
  //   modalContainer.classList.remove('is-visible');
  // }

//Created a Function for CLOSING Modal through ESCAPE BUTTON
  window.addEventListener('keydown', (e) => {
    //Calling back Modal Container Function
    let modalContainer = document.querySelector('#modal-container');
    //Adding Condition: if KEY = ESCAPE
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

//Returned the four(6) Functions inside the IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
//END OF IIFE FOR POKEMON REPOSITORY

//Loaded list of Pokemons
pokemonRepository.loadList().then(function () {

  //Printed a list of buttons FOR EACH pokemon in the repository
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
