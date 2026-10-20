#!/bin/sh
npm init -y
cat > index.js <<'EOF'
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

echo "Projeto inicializado com sucesso!"
