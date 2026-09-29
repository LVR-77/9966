const cidade=document.querySelector("#cidade");
let rotacaoX=-25;
let rotacaoY=25;
let zoom=1;
let auto=false;
let timer;

// Criar atualizarCidade()
function atualizarCidade(){
    cidade.style.transform=`rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) scale(${zoom})`;
}

// Programar os botões
document.querySelector("#esq").addEventListener("click",()=>{
    rotacaoX-=10;
    atualizarCidade();
});

document.querySelector("#dir").addEventListener("click",()=>{
    rotacaoX+=10;
    atualizarCidade();
});

document.querySelector("#cima").addEventListener("click",()=>{
    rotacaoY-=5;
    atualizarCidade();
});

document.querySelector("#baixo").addEventListener("click",()=>{
    rotacaoY+=5;
    atualizarCidade();
});

document.querySelector("#mais").addEventListener("click",()=>{
    zoom+=0.1;
    atualizarCidade();
});

document.querySelector("#menos").addEventListener("click",()=>{
    zoom-=0.1;
    atualizarCidade();
});

document.querySelector("#auto").addEventListener("click",()=>{
    zoom=1;
    atualizarCidade();
});

document.querySelector("#reset").addEventListener("click",()=>{
    rotacaoX=-25;
    rotacaoY=25;
    zoom=1;
    auto=false;
    clearInterval(timer);
    document.querySelector("#auto").textContent="Auto";
    atualizarCidade();
}); 

// Extra: modo automático
const botaoAuto = document.querySelector("#auto");

botaoAuto.addEventListener("click",()=>{
    auto=!auto;
    botaoAuto.textContent=auto?"Parar":"Auto";

    if(auto){
        timer=setInterval(()=>{
            rotacaoX+=1;
            rotacaoY+=1;
            atualizarCidade();
        },100);
    } else {
        clearInterval(timer);
        
    }
});

