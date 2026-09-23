const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

if (!gl) {
    throw new Error("WebGL 2 não é suportado.");
}

gl.clearColor(0.2, 0.2, 0.2, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);

desenhaCorpo(gl);
desenhaDetalhes(gl);
desenhaMaleta(gl);