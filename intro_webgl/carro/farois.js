function desenhaFarois(gl) {
    // --------------------------------------------------
    // 1. VERTICES
    // --------------------------------------------------
    
    function setVerticesFarolFrontal() {
        const vertices = [];
        const x_center = 0.785;
        const y_center = 0.09;
        vertices.push(x_center, y_center);

        const radius = 0.06;
        const numSides = 40;

        for (let i = 0; i <= numSides; i++) {
            const angle = i * 2 * Math.PI / numSides;
            const x = x_center + radius * Math.cos(angle);
            const y = y_center + radius * Math.sin(angle);
            vertices.push(x, y);
        }

        return new Float32Array(vertices);
    }

    const verticesFarolFrontal = setVerticesFarolFrontal();
    const verticesFaroisTraseiros = new Float32Array([
        -0.68, 0.12,
        -0.82, 0.12,
        -0.82, 0.06,
        
        -0.68, 0.12,
        -0.82, 0.06,
        -0.68, 0.06,

        -0.695, 0.056,
        -0.82, 0.056,
        -0.82, -0.004,
        
        -0.695, 0.056,
        -0.82, -0.004,
        -0.695, -0.004
    ]);
    
    // --------------------------------------------------
    // 1. CORES
    // --------------------------------------------------
    
    function setCoresFarolFrontal() {
        const cores = [];
        const numSides = 41;

        for (let i = 0; i <= numSides; i++)
            cores.push(0.9, 0.95, 0.0);

        return new Float32Array(cores);
    }

    const colorsFarolFrontal = setCoresFarolFrontal();
    const colorsFaroisTraseiros = new Float32Array([
        0.9, 0.15, 0.0,
        0.9, 0.15, 0.0,
        0.9, 0.15, 0.0,

        0.9, 0.15, 0.0,
        0.9, 0.15, 0.0,
        0.9, 0.15, 0.0,

        0.875, 0.875, 0.875,
        0.875, 0.875, 0.875,
        0.875, 0.875, 0.875,

        0.875, 0.875, 0.875,
        0.875, 0.875, 0.875,
        0.875, 0.875, 0.875
    ]);
    
    // --------------------------------------------------
    // 2. BUFFERS
    // --------------------------------------------------
    
    const verticesBuffer = gl.createBuffer();
    const colorsBuffer = gl.createBuffer();
    
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
    // 8. CONFIGURAR ATRIBUTOS E DESENHAR
    // --------------------------------------------------
    
    gl.useProgram(program);
    // Farol frontal
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        verticesFarolFrontal,
        gl.STATIC_DRAW
    );
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
    gl.bufferData(
        gl.ARRAY_BUFFER,
        colorsFarolFrontal,
        gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(
        colorLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.drawArrays(
        gl.TRIANGLE_FAN,
        0,
        verticesFarolFrontal.length / 2
    );

    // Farois traseiros
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        verticesFaroisTraseiros,
        gl.STATIC_DRAW
    );
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
    gl.bufferData(
        gl.ARRAY_BUFFER,
        colorsFaroisTraseiros,
        gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(
        colorLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.drawArrays(
        gl.TRIANGLES,
        0,
        verticesFaroisTraseiros.length / 2
    );
}