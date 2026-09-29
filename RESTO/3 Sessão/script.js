alert("Bem vindo ao Laboratório de Multimédia")
//Cria um avariável que seleciona o elemento com o id "título"
const titulo=document.querySelector("#titulo");
// Altera a cor do título, o tamanho da fonte, a sombra do texto e o conteúdo do título
titulo.style.color="rgb(5, 99, 223)";
//Altera o tamanho da fonte do título para 50 pixels
titulo.style.fontSize="50px";
//Altera o texto do título para "Laboratório de Multimédia - exercício 3"
titulo.style.textShadow="0px 0px 10px rgb(5, 99, 223)";
tiyulo.innerHTML="Laboratório de Multimédia - exercício 3";

//Cria uma variável que seleciona o elemento com o id "imagem"
const imagem=document.querySelector("#img");

function rodar(){   
    //Gira a imagem 90 graus
    img.style.transform="rotate(360deg)";
}

function crescer(){
    //Aumenta o tamanho da imagem
    img.style.transform="scale(1.1)";
}

function encolher(){
    //Diminui o tamanho da imagem
    img.style.transform="scale(0.9)";
}

function mudarCor(){
    //Altera a cor da imagem
    img.style.filter="invert(100%)";
}

function reiniciar(){
    //Reseta a imagem
    img.style.transform="rotate(0deg)";
    img.style.filter="none";
    img.style.transform="scale(1)";
}