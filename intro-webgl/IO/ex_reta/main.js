const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");
const MAX_PONTOS = 1000;
let clickCounter = 0;
let drawnPoints = 0;

if (!gl) {
    throw new Error("WebGL 2 não é suportado.");
}

const { vertices, colors, pointSizes } = getDrawingAssets(gl);
const { verticesBuffer, colorsBuffer, pointSizesBuffer } = createBuffers(
    gl, vertices, colors, pointSizes
);
const { vertexShader, fragmentShader } = compileShaders(gl);
const program = createGLProgram(gl, vertexShader, fragmentShader);
configAttributes(
    gl, program, verticesBuffer, colorsBuffer, pointSizesBuffer
);
addMouseListener(
    canvas, gl, program, vertices, verticesBuffer
);
clearScreen(gl);
drawScreen(gl, program);