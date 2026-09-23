function setupAttributesAndUniform(gl, program, verticesBuffer) {
    // --------------------------------------------------
    // 7. LOCAL DOS ATRIBUTOS E DO UNIFORM
    // --------------------------------------------------
    const positionLocation = 
    gl.getAttribLocation(
        program, "aPosition"
    );
    const colorLocation = 
    gl.getUniformLocation(
        program, 
        "u_color"
    );
    
    const transformLocation = 
    gl.getUniformLocation(
        program, 
        "u_transform"
    );
    
    // --------------------------------------------------
    // 8. CONFIGURAR ATRIBUTOS E UNIFORM
    // --------------------------------------------------   
    gl.useProgram(program);
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

    return { positionLocation, colorLocation, transformLocation };
}