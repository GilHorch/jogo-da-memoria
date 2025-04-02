// Lista de imagens para representar as cartas do jogo
const symbols = [
    "carta.png",
    "img/banana.png",
    "img/cherry.png",
    "img/grape.png",
    "img/watermelon.png",
    "img/pineapple.png",
    "img/kiwi.png",
    "img/strawberry.png",
    "img/coconut.png",
    "img/orange.png"
];

// Duplica os símbolos para criar pares e embaralha a lista de cartas
let cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const grid = document.getElementById("grid");

// Cria as cartas dinamicamente e adiciona eventos de clique a cada uma
cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    // Adiciona um elemento de imagem dentro da carta
    const img = document.createElement("img");
    img.src = symbol;
    img.classList.add("card-image");
    img.style.display = "none"; // Esconde a imagem inicialmente
    card.appendChild(img);

    card.addEventListener("click", flipCard);
    grid.appendChild(card);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    const img = this.querySelector("img");
    img.style.display = "block"; // Exibe a imagem ao clicar
    this.classList.remove("hidden");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    lockBoard = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        resetCards(true);
    } else {
        setTimeout(() => resetCards(false), 1000);
    }
}

function resetCards(match) {
    if (!match) {
        firstCard.querySelector("img").style.display = "none";
        secondCard.querySelector("img").style.display = "none";
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
