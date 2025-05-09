// Seleção dos elementos HTML necessários para manipulação
let imgPokemon = document.querySelector("#fotopokemon");       // Imagem do Pokémon
let formPoke = document.querySelector("#form");                // Formulário de busca
let inputF = document.querySelector("#input");                 // Campo de entrada (nome ou número)
let idPoke = document.querySelector("#idpokemon");             // Exibição do ID do Pokémon
let nomePoke = document.querySelector("#nomepokemon");         // Exibição do nome do Pokémon
let tipo1poke = document.querySelector("#tipo1");              // Tipo primário
let tipo2poke = document.querySelector("#tipo2");              // Tipo secundário
let habilidade = document.querySelector("#habilidade");        // Habilidade principal
let peso = document.querySelector("#peso");                    // Peso do Pokémon
let altura = document.querySelector("#altura");                // Altura do Pokémon
let back = document.querySelector("#btnvoltar");               // Botão de voltar
let next = document.querySelector("#btnproximo");              // Botão de avançar
let audio1 = document.querySelector("#audio1");                // Áudio do som do Pokémon
let audio = document.getElementById("pokemonAudio");           // Áudio de introdução
let numeroPokedex = 1;                                         // Número atual da Pokédex

// Busca os dados de um Pokémon usando a PokéAPI
const fecthPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIresponse.json();
    return data;
}

// Exibe as informações do Pokémon na tela
const mostraPokemon = async (pokemon) => {
    const dataPokemon = await fecthPokemon(pokemon);

    // Exibe sprite animada se disponível, senão usa a padrão
    segundaImagem(dataPokemon.sprites.other.showdown.front_default, dataPokemon.sprites.front_default);

    nomePoke.innerHTML = dataPokemon.name;
    idPoke.innerHTML = dataPokemon.id;
    tipo1poke.innerHTML = "Tipo 1: " + dataPokemon.types[0].type.name;

    // Verifica se há um segundo tipo
    tipo2poke.innerHTML = dataPokemon.types[1] ? "Tipo 2: " + dataPokemon.types[1].type.name : "";

    habilidade.innerHTML = "Habilidade: " + dataPokemon.abilities[0].ability.name;
    altura.innerHTML = "Altura: " + (dataPokemon.height / 10) + " m";
    peso.innerHTML = "Peso: " + (dataPokemon.weight / 10) + " kg";

    audio1.src = dataPokemon.cries.latest;
    audio1.play();
}

// Evento de envio do formulário (busca Pokémon digitado)
formPoke.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede a página de recarregar
    mostraPokemon(inputF.value.toLowerCase()); // Busca Pokémon digitado
})

// Botão de voltar (navega para o Pokémon anterior)
back.addEventListener("click", () => {
    if (numeroPokedex > 1) {
        numeroPokedex--;
        mostraPokemon(numeroPokedex);
    }
})

// Botão de avançar (navega para o próximo Pokémon)
next.addEventListener("click", () => {
    if (numeroPokedex < 1000) {
        numeroPokedex++;
        mostraPokemon(numeroPokedex);
    }
})

// Tenta carregar a imagem animada do Pokémon, senão usa a estática
function segundaImagem(gif, image) {
    imgPokemon.src = gif;
    imgPokemon.onerror = function () {
        this.onerror = null;
        this.src = image;
    };
}

// Funções para controle manual do áudio de introdução
function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

// Exibe o primeiro Pokémon assim que a página carrega
mostraPokemon(numeroPokedex);
