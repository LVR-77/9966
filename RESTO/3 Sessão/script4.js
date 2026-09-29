const imagem = document.querySelector('#img');
const titulo = document.querySelector('#titulo');

// Seleciona todos os elementos com a classe .botoes (devolve uma lista)
const botoes = document.querySelectorAll('.botoes');

// Mapeia cada constante para a sua respetiva posição no HTML (começa em 0)
const rodar = botoes[0];
const crescer = botoes[1];
const encolher = botoes[2];
const mudarCor = botoes[3];
const reiniciar = botoes[4];

// Definir e inicializar as variáveis
let angulo = 0;
let tamanho = 1;
let inverterCor = false; // Variável para controlar o estado da cor

function atualizar_imagem() {
    // Aplica rotação, escala e filtro de cor em simultâneo
    let filtro = inverterCor ? 'hue-rotate(90deg) invert(1)' : 'none';
    imagem.style.transform = `rotate(${angulo}deg) scale(${tamanho})`;
    imagem.style.filter = filtro;
}

// 1. Botão Rodar
rodar.addEventListener('click', () => {
    angulo += 90;
    atualizar_imagem();
});

// 2. Botão Crescer
crescer.addEventListener('click', () => {
    tamanho += 0.2; // Aumenta 20% do tamanho atual
    atualizar_imagem();
});

// 3. Botão Encolher
encolher.addEventListener('click', () => {
    if (tamanho > 0.2) { // Evita que a imagem fique com tamanho negativo
        tamanho -= 0.2; 
    }
    atualizar_imagem();
});

// 4. Botão Muda de Cor (Alterna um filtro CSS na imagem)
mudarCor.addEventListener('click', () => {
    inverterCor = !inverterCor; // Alterna entre true e false
    atualizar_imagem();
});

// 5. Botão Reiniciar (Restaura os valores originais)
reiniciar.addEventListener('click', () => {
    angulo = 0;
    tamanho = 1;
    inverterCor = false;
    atualizar_imagem();
});

