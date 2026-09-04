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
    canvas.addEventListener("mousedown", mouseClick, false);
        
    function mouseClick(event){
        // Registra clique
        clickCounter++;
        // Adiciona um elemento ao contador de itens a desenhar
        drawnPoints++;
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

        // Adiciona ao vetor de vértices e implementa o algoritmo de Bresenham
        if (mode == "reta") {
            if (clickCounter > 2) {
                drawnPoints = 1;
                clickCounter = 1;
                vertices.fill(0.0);
            }
            vertices.set([webglX, webglY], 2 * clickCounter - 2);
            if (clickCounter == 2) fillBresenhamReta(vertices, canvas);
        } else if (mode == "triangulo") {
            if (clickCounter > 3) {
                drawnPoints = 1;
                clickCounter = 1;
                vertices.fill(0.0);
            }
            vertices.set([webglX, webglY], 2 * clickCounter - 2);
            if (clickCounter == 3) fillBresenhamTriangulo(vertices, canvas);
        } else console.log("ERRO NO MODO DE TRAÇAGEM");

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
        drawScene(gl, program);
    }
}