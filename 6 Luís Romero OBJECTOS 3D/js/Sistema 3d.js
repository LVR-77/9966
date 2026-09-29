import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// 1. Criar Scene (O nosso palco)

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101827);

// Luz Ambiente 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Luz do Sol (Projeta as sombras)
const sol = new THREE.DirectionalLight(0xffffff, 1.0);
sol.position.set(5, 8, 4);
sol.castShadow = true;
sol.shadow.mapSize.width = 1024;
sol.shadow.mapSize.height = 1024;
sol.shadow.camera.near = 0.5;
sol.shadow.camera.far = 25;
scene.add(sol);

// ==========================================
// 2. Criar Camera (Os nossos olhos)
// ==========================================
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
// Elevamos a câmara para ver o chão e os objetos de cima/lado
camera.position.set(0, 4, 8); 
camera.lookAt(0, 0, 0);

// ==========================================
// 3. Criar Renderer (O motor que desenha no ecrã)
// ==========================================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// ==========================================
// 4. Criar o Chão (Onde se projetam as sombras)
// ==========================================
const geometriaChao = new THREE.PlaneGeometry(16, 16);
const materialChao = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
const chao = new THREE.Mesh(geometriaChao, materialChao);

chao.rotation.x = -Math.PI / 2; // Rodar de vertical para horizontal
chao.position.y = -1;            // Posicionar abaixo dos objetos
chao.receiveShadow = true;       // PERMITIR RECEBER SOMBRAS
scene.add(chao);

// ==========================================
// 5. Criar e Adicionar os Objetos 3D
// ==========================================
// Cubo
const geometriaCubo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const materialCubo = new THREE.MeshStandardMaterial({ color: 0xf17500, roughness: 0.5, metalness: 0.5 });
const cubo = new THREE.Mesh(geometriaCubo, materialCubo);
cubo.position.x = -3;
cubo.castShadow = true; // GERAR SOMBRA
scene.add(cubo);

// Esfera
const esfera = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 16), 
    new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.5, metalness: 0.5 })
);
esfera.position.x = 0;
esfera.castShadow = true; // GERAR SOMBRA
scene.add(esfera);

// Cone
const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32), 
    new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.5, metalness: 0.5 })
);
cone.position.x = 3;
cone.castShadow = true; // GERAR SOMBRA
scene.add(cone);

// ==========================================
// 6. Criar função animar()
// ==========================================
let velocidade = 1;
let pausado = false;
let tempo = 0;

function animate() {
    requestAnimationFrame(animate);

    if (!pausado) {
        tempo += 0.02 * velocidade;

        // Rotação dos objetos
        cubo.rotation.x += 0.01 * velocidade;
        cubo.rotation.y += 0.014 * velocidade;

        esfera.rotation.x += 0.01 * velocidade;
        esfera.rotation.y += 0.014 * velocidade;

        cone.rotation.x += 0.01 * velocidade; 
        cone.rotation.y += 0.014 * velocidade; 

        // Movimento vertical (flutuar) para ver as sombras a moverem-se no chão
        cubo.position.y = Math.sin(tempo) * 0.4;
        esfera.position.y = Math.sin(tempo + 1) * 0.4;
        cone.position.y = Math.sin(tempo + 2) * 0.4;
    }   

    renderer.render(scene, camera);
}
animate();

// ==========================================
// 7. Implementar os botões do HTML
// ==========================================
const btnPausa = document.getElementById("pausa");
const btnLento = document.getElementById("lento");
const btnNormal = document.getElementById("normal");
const btnRapido = document.getElementById("rapido");
const btnReset = document.getElementById("reset");

btnPausa.addEventListener("click", () => {
    pausado = !pausado;
    btnPausa.textContent = pausado ? "Continuar" : "Pausar";
});

btnLento.addEventListener("click", () => {
    velocidade = 0.3;
});

btnNormal.addEventListener("click", () => {
    velocidade = 1;
});

btnRapido.addEventListener("click", () => {
    velocidade = 2.5;
});

btnReset.addEventListener("click", () => {
    velocidade = 1;
    pausado = false;
    tempo = 0;
    btnPausa.textContent = "Pausar";

    // Repor rotações
    cubo.rotation.set(0, 0, 0);
    esfera.rotation.set(0, 0, 0);
    cone.rotation.set(0, 0, 0);

    // Repor posições
    cubo.position.set(-3, 0, 0);
    esfera.position.set(0, 0, 0);
    cone.position.set(3, 0, 0);
});

// Ajustar o ecrã se a janela mudar de tamanho
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


