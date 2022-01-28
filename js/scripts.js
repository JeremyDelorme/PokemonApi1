alert('Hello world');

//Added square brackets to 'fire' type.
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

for (let i = 0; i < PokemonList.length; i++) {
  if(PokemonList[i].height > 3) {
    document.write('<p>' +  PokemonList[i].name + ( ', height: ' )+ PokemonList[i].height + ( " (Wow, That\'s big !!)") + '<p>');
 } else {
   document.write('<p>' +  PokemonList[i].name + ( ', height: ' )+ PokemonList[i].height + ( " (That's not so big)") + '<p>');
  }
};
