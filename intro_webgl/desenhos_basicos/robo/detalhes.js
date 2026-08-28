function desenhaDetalhes(gl) {
    // --------------------------------------------------
    // 1. VERTICES
    // --------------------------------------------------
    
    const vertices = new Float32Array([
        // Primeiro triangulo boca
        0.12, 0.705,
        -0.12, 0.705,
        -0.12, 0.65,

        // Segundo triangulo boca
        0.12, 0.705,
        -0.12, 0.65,
        0.12, 0.65,
        
        // Terceiro triangulo boca
        0.12, 0.65,
        0.0, 0.65,
        0.0, 0.63,

        // Quarto triangulo boca
        -0.12, 0.65,
        0.0, 0.65,
        0.0, 0.63,

        // Primeiro triangulo olho direito
        -0.07, 0.83,
        -0.17, 0.83,
        -0.17, 0.73,

        // Segundo triangulo olho direito
        -0.07, 0.83,
        -0.17, 0.73,
        -0.07, 0.73,

        // Primeiro triangulo olho esquerdo
        0.07, 0.83,
        0.17, 0.83,
        0.17, 0.73,

        // Segundo triangulo olho esquerdo
        0.07, 0.83,
        0.17, 0.73,
        0.07, 0.73,

        // Primeiro triangulo gravata (direita)
        0.0, 0.39,
        -0.115, 0.46,
        -0.1, 0.34,

        // Segundo triangulo gravata (esquerda)
        0.0, 0.39,
        0.115, 0.46,
        0.1, 0.34,

        // Primeito triangulo barriga
        0.3, -0.04,
        -0.3, -0.04,
        -0.3, -0.17,

        // Segundo triangulo barriga
        0.3, -0.04,
        -0.3, -0.17,
        0.3, -0.17
    ]);
    
    
    // --------------------------------------------------
    // 1. CORES
    // --------------------------------------------------
    function defineColors() {
        const colors = [];
        qtBlackFigures = 8;
        for (let i = 0; i < 3 * qtBlackFigures; i++)
            colors.push(0.1, 0.1, 0.1);
        for (let i = 0; i < 3*2; i++)
            colors.push(0.45, 0.05, 0.0);
        for (let i = 0; i < 3*2; i++)
            colors.push(0.25, 0.25, 0.25);

        return new Float32Array(colors);
    }
    const colors = defineColors();
    
    
    // --------------------------------------------------
    // 2. BUFFERS
    // --------------------------------------------------
    
    const verticesBuffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    
    gl.bufferData(
        gl.ARRAY_BUFFER,
        vertices,
        gl.STATIC_DRAW
    );
    
    const colorsBuffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    
    gl.bufferData(
        gl.ARRAY_BUFFER,
        colors,
        gl.STATIC_DRAW
    );
    
    
    // --------------------------------------------------
    // 3. VERTEX SHADER
    // --------------------------------------------------
    
    const vertexShaderSource = `#version 300 es
    
    in vec2 aPosition;
    in vec3 aColor;
    
    out vec3 vColor;
    
    void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        vColor = aColor;
    }
        
    `;
    
    
    // --------------------------------------------------
    // 4. FRAGMENT SHADER
    // --------------------------------------------------
    
    const fragmentShaderSource = `#version 300 es
    
    precision mediump float;
    
    in vec3 vColor;
    
    out vec4 outColor;
    
    void main() {
        outColor = vec4(vColor, 1.0);
    }
        
    `;
    
    
    // --------------------------------------------------
    // 5. COMPILAR SHADERS
    // --------------------------------------------------
    
    function createShader(gl, type, source) {
        
        const shader = gl.createShader(type);
        
        gl.shaderSource(shader, source);
        
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            
            const error = gl.getShaderInfoLog(shader);
            
            gl.deleteShader(shader);
            
            throw new Error(error);
        }
        
        return shader;
    }
    
    
    const vertexShader = createShader(
        gl,
        gl.VERTEX_SHADER,
        vertexShaderSource
    );
    
    const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );
    
    
    // --------------------------------------------------
    // 6. CRIAR PROGRAMA
    // --------------------------------------------------
    
    const program = gl.createProgram();
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        
        throw new Error(
            gl.getProgramInfoLog(program)
        );
    }
    
    
    // --------------------------------------------------
    // 7. LOCAL DOS ATRIBUTOS
    // --------------------------------------------------
    
    const positionLocation =
    gl.getAttribLocation(
        program,
        "aPosition"
    );
    
    const colorLocation =
    gl.getAttribLocation(
        program,
        "aColor"
    );
    
    
    // --------------------------------------------------
    // 8. CONFIGURAR ATRIBUTOS
    // --------------------------------------------------
    
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
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    
    gl.enableVertexAttribArray(colorLocation);
    
    gl.vertexAttribPointer(
        colorLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );
    
    
    // --------------------------------------------------
    // 9. DESENHAR
    // --------------------------------------------------
    
    gl.useProgram(program);
    
    const numComponents = 2;
    
    gl.drawArrays(
        gl.TRIANGLES,
        0,
        vertices.length / numComponents
    );
}