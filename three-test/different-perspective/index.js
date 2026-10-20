import * as THREE from 'three';
const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();
const sizes = {
    width: 800,
    height: 600,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
