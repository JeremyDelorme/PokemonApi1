document.addEventListener('DOMContentLoaded', function () {
    const pokemonList = document.querySelector('.pokemon-list');
    const motifColors = ['#f6a80b', '#ff4f7e', '#4fc1ff', '#ff69b4', '#ff6347']; // Your motif colors

    // Replace this with actual data
    const pokemonData = [
        // Pokémon data here
    ];

    // Generate Pokémon cards
    pokemonData.forEach((pokemon, index) => {
        const card = document.createElement('li');
        card.className = 'pokemon-card';

        const motif = document.createElement('div');
        motif.className = 'motif';
        motif.style.backgroundColor = motifColors[index % motifColors.length];

        // Add your card content here
        card.appendChild(motif);

        pokemonList.appendChild(card);
    });
});
