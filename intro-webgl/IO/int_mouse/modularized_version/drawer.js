function drawScene(gl, program, vertices) {
    const numComponents = 2;
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.drawArrays(
            gl.POINTS,
            0,
            vertices.length / numComponents
        );
    }

function drawScreen(gl, program, vertices) {
    // --------------------------------------------------
    // 10. LIMPAR TELA
    // --------------------------------------------------
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // --------------------------------------------------
    // 11. DESENHAR
    // --------------------------------------------------
    gl.useProgram(program);
    drawScene(gl, program, vertices);
}