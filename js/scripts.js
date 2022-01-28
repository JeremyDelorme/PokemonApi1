//Creating list of three pokemons with three different attributes

let PokemonList= [
  {
    name: 'Bulbasaur',
    height: 2.04,
    types: ['grass', 'poison'],
  },
  {
    name: 'Charmander',
    height: 2.00,
    types: ['fire'],
  },
  {
    name: 'Gengar',
    height: 4.11,
    types: ['ghost', 'poison'],
  }
]

console.log(PokemonList);

//Creating a for loop that iterates over each item in pokemonList

for (let i = 0; i < PokemonList.length; i++) {
  //adding 'if' condition to pokemons over 3.5 of height
  if(PokemonList[i].height > 3.5) {
    document.write('<p>' +  PokemonList[i].name + ( ', height: ' )+ PokemonList[i].height + ( " (Wow, That\'s big !!)") + '<p>');
  //adding 'else' condition to all other pokemons
 } else {
   document.write('<p>' +  PokemonList[i].name + ( ', height: ' )+ PokemonList[i].height + ( " (That's not so big)") + '<p>');
 }
};
