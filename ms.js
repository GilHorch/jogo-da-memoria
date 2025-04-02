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
let firstCard = null; // Variável para armazenar a primeira carta selecionada
let secondCard = null; // Variável para armazenar a segunda carta selecionada
let lockBoard = false; // Variável para impedir novas interações enquanto verifica um par

// Obtém o elemento da grade no HTML onde as cartas serão adicionadas
const grid = document.getElementById("grid");

// Cria as cartas dinamicamente e adiciona eventos de clique a cada uma
cards.forEach((symbol, index) => {
    const card = document.createElement("div"); // Cria um elemento <div> para representar a carta
    card.classList.add("card", "hidden"); // Adiciona classes CSS para ocultar a carta inicialmente
    card.dataset.symbol = symbol; // Armazena o caminho da imagem como um atributo personalizado
    card.dataset.index = index; // Atribui um índice único à carta

    // Cria um elemento de imagem dentro da carta
    const img = document.createElement("img");
    img.src = symbol; // Define a fonte da imagem
    img.classList.add("card-image"); // Adiciona uma classe para estilização no CSS
    img.style.width = "100%"; // Define a largura da imagem
    img.style.height = "100%"; // Define a altura da imagem
    img.style.display = "none"; // Esconde a imagem inicialmente

    card.appendChild(img); // Adiciona a imagem dentro da carta
    card.addEventListener("click", flipCard); // Adiciona evento de clique à carta
    grid.appendChild(card); // Adiciona a carta à grade no HTML
});

// Função que manipula o clique na carta e revela seu conteúdo
function flipCard() {
    if (lockBoard) return; // Se o tabuleiro estiver bloqueado, impede novas interações
    if (this === firstCard) return; // Impede que o jogador clique duas vezes na mesma carta

    const img = this.querySelector("img"); // Obtém a imagem dentro da carta
    img.style.display = "block"; // Exibe a imagem ao clicar
    this.classList.remove("hidden"); // Remove a classe que oculta a carta

    if (!firstCard) {
        firstCard = this; // Se for a primeira carta clicada, armazena a referência
        return;
    }

    secondCard = this; // Se for a segunda carta clicada, armazena a referência
    checkMatch(); // Chama a função para verificar se há um par
}

// Função que verifica se as duas cartas viradas são iguais
function checkMatch() {
    lockBoard = true; // Bloqueia interações enquanto verifica a correspondência

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        resetCards(true); // Se as cartas combinam, mantém elas visíveis
    } else {
        setTimeout(() => resetCards(false), 1000); // Se não combinam, esconde as cartas após um segundo
    }
}

// Função para redefinir o estado das cartas após a verificação
function resetCards(match) {
    if (!match) { // Se não forem iguais, esconde as cartas novamente
        firstCard.querySelector("img").style.display = "none"; // Oculta a imagem da primeira carta
        secondCard.querySelector("img").style.display = "none"; // Oculta a imagem da segunda carta
        firstCard.classList.add("hidden"); // Adiciona a classe para esconder a primeira carta
        secondCard.classList.add("hidden"); // Adiciona a classe para esconder a segunda carta
    }

    firstCard = null; // Reseta a variável da primeira carta
    secondCard = null; // Reseta a variável da segunda carta
    lockBoard = false; // Desbloqueia o tabuleiro para novas jogadas
}
