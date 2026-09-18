export class ShaderBuilder {
    constructor(gl) {
        this.gl = gl;
    }

    setStrategy(type, source) {
        if (type == "vertex") this.type = this.gl.VERTEX_SHADER;
        else if (type == "fragment") this.type = this.gl.FRAGMENT_SHADER;
        this.source = source;
    }

    createShader() {
        const shader = this.gl.createShader(this.type);
        this.gl.shaderSource(shader, this.source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const error = this.gl.getShaderInfoLog(shader);
            this.gl.deleteShader(shader);

            throw new Error(error);
        }

        return shader;
    }
}