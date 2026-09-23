function drawScene(gl, program) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.drawArrays(
            gl.POINTS,
            0,
            drawnPoints
        );
    }

function clearScreen(gl) {
    // --------------------------------------------------
    // 10. LIMPAR TELA
    // --------------------------------------------------
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function drawScreen(gl, program, vertices) {
    // --------------------------------------------------
    // 11. DESENHAR
    // --------------------------------------------------
    gl.useProgram(program);
    drawScene(gl, program);
}