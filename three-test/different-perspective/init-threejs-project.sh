#!/bin/sh
set -e # caso algo falhe

npm init -y
cat > index.js <<'EOF'
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
EOF

cat > index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js Document</title>
</head>
<body>
    <canvas class="webgl"></canvas>
</body>
<script type="module" src="./index.js"></script>
</html>
EOF
# three.js
npm install --save three

# vite e eslint
npm install --save-dev vite eslint @eslint/js globals
cat > eslint.config.mjs <<'EOF'
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
    {
        files: ["**/*.js", "**/*.mjs"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    }
]);
EOF

# scripts
npm pkg set \
    'scripts.dev=vite' \
    'scripts.build=vite build' \
    'scripts.preview=vite preview' \
    'scripts.lint=eslint .'

echo "Projeto inicializado com sucesso!"
