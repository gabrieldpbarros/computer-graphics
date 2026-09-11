// Offsets dentro do buffer único (6 vértices por forma)
const OFFSET_BOLA = 0;
const OFFSET_BARRA_E = 6;
const OFFSET_BARRA_D = 12;
const VERTICES_POR_FORMA = 6;

function drawShape(
    gl, 
    colorLocation, 
    transformLocation, 
    transform, 
    color, 
    offset
) {
    gl.uniform3fv(colorLocation, color);
    gl.uniformMatrix3fv(transformLocation, false, transform);
    gl.drawArrays(gl.TRIANGLES, offset, VERTICES_POR_FORMA);
}

function drawScene(gl, program, uniforms, transforms) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    const white = new Float32Array([1.0, 1.0, 1.0]);

    drawShape(
        gl, 
        uniforms.colorLocation, 
        uniforms.transformLocation,
        transforms.bolaTransform,
        white, 
        OFFSET_BOLA
    );

    drawShape(
        gl, 
        uniforms.colorLocation, 
        uniforms.transformLocation,
        transforms.barraETransform,
        white, 
        OFFSET_BARRA_E
    );

    drawShape(
        gl, 
        uniforms.colorLocation, 
        uniforms.transformLocation,
        transforms.barraDTransform, 
        white, 
        OFFSET_BARRA_D
    );
}