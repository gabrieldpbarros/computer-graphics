import { Program } from './program/program.js';
import { Scene } from './entities/scene.js';
import { setupKeyboard } from './utils/events/keyboard_event.js';

const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

if (!gl) throw new Error("WebGL2 não é suportado.");

const program = new Program(gl);
gl.clearColor(
    0.1,
    0.1,
    0.1,
    1.0
);

gl.viewport(
    0,
    0,
    canvas.width,
    canvas.height
);
const scene = new Scene(gl, program);
setupKeyboard();
scene.init();