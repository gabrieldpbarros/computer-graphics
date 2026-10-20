#!/bin/sh
npm init -y
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
