import { ShaderBuilder } from '../shaders/shaderBuilder.js';
import { FragmentShaderStrategy } from '../shaders/strategies/fragmentShader.js';
import { VertexShaderStrategy } from '../shaders/strategies/vertexShader.js';

export class Program {
    constructor(gl) {
        this.gl = gl;
        this.createProgram();
    }
   
    createProgram() {
        const shaderBuilder = new ShaderBuilder(this.gl);
        const vertexShaderSource = VertexShaderStrategy.getShader();
        const fragmentShaderSource = FragmentShaderStrategy.getShader();

        shaderBuilder.setStrategy("vertex", vertexShaderSource);
        const vertexShader = shaderBuilder.createShader();

        shaderBuilder.setStrategy("fragment", fragmentShaderSource);
        const fragmentShader = shaderBuilder.createShader();

        const program = this.gl.createProgram();

        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS))
            throw new Error(this.gl.getProgramInfoLog(program));
        
        this.program = program;
    }

    getProgram() {
        return this.program;
    }
}