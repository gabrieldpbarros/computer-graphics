function addMouseListener(canvas, gl, program, vertices, verticesBuffer) {
    const canvasCoordinates =
        document.getElementById(
            "canvasCoordinates"
        );

    const webglCoordinates =
        document.getElementById(
            "webglCoordinates"
        );
    // --------------------------------------------------
    // 9. INTERAÇÃO COM O MOUSE
    // --------------------------------------------------
    canvas.addEventListener("mousedown",mouseClick,false);
        
    function mouseClick(event){
        // Posição do clique em pixels
        const x = event.offsetX;
        const y = event.offsetY;
        canvasCoordinates.textContent =
            `Canvas: (${x}, ${y})`;
        // Converter X para o intervalo [-1, 1]
        const webglX =
            (x / canvas.width) * 2 - 1;
        // Converter Y para o intervalo [-1, 1]
        // O sinal é invertido porque o eixo Y do canvas
        // cresce para baixo e o do WebGL cresce para cima
        const webglY =
            -((y / canvas.height) * 2 - 1);
        webglCoordinates.textContent =
            `WebGL: (${webglX.toFixed(3)}, ${webglY.toFixed(3)})`;

        // Atualizar o vetor de vértices
        vertices = new Float32Array([
            webglX,
            webglY
        ]);

        // Atualizar o conteúdo do buffer na GPU
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            verticesBuffer
        );
        gl.bufferData(
            gl.ARRAY_BUFFER,
            vertices,
            gl.STATIC_DRAW
        );

        // Redesenhar a cena
        drawScene(gl, program, vertices);
    }
}