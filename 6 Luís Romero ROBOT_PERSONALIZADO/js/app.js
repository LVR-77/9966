import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// ==========================================
// 1. CONFIGURAÇÃO DA CENA E CÂMARA
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const robo = new THREE.Group();
scene.add(robo);

function mesh(geometria, cor) {
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color: cor }));
}

// ==========================================
// 2. CRIAÇÃO DAS TEXTURAS
// ==========================================
function criarTexturaCorpo() {
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const numListras = 6;
  const largura = canvas.width / numListras;
  for (let i = 0; i < numListras; i++) {
    ctx.fillStyle = (i % 2 === 0) ? '#1e3a8a' : '#ffffff';
    ctx.fillRect(i * largura, 0, largura, canvas.height);
  }
  return new THREE.CanvasTexture(canvas);
}

function criarTexturaBraco() {
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1000f5';
  ctx.fillRect(0, 0, canvas.width, canvas.height / 4);
  ctx.fillStyle = '#ffd900';
  ctx.fillRect(0, canvas.height / 4, canvas.width, (canvas.height * 3) / 4);
  return new THREE.CanvasTexture(canvas);
}

function criarTexturaPerna() {
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, canvas.width, canvas.height / 3);
  ctx.fillStyle = '#ffd900';
  ctx.fillRect(0, canvas.height / 3, canvas.width, (canvas.height * 2) / 3);
  return new THREE.CanvasTexture(canvas);
}

// ==========================================
// 3. CONSTRUÇÃO DAS PEÇAS DO ROBÔ
// ==========================================

// CORPO
const materialCorpo = new THREE.MeshBasicMaterial({ map: criarTexturaCorpo() });
const corpo = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2, 0.9), materialCorpo);
robo.add(corpo);

// CABEÇA (Esfera de raio 1)
const cabeca = mesh(new THREE.SphereGeometry(1, 32, 16), '#ffd900');
cabeca.position.y = 1.65;
robo.add(cabeca);

// OLHOS (Ajustados à superfície da esfera Z = 0.92)
const olhoE = mesh(new THREE.SphereGeometry(0.13, 16, 8), 0xf80101);
olhoE.position.set(-0.35, 1.75, 0.92);
const olhoD = olhoE.clone();
olhoD.position.x = 0.35;
robo.add(olhoE, olhoD);

// BOCA (Ajustada à superfície da esfera Z = 0.95)
const boca = mesh(new THREE.BoxGeometry(0.5, 0.1, 0.1), 0x111111);
boca.position.set(0, 1.35, 0.95);
robo.add(boca);

// ANTENA
const haste = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 12), 0xe2e8f0);
haste.position.y = 2.9;
const ponta = mesh(new THREE.SphereGeometry(0.14, 16, 8), 0xef4444);
ponta.position.y = 3.3;
robo.add(haste, ponta);

// BRAÇOS (Com pivot no ombro)
const geoBraco = new THREE.BoxGeometry(0.55, 2, 0.7);
geoBraco.translate(0, -1, 0); // Desloca a origem para o ombro (topo)
const matBraco = new THREE.MeshBasicMaterial({ map: criarTexturaBraco() });

const bracoE = new THREE.Mesh(geoBraco, matBraco);
bracoE.position.set(-1.4, 0.95, 0);

const bracoD = new THREE.Mesh(geoBraco, matBraco);
bracoD.position.set(1.4, 0.95, 0);

robo.add(bracoE, bracoD);

// PERNAS (Com pivot na anca)
const geoPerna = new THREE.BoxGeometry(0.7, 2.8, 0.75);
geoPerna.translate(0, -1.4, 0); // Desloca a origem para a anca (topo)
const matPerna = new THREE.MeshBasicMaterial({ map: criarTexturaPerna() });

const pernaE = new THREE.Mesh(geoPerna, matPerna);
pernaE.position.set(-0.55, -1.0, 0);

const pernaD = new THREE.Mesh(geoPerna, matPerna);
pernaD.position.set(0.55, -1.0, 0);

robo.add(pernaE, pernaD);


// ==========================================
// 4. ANIMAÇÃO E MOVIMENTOS DESCOORDENADOS
// ==========================================
let velocidade = 1;
let pausado = false;
let acenar = false;
let tempo = 0;

// --- LINHAS NOVAS DE ÁUDIO ---
const somAcenar = new Audio("benny_hill.mp3");
somAcenar.loop = true; // Mantém o som a tocar enquanto o braço estiver a acenar

function animar() {
  requestAnimationFrame(animar);

  if (!pausado) {
    robo.rotation.y += 0.035 * velocidade;
    tempo += 0.05 * velocidade;

    // Movimento descoordenado do Braço Esquerdo
    bracoE.rotation.z = Math.sin(tempo * 2.1) * 0.5 + Math.cos(tempo * 1.3) * 0.2;
    bracoE.rotation.x = Math.cos(tempo * 2.8) * 0.4;

    // Braço Direito (Acenar se o botão estiver ativo, senão move descoordenado)
    if (acenar) {
      bracoD.rotation.z = 2.4 + Math.sin(tempo * 3) * 0.3;
      bracoD.rotation.x = 0;
    } else {
      bracoD.rotation.z = -Math.sin(tempo * 1.8) * 0.6;
      bracoD.rotation.x = Math.sin(tempo * 2.5) * 0.4;
    }

    // Movimento descoordenado das Pernas
    pernaE.rotation.x = Math.sin(tempo * 3.1) * 0.5;
    pernaD.rotation.x = Math.cos(tempo * 2.3) * 0.6;
  }

  renderer.render(scene, camera);
}

animar();

// ==========================================
// 5. EVENTOS DOS BOTÕES
// ==========================================
document.querySelector("#pausa").onclick = function() {
  pausado = !pausado;
  this.textContent = pausado ? "Continuar" : "Pausar";
};

document.querySelector("#lento").onclick = () => velocidade = 0.4;
document.querySelector("#normal").onclick = () => velocidade = 1;
document.querySelector("#rapido").onclick = () => velocidade = 2.5;

// --- BOTÃO ACENAR ATUALIZADO COM SOM ---
document.querySelector("#acenar").onclick = function() {
  acenar = !acenar;
  this.textContent = acenar ? "Parar braço" : "Acenar";

  if (acenar) {
    somAcenar.play(); // Inicia a música ao acenar
  } else {
    bracoD.rotation.set(0, 0, 0);
    somAcenar.pause(); // Para a música
    somAcenar.currentTime = 0; // Volta ao início
  }
};

// --- BOTÃO RESET ATUALIZADO ---
document.querySelector("#reset").onclick = () => {
  velocidade = 1;
  pausado = false;
  acenar = false;
  tempo = 0;

  // Parar o áudio no reset
  somAcenar.pause();
  somAcenar.currentTime = 0;

  robo.rotation.set(0, 0, 0);
  bracoE.rotation.set(0, 0, 0);
  bracoD.rotation.set(0, 0, 0);
  pernaE.rotation.set(0, 0, 0);
  pernaD.rotation.set(0, 0, 0);

  document.querySelector("#pausa").textContent = "Pausar";
  document.querySelector("#acenar").textContent = "Acenar";
};

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});