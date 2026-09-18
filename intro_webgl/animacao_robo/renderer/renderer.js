import { m3 } from '../utils/m3.js';

export class Renderer {
    constructor(gl, programObj) {
        this.gl = gl;
        this.program = programObj;

        this.positionLocation = this.gl.getAttribLocation(
            this.program.getProgram(),
            "aPosition"
        );

        this.colorLocation = this.gl.getUniformLocation(
            this.program.getProgram(),
            "uColor"
        );

        this.viewTransformLocation = this.gl.getUniformLocation(
            this.program.getProgram(),
            "u_viewTransform"
        );

        this.modelTransformLocation = this.gl.getUniformLocation(
            this.program.getProgram(),
            "u_modelTransform"
        );

        this.viewTransform = m3.identity();

        this.verticesBuffer = this.gl.createBuffer();
    }

    defineViewTransform(viewTransform) {
        this.viewTransform = viewTransform;
    }

    draw(object) {
        this.gl.bindBuffer(
            this.gl.ARRAY_BUFFER,
            this.verticesBuffer
        );

        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            object.vertices,
            this.gl.STATIC_DRAW
        );

        this.gl.enableVertexAttribArray(
            this.positionLocation
        );

        this.gl.vertexAttribPointer(
            this.positionLocation,
            2,
            this.gl.FLOAT,
            false,
            0,
            0
        );

        this.gl.uniform3fv(
            this.colorLocation,
            object.color
        );

        this.gl.uniformMatrix3fv(
            this.modelTransformLocation,
            false,
            object.modelTransform
        );

        this.gl.uniformMatrix3fv(
            this.viewTransformLocation,
            false,
            this.viewTransform
        );

        this.gl.drawArrays(
            this.gl.TRIANGLES,
            0,
            object.vertices.length / 2
        );
    }

    getProgramObj() {
        return this.program;
    }
}