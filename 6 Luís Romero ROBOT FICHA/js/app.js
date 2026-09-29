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
// 2. MONTAGEM DO ROBÔ (ALTERAÇÕES DA FICHA)
// ==========================================

// 1. Corpo em vermelho (0xef4444)
const corpo = mesh(new THREE.BoxGeometry(1.6, 2, 0.9), 0xef4444);
robo.add(corpo);

// 2. Cabeça verde (0x22c55e) | 3. Cabeça mais larga (2.2) | Correção Sabotagem 1 (y = 1.65)
const cabeca = mesh(new THREE.BoxGeometry(2.2, 1.05, 1), 0x22c55e);
cabeca.position.y = 1.65;
robo.add(cabeca);

// 5. Braços afastados do corpo (X = -1.6 e 1.6)
const bracoE = mesh(new THREE.BoxGeometry(0.35, 1.8, 0.4), 0xf472b6);
bracoE.position.set(-1.6, 0.05, 0);

const bracoD = bracoE.clone();
bracoD.position.x = 1.6;
robo.add(bracoE, bracoD);

// 4. Pernas mais compridas (altura 2.4 e Y = -2.15)
const pernaE = mesh(new THREE.BoxGeometry(0.5, 2.4, 0.55), 0x4ade80);
pernaE.position.set(-0.48, -2.15, 0);

const pernaD = pernaE.clone();
pernaD.position.x = 0.48;
robo.add(pernaE, pernaD);

// 6. Olhos maiores (raio 0.22) | 7. Olhos afastados (X = -0.5) | Correção Sabotagem 2
const olhoE = mesh(new THREE.SphereGeometry(0.22, 16, 8), 0x111111);
olhoE.position.set(-0.5, 1.75, 0.51);

const olhoD = olhoE.clone();
olhoD.position.x = 0.5;
robo.add(olhoE, olhoD);

// PONTO 6 DA FICHA: Primeira peça criada de raiz (Boca)
const boca = mesh(new THREE.BoxGeometry(0.5, 0.1, 0.1), 0x111111);
boca.position.set(0, 1.35, 0.51);
robo.add(boca);

// 8. Antena mais alta (altura 1.5)
const haste = mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.5, 12), 0xe2e8f0);
haste.position.y = 2.95;

const ponta = mesh(new THREE.SphereGeometry(0.14, 16, 8), 0xef4444);
ponta.position.y = 3.7;
robo.add(haste, ponta);

// ==========================================
// 3. ANIMAÇÃO E EVENTOS
// ==========================================
let velocidade = 1;
let pausado = false;
let acenar = false;
let tempo = 0;

function animar() {
  requestAnimationFrame(animar);

  if (!pausado) {
    // 9. Rotação aumentada para 0.035 | Correção Sabotagem 3
    robo.rotation.y += 0.035 * velocidade;
    tempo += 0.05 * velocidade;

    // 10. Amplitude de aceno aumentada para 1.8
    if (acenar) {
      bracoD.rotation.z = Math.sin(tempo) * 1.8;
    }
  }

  renderer.render(scene, camera);
}
animar();

// CONTROLO DOS BOTÕES
document.querySelector("#pausa").onclick = function() {
  pausado = !pausado;
  this.textContent = pausado ? "Continuar" : "Pausar";
};

document.querySelector("#lento").onclick = () => velocidade = 0.4;
document.querySelector("#normal").onclick = () => velocidade = 1;
document.querySelector("#rapido").onclick = () => velocidade = 2.5;

document.querySelector("#acenar").onclick = function() {
  acenar = !acenar;
  this.textContent = acenar ? "Parar braço" : "Acenar";
  if (!acenar) bracoD.rotation.z = 0;
};

document.querySelector("#reset").onclick = () => {
  velocidade = 1;
  pausado = false;
  acenar = false;
  tempo = 0;
  robo.rotation.set(0, 0, 0);
  bracoD.rotation.set(0, 0, 0);
  document.querySelector("#pausa").textContent = "Pausar";
  document.querySelector("#acenar").textContent = "Acenar";
};

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});