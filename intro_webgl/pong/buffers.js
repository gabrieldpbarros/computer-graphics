function createBuffers(gl, vertices, colors) {
    // --------------------------------------------------
    // 2. BUFFERS
    // --------------------------------------------------
    const verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        vertices,
        gl.STATIC_DRAW
    );

    return { verticesBuffer };
}