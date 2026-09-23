const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");
const MAX_PONTOS = canvas.width * canvas.height;

// -----------------------------------------------------------------------------
// Constantes de transformação
let xOffBola = 0.01, yOffBola = 0.01;
let yOffBarraE = 0.015;
let yOffBarraD = 0.015;

let txBola = 0.0, tyBola = 0.0;
let tyBarraE = 0.0;
let tyBarraD = 0.0;
// -----------------------------------------------------------------------------

let { vertices, colors } = getDrawingAssets();
let { verticesBuffer } = createBuffers(gl, vertices, colors);
let { vertexShader, fragmentShader } = compileShaders(gl);
let program = createGLProgram(gl, vertexShader, fragmentShader);
let uniforms = setupAttributesAndUniform(gl, program, verticesBuffer);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
setupKeyboard();

function loop() {
    atualizarBola();
    atualizarBarras();

    const transforms = getTransformations();
    drawScene(gl, program, uniforms, transforms);

    requestAnimationFrame(loop);
}

loop();