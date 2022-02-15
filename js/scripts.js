//BEGGINNING OF POKEMON REPOSITORY SCRIPT

//BEGGINNING OF IIFE FOR POKEMON REPOSITORY
let pokemonRepository = (function() {
  //Assigned an Array to the variable 'pokemonList'
  let pokemonList = [];
  //Added API URL
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Created a Function to ADD a Pokemon
  function add(pokemon) {
    //Validated whether all parameters are objects
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
      //If they aren't objects
    } else {
      console.log("pokemon is not correct");
    }
  }

  //Created a function to call the pokemonList array
  function getAll() {
    return pokemonList;
  }

  //Created a function to LOAD LIST of the pokemon List from apiUrl
  function loadList(){
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
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Created a function to add a button for each pokemon from the apiUrl
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    //Added an EVENT LISTENER to the pokemon Buttons
    buttonEventListener(button, pokemon);
  }

  //Created a function to ADD an EVENT LISTENER to the button that will show the Pokemon Details when CLICKED
  function buttonEventListener(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  //Created a function LOAD the details and PRINT them onto screen
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, 'Height: ' + pokemon.height, pokemon.imgUrl);
    });
  }

//END OF POKEMON REPOSITORY SCRIPT

//BEGGINNING OF SUBMIT FORM SCRIPT

//Created a function for the SUBMIT FORM
(function() {
  //Made the variable 'form' out of 'register-form' html id
  let form = document.querySelector('#register-form');
  //Made the variable 'emailInput' out of 'email' html id
  let emailInput = document.querySelector('#email');
  //Made the variable 'passwordInput' out of 'password' html id
  let passwordInput = document.querySelector('#password');

  //Created a Function to VALIDATE EMAIL
  function validateEmail() {
    //Assigned the variable 'value' as a PARAMETER of the 'emailInput' variable
    let value = emailInput.value;
    //Added a condition: if there is NO INPUT
    if (!value) {
      showErrorMessage(emailInput, 'Email is a required field.');
      return false;
    }
    //Added a condition: if '@' is not found in the input
    if (value.indexOf('@') === -1) {
      showErrorMessage(emailInput, 'You must enter a valid email address.');
      return false;
    }

    //When there's an email and nothing else
    showErrorMessage(emailInput, null);
    return true;
  }

  //Created a Function to VALIDATE PASSWORD
  function validatePassword() {
    //Assigned the variable 'value' as a PARAMETER of the 'passwordInput' variable
    let value = passwordInput.value;
    //Added a condition: if there is NO INPUT
    if (!value) {
      showErrorMessage(passwordInput, 'Password is a required field.');
      return false;
    }
    //Added a condition: if the input contains LESS than 8 CHARACTERS
    if (value.length < 8) {
      showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
      return false;
    }

    //When there's a password and nothing else
    showErrorMessage(passwordInput, null);
    return true;
  }

  //Created a Function to SHOW ERROR MESSAGE
  function showErrorMessage(input, message) {
    //Assigned variable 'container' to the parent Element of the inputs: 'input-wrapper'
    let container = input.parentElement;
    //Made the variable 'error' out of 'error-message' CSS class
    let error = container.querySelector('.error-message');
    //??
    if (error) {
      container.removeChild(error);
  }
    //Added a condition: if there's a message,
    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }

  //Added Form Validation function
  function validateForm() {
    //Created a variable out of Email Validation Function
    let isValidEmail = validateEmail();
    //Created a function out of Password Validation Function
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }

  //Added an Event Listener to the Submit Button
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Success!');
    }
  });

  //Added an Event listener for VALIDATING the EMAIL
  emailInput.addEventListener('input', validateEmail);
  //Added an Event listener for VALIDATING the PASSWORD
  passwordInput.addEventListener('input', validatePassword);

})();

//END OF SUBMIT FORM SCRIPT

//BEGGINNING OF MODAL SCRIPT

  //Create a Function to SHOW the Modal with the POKEMON DETAILS
  function showModal(title, text, img_src) {
    //Assigned the variable 'modalContainer' to the HTML id
    let modalContainer = document.querySelector('#modal-container');
    //Cleared inside of 'modal-container'
    modalContainer.innerHTML = '';

    //Assigned the variable 'imgContainer' to the HTML id
    let imgContainer = document.querySelector('image-container');
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

    //Created a variable for the MODAL IMG
    let imgElement = document.createElement('img');
    //Added a CSS class to the IMAGE: 'modal-img'
    imgElement.classList.add('modal-img');
    //
    imgElement.src = img_src;

    //Append Button (child) to 'modal'(parent)
    modal.appendChild(closeButtonElement);
    //Append Title (child) to 'modal' (parent)
    modal.appendChild(titleElement);
    //Append Content (child) to 'modal' (parent)
    modal.appendChild(contentElement);
    //Append Image (child) to 'modal' (parent)
    modal.appendChild(imgElement);
    //Append 'modal' (child) to 'modal-container' (parent)
    modalContainer.appendChild(modal);

    //Added a CSS class to the Modal Container: 'is-visible'
    modalContainer.classList.add('is-visible');
    //Close modal when user clicks on 'Close'
    closeButtonElement.addEventListener('click', hideModal);
    //Close modal when modal is open and user CLICKS OUTSIDE the modal
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
