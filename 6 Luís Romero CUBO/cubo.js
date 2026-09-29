const cubo = document.querySelector('#cubo');
const btnPausa = document.querySelector('#pausa');
const btnMais = document.querySelector('#mais');
const btnMenos = document.querySelector('#menos');
const btnReset = document.querySelector('#reset');
const btnRapido = document.querySelector('#rapido');
const btnLento = document.querySelector('#lento');

let parado = false;
let escala = 1;
let duracao = 8; // Duração inicial em segundos (8s)

// 1. Botão Pausar / Continuar
btnPausa.addEventListener('click', function () {
    parado = !parado;
    cubo.style.animationPlayState = parado ? 'paused' : 'running';
    btnPausa.textContent = parado ? 'Continuar' : 'Pausar';
});

// 2. Botão Aumentar
btnMais.addEventListener('click', function () {
    if (escala < 2.0) { // Limite máximo de 200%
        escala += 0.2;
        cubo.style.setProperty('--escala', escala);
    }
});

// 3. Botão Diminuir
btnMenos.addEventListener('click', function () {
    if (escala > 0.4) { // Limite mínimo de 40%
        escala -= 0.2;
        cubo.style.setProperty('--escala', escala);
    }
});

// 4. Botão Resetar
btnReset.addEventListener('click', function () {
    // ... código de escala e pausa que já tens ...

    // Repõe a velocidade original
    duracao = 8;
    cubo.style.animationDuration = '8s';
});
    
    // Repõe a animação em execução
    parado = false;
    cubo.style.animationPlayState = 'running';
    btnPausa.textContent = 'Pausar';


// 5. Botão Mais Rápido (diminui o tempo de rotação)
btnRapido.addEventListener('click', function () {
    if (duracao > 1) { // Limite mínimo: 1 segundo por volta (muito rápido)
        duracao -= 1;
        cubo.style.animationDuration = duracao + 's';
    }
});

// 6. Botão Mais Lento (aumenta o tempo de rotação)
btnLento.addEventListener('click', function () {
    if (duracao < 20) { // Limite máximo: 20 segundos por volta (muito lento)
        duracao += 1;
        cubo.style.animationDuration = duracao + 's';
    }
});

// 8. Botão Resetar (com reinício forçado da animação)
btnReset.addEventListener('click', function () {
    // Repõe as variáveis de estado
    escala = 1;
    duracao = 8;
    parado = false;

    // Repõe o texto do botão de pausa
    btnPausa.textContent = 'PAUSAR';

    // Repõe as propriedades CSS
    cubo.style.setProperty('--escala', escala);
    cubo.style.animationPlayState = 'running';

    // Força o navegador a reiniciar a rotação do ponto zero
    cubo.style.animation = 'none';
    cubo.offsetHeight; // Força o reflow do browser
    cubo.style.animation = `rodarCubo ${duracao}s infinite linear`;
});