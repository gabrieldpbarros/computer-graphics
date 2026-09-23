import { Renderer } from '../renderer/renderer.js';
import { m3 } from '../utils/m3.js';
import { Robot } from './robot/robot.js';

export class Scene {
    constructor(gl, program) {
        this.gl = gl;
        this.renderer = new Renderer(gl, program);
        this.viewTransform = m3.setClippingWindow(-3.0,-3.0,3.0,3.0);
        this.renderer.defineViewTransform(this.viewTransform);

        this.robot = new Robot(0.0, 0.0, 0.015);
    }

    update() {
        this.robot.move();
    }

    draw() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        var program = this.renderer.getProgramObj();
        this.gl.useProgram(program.getProgram());
        this.robot.draw(this.renderer);
    }

    execute() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.execute());
    }

    init() {
        requestAnimationFrame(() => this.execute());
    }

    getRenderer() {
        return this.renderer;
    }
}