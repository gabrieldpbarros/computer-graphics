import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

console.log(THREE);
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: 800,
    height: 600
}
// Camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 0.6;
camera.position.y = 2;
camera.rotation.y = 0.5;
camera.rotation.x = -0.7;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

let time = Date.now();
let slowDown = 0;
let switchCase = 0;
let speedUp = 200;
const tick = () => {
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;
    
    if (switchCase) {
        mesh.rotation.y += 0.01 * deltaTime * 0.1;
        speedUp += 1;
        slowDown -= 1;
        if (speedUp == 200 && slowDown == 0) switchCase = 0;
    }
    else {
        mesh.rotation.y += 0.01 * deltaTime * 0.8;
        slowDown += 1;
        speedUp -= 1;
        if (speedUp == 0 && slowDown == 200) switchCase = 1;
    }
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();