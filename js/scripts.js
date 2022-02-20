//BEGGINNING OF IIFE FOR POKEMON REPOSITORY -->

//BEGGINNING OF POKEMON REPOSITORY SCRIPT -->
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
    //Assigned the variable 'expandablePokemonList' to the pokemon-list class
    let expandablePokemonList = document.querySelector('.pokemon-list');
    //Created the variable 'listItem' from list elements
    let listItem = document.createElement('li');
    //Added the class 'listItem-style' to the 'listItem' variable
    listItem.classList.add('listItem-style');

    //Created the variable 'openModalButton' from the 'button' class
    let openModalButton = document.createElement('button');
    //Defined Text inside the Button
    openModalButton.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    //Added classes to the openModalButton variable
    openModalButton.classList.add("button-class", "btn", "btn-primary", "btn-sm");

    //Added the data toggle to trigger the modal
    openModalButton.setAttribute('data-toggle', 'modal');
    //Added the data target to trigger the modal
    openModalButton.setAttribute('data-target', '#pokemonModal');

    //Appended 'openModalButton' to 'listItem'
    listItem.appendChild(openModalButton);
    //Appended 'listItem' to 'expandablePokemonList'
    expandablePokemonList.appendChild(listItem);

    //Added an Event Listener for when user clicks on each Pokemon
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

  //Created a function to LOAD the LIST of pokemon List from apiUrl
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


//<-- END OF POKEMON REPOSITORY SCRIPT

//BEGGINNING OF MODAL SCRIPT -->

  //Create a Function to SHOW the Modal with the POKEMON DETAILS
  function showModal(pokemon) {
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    //Cleared preexisting content
    modalTitle.empty();
    modalBody.empty();


    //Modal Header
    let titleElement = $('<h1>' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + '</h1>');
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + ' cm' + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + ' pounds' + '</p>');
    let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');

    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", pokemon.imgUrl);


    //Appending titleElement to the modalTitle
    modalTitle.append(titleElement);
    //Appending elements to modalBody
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  //<-- END OF MODAL SCRIPT

//Returned the six(6) Functions inside the IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//<-- END OF IIFE FOR POKEMON REPOSITORY

//Loaded list of Pokemons
pokemonRepository.loadList().then(function () {

  //Printed a list of buttons FOR EACH pokemon in the repository
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
