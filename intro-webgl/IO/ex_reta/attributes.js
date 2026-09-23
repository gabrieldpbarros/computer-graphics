function configAttributes(
    gl, 
    program, 
    verticesBuffer,
    colorsBuffer,
    pointSizesBuffer
) {
    // --------------------------------------------------
    // 7. LOCAL DOS ATRIBUTOS
    // --------------------------------------------------
    const positionLocation =
        gl.getAttribLocation(
            program,
            "aPosition"
        );

    const colorLocation =
        gl.getAttribLocation(
            program,
            "aColor"
        );

    const pointSizeLocation =
        gl.getAttribLocation(
            program,
            "aPointSize"
        );
    // --------------------------------------------------
    // 8. CONFIGURAR ATRIBUTOS
    // --------------------------------------------------
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(
        positionLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(
        colorLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, pointSizesBuffer);
    gl.enableVertexAttribArray(pointSizeLocation);
    gl.vertexAttribPointer(
        pointSizeLocation,
        1,
        gl.FLOAT,
        false,
        0,
        0
    );
}