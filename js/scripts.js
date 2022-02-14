//BEGGINNING OF POKEMON REPOSITORY SCRIPT

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

  //Added a loadList function
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

  //Created a function adding a button for each item of the pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    buttonEventListener(button, pokemon);
  }

  function buttonEventListener(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  //Created a function to show pokemon list details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      (pokemon.name, 'Height: ' + pokemon.height);
    });
  }

//END OF POKEMON REPOSITORY SCRIPT

//BEGGINNING OF MODAL SCRIPT

//Create a Function to SHOW the Modal
  function showModal(title, text) {

    let modalContainer = document.querySelector('#modal-container');
    //Cleared inside of 'modal-container'
    modalContainer.innerHTML = '';

    //Created a variable to create a 'div' from JS: 'modal'
    let modal = document.createElement('div');
    //Added a CSS class to the 'modal' variable
    modal.classList.add('modal');

    // BEGGINNING OF MODAL CONTENT

    //Created a variable for the CLOSE BUTTON
    let closeButtonElement = document.createElement('button');
    //Added  a CSS class to the CLOSE BUTTON: 'modal-close'
    closeButtonElement.classList.add('modal-close');
    //Defined Text inside CLOSE BUTTON:
    closeButtonElement.innerText = 'Close';
    //Added Event Listener for the CLOSE BUTTON
    closeButtonElement.addEventListener('click', hideModal);

    //Created a variable for the MODAL TITLE
    let titleElement = document.createElement('h1');
    //Defined Text inside MODAL TITLE
    titleElement.innerText = title;

    //Created a variable for the MODAL CONTENT
    let contentElement = document.createElement('p');
    //Defined Text inside MODAL CONTENT
    contentElement.innerText = text;

    //Append Button (child) to 'modal'(parent)
    modal.appendChild(closeButtonElement);
    //Append Title (child) to 'modal' (parent)
    modal.appendChild(titleElement);
    //Append Content (child) to 'modal' (parent)
    modal.appendChild(contentElement);
    //Append 'modal' (child) to 'modal-container' (parent)
    modalContainer.appendChild(modal);

    //Added a CSS class to the Modal Container: 'is-visible'
    modalContainer.classList.add('is-visible');

    closeButtonElement.addEventListener('click', hideModal);

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }
  // END OF MODAL CONTENT

//Created a Function To HIDE the Modal
  function hideModal() {
    //Made a variable out of 'modal-container' html class
    let modalContainer = document.querySelector('#modal-container');
    //Removed the CSS class 'is-visible' when the Modal is hidden
    modalContainer.classList.remove('is-visible');
  }

//Created a Function for CLOSING Modal through ESCAPE BUTTON
  window.addEventListener('keydown', (e) => {
    //Calling back Modal Container Function
    let modalContainer = document.querySelector('#modal-container');
    //Adding Condition: if KEY = ESCAPE
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

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
//Loaded list of Pokemons
pokemonRepository.loadList().then(function () {

  //Printed the forEach loop
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// //BEGGINNING OF SUBMIT FORM SCRIPT
//
// //Created a function for the SUBMIT FORM
// (function() {
//   //Made a variable out of 'register-form' html id
//   let form = document.querySelector('#register-form');
//   //Made a variable out of 'email' html id
//   let emailInput = document.querySelector('#email');
//   //Made a variable out of 'password' html id
//   let passwordInput = document.querySelector('#password');
//
//   //Created a Function to VALIDATE EMAIL
//   function validateEmail() {
//     //Created a variable for the VALUE of the Email Input
//     let value = emailInput.value;
//     //Added a condition: if there is NO INPUT
//     if (!value) {
//       showErrorMessage(emailInput, 'Email is a required field.');
//       return false;
//     }
//     //Added a condition: if '@' is not found in the input
//     if (value.indexOf('@') === -1) {
//       showErrorMessage(emailInput, 'You must enter a valid email address.');
//       return false;
//     }
//
//     //??
//     showErrorMessage(emailInput, null);
//     return true;
//   }
//
//   //Created a Function to VALIDATE PASSWORD
//   function validatePassword() {
//     //Created a variable for the VALUE of the Password Input
//     let value = passwordInput.value;
//     //Added a condition: if there is NO INPUT
//     if (!value) {
//       showErrorMessage(passwordInput, 'Password is a required field.');
//       return false;
//     }
//     //Added a condition: if the input contains LESS than 8 CHARACTERS
//     if (value.length < 8) {
//       showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
//       return false;
//     }
//
//     //??
//     showErrorMessage(passwordInput, null);
//     return true;
//   }
//
//   //Created a Function to SHOW ERROR MESSAGE
//   function showErrorMessage(input, message) {
//     //Made a variable out of the Parent Element ('.input-wrapper') of the input: 'container'
//     let container = input.parentElement;
//     //Made a variable out of 'error-message' CSS class: 'error'
//     let error = container.querySelector('.error-message');
//     //??
//     if (error) {
//       container.removeChild(error);
//   }
//     //Added a condition: if there's a message,
//     if (message) {
//       let error = document.createElement('div');
//       error.classList.add('error-message');
//       error.innerText = message;
//       container.appendChild(error);
//     }
//   }
//
//   //Added Form Validation function
//   function validateForm() {
//     //Created a variable out of Email Validation Function
//     let isValidEmail = validateEmail();
//     //Created a function out of Password Validation Function
//     let isValidPassword = validatePassword();
//     return isValidEmail && isValidPassword;
//   }
//
//   //Added an Event Listener to the Submit Button
//   form.addEventListener('submit', (e) => {
//     e.preventDefault(); // Do not submit to the server
//     if (validateForm()) {
//       alert('Success!');
//     }
//   });
//
//   //Printing two inputs
//   emailInput.addEventListener('input', validateEmail);
//   passwordInput.addEventListener('input', validatePassword);
//
// })();

//END OF SUBMIT FORM SCRIPT
