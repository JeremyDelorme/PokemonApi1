alert('Hello world');

//Added square brackets to 'fire' type.
let pokemonList = [
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
  },
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write('${pokemonList.name} (height: ${pokemonList[i].height})')<br>;

  if(pokemonList[i].height > 0.6){
    document.write("${Wow, that's big!!}");
  }else(pokemonList[i].height <= 0.6){
    document.write("${That's a regular size}");
  },
};
