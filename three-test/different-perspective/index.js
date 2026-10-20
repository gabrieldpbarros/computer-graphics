import * as THREE from 'three';
const canvas = document.querySelector('canvas.webgl');

const FOV = 75;
const ASPECT = 2;
const NEAR = 0.1;
const FAR = 5;
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);

const scene = new THREE.Scene();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
