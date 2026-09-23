function createBuffers(gl, vertices, colors, pointSizes) {
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

    const colorsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        colors,
        gl.STATIC_DRAW
    );

    const pointSizesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointSizesBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        pointSizes,
        gl.STATIC_DRAW
    );

    return { verticesBuffer, colorsBuffer, pointSizesBuffer };
}