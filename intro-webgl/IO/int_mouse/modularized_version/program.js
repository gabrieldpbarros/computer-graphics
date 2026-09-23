function createGLProgram(gl, vertexShader, fragmentShader) {
    // --------------------------------------------------
    // 6. CRIAR PROGRAMA
    // --------------------------------------------------
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(
            gl.getProgramInfoLog(program)
        );

    return program;
}