import * as THREE from 'three';
const canvas = document.querySelector('canvas.webgl');

const FOV = 75;
const NEAR = 0.1;
const FAR = 60;
const camera = new THREE.PerspectiveCamera(FOV, 1, NEAR, FAR);
camera.position.y = 4;
camera.position.z = 15;
camera.rotation.x = -0.1;

const lightColor = 0xFFFFFF;
const intensity = 4;
const light = new THREE.DirectionalLight(lightColor, intensity);
light.position.set(camera.position.x, camera.position.y, camera.position.z);

const groundGeometry = new THREE.BoxGeometry(50, 1, 50);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x517d51 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);

const sphereGeometry = new THREE.SphereGeometry(1.5);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xf5a627 });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.y = 1.9;
sphereMesh.position.z = 10;
sphereMesh.position.x = 1.5;

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 4);
const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0xcf65f0 });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.y = 2;
cylinderMesh.position.z = 5;
cylinderMesh.position.x = -5.5;

const sphereMesh2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh2.position.y = 1.9;
sphereMesh2.position.z = -10;
sphereMesh2.position.x = 1.5;

const scene = new THREE.Scene();
scene.add(camera);
scene.add(light);
scene.add(groundMesh);
scene.add(sphereMesh);
scene.add(cylinderMesh);
scene.add(sphereMesh2);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}

window.addEventListener('resize', resize);
resize();
