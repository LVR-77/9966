import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// ==========================================
// 1. CONFIGURAÇÃO DA CENA E CÂMARA
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05050a); // Fundo escuro de estúdio / palco

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 3, 9);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);

// ATIVAÇÃO DE SOMBRAS (Secção 4 da ficha)
renderer.shadowMap.enabled = true; // Ativa o motor de sombras
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Sombras mais suaves
document.body.appendChild(renderer.domElement);

// ==========================================
// 2. ILUMINAÇÃO (LABORATÓRIO DAS LUZES)
// ==========================================

// Luz Ambiente (fraca para manter o contraste dramático)
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(luzAmbiente);

// Luz Direcional (tom quente alaranjado, posicionada na diagonal)
const luz = new THREE.DirectionalLight(0xffaa55, 3.5);
luz.position.set(-6, 8, 3); // Luz vinda de cima e da esquerda
luz.castShadow = true; // A luz direcional projeta sombras

// Configuração da resolução da sombra da luz
luz.shadow.mapSize.width = 1024;
luz.shadow.mapSize.height = 1024;
scene.add(luz);

// ==========================================
// 3. MATERIAIS E OBJETOS (LABORATÓRIO DOS MATERIAIS)
// ==========================================

// CHÃO (Recebe as sombras dos objetos)
const matChao = new THREE.MeshStandardMaterial({ 
  color: 0x1e293b, 
  roughness: 0.8 
});
const chao = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), matChao);
chao.rotation.x = -Math.PI / 2; // Deitar o plano
chao.position.y = -1;
chao.receiveShadow = true; // Permite ao chão desenhar sombras
scene.add(chao);

// 1. CUBO (Objeto muito metálico e refletor)
const matCubo = new THREE.MeshStandardMaterial({ 
  color: 0xef4444,  // Vermelho
  metalness: 0.95,  // Alto acabamento metálico
  roughness: 0.1   // Baixa rugosidade (muito brilhante)
});
const cubo = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), matCubo);
cubo.position.set(-2.5, 0, 0);
cubo.castShadow = true;    // Projeta sombra no chão
cubo.receiveShadow = true;
scene.add(cubo);

// 2. ESFERA (Objeto totalmente mate / fosco)
const matEsfera = new THREE.MeshStandardMaterial({ 
  color: 0x3b82f6,  // Azul
  metalness: 0.0,   // Nulo (não metálico)
  roughness: 1.0   // Máxima rugosidade (totalmente fosco/mate)
});
const esfera = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), matEsfera);
esfera.position.set(0, 0, 0);
esfera.castShadow = true;
esfera.receiveShadow = true;
scene.add(esfera);

// 3. TORO / ROSQUILHA (Acabamento intermédio)
const matToro = new THREE.MeshStandardMaterial({ 
  color: 0xeab308,  // Dourado
  metalness: 0.5, 
  roughness: 0.3 
});
const toro = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.3, 16, 100), matToro);
toro.position.set(2.5, 0, 0);
toro.castShadow = true;
toro.receiveShadow = true;
scene.add(toro);

// ==========================================
// 4. CICLO DE ANIMAÇÃO
// ==========================================
function animar() {
  requestAnimationFrame(animar);

  // Rotação suave para observar a reflexão da luz nos materiais
  cubo.rotation.x += 0.005;
  cubo.rotation.y += 0.008;

  toro.rotation.x += 0.01;
  toro.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animar();

// ==========================================
// 5. REDIMENSIONAMENTO DA JANELA
// ==========================================
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});