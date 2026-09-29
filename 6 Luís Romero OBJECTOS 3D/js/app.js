import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// 1. Criar Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101827);
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

//Sol
const sol = new THREE.DirectionalLight(0xffffff, 1.8);
sol.position.set(5, 8, 4);
sol.castShadow = true;
sol.shadow.mapSize.width = 1024;
sol.shadow.mapSize.height = 1024;
sol.shadow.camera.near = 0.5;
sol.shadow.camera.far = 25;
scene.add(sol);

// 2. Criar Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 7);

// 2.1 Criar o chão
const chaoGeo = new THREE.PlaneGeometry(15, 15);
const chaoMat = new THREE.MeshStandardMaterial({ color: 0x101827, roughness: 0.8});
const chao = new THREE.Mesh(chaoGeo, chaoMat);
chao.position.y = -4;
chao.rotation.x = -Math.PI / 2;
chao.receiveShadow = true;
scene.add(chao);


// 3. Criar Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// 4. Criar um cubo
const cubo = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.1, roughness: 0.5 })
);

// 5. Adicionar o cubo à Scene
cubo.position.set(-3, 0, 0);
cubo.castShadow = true;
cubo.receiveShadow = true;
scene.add(cubo);

// 5.1. Adicionar esfera e cone
const esfera = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0x38fff8, metalness: 0.5, roughness: 0.5 })
);
esfera.position.set(0, 0, 0);
esfera.castShadow = true;
esfera.receiveShadow = true;
scene.add(esfera);

const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 1, 32),
    new THREE.MeshStandardMaterial({ color: 0x38bdff, metalness: 0.5, roughness: 0.5 })
);
cone.position.set(3, 0, 0);
cone.castShadow = true;
cone.receiveShadow = true;
scene.add(cone);

// 5.2. Adicionar chão


// 6. Criar função animar()
let velocidade = 1;
let pausado = false;

function animar() {
    requestAnimationFrame(animar);
    if (!pausado) {
        cubo.rotation.x += 0.01*velocidade;
        cubo.rotation.y += 0.014*velocidade;

        esfera.rotation.y += 0.014*velocidade;

        cone.rotation.x += 0.012*velocidade;
        cone.rotation.y += 0.018*velocidade;
    }
    renderer.render(scene, camera);
}
animar();

// 8. Implementar os botões
document.querySelector("#pausa").addEventListener("click", () => {
    pausado = !pausado;
    this.textContent = pausado ? "Continuar" : "Pausar";
});

document.querySelector("#lento").addEventListener("click", () => {
    velocidade = 0.4;
});

document.querySelector("#normal").addEventListener("click", () => {
    velocidade = 1;
});

document.querySelector("#rapido").addEventListener("click", () => {
    velocidade = 4;
});

document.querySelector("#reset").addEventListener("click", () => {
    pausado = false;
    velocidade = 1;
    cubo.rotation.set(0, 0, 0);
    esfera.rotation.set(0, 0, 0);
    cone.rotation.set(0, 0, 0);
});