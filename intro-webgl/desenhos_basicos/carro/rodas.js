function desenhaRodas(gl) {
    // --------------------------------------------------
    // 1. VERTICES
    // --------------------------------------------------
    
    function setVertices() {
        const vertices = [];
        const x_center = [0.45, -0.45];
        const y_center = -0.295;

        let radius = 0.18;
        const numSides = 40;

        // pneus
        for (let j = 0; j < 2; j++) {
            vertices.push(x_center[j], y_center);
            for (let i = 0; i <= numSides; i++) {
                const angle = i * 2 * Math.PI / numSides;
                const x = x_center[j] + radius * Math.cos(angle);
                const y = y_center + radius * Math.sin(angle);
                vertices.push(x, y);
            }
        }

        // calotas
        radius = 0.115;
        for (let j = 0; j < 2; j++) {
            vertices.push(x_center[j], y_center);
            for (let i = 0; i <= numSides; i++) {
                const angle = i * 2 * Math.PI / numSides;
                const x = x_center[j] + radius * Math.cos(angle);
                const y = y_center + radius * Math.sin(angle);
                vertices.push(x, y);
            }
        }

        return new Float32Array(vertices);
    }

    const vertices = setVertices();
    
    // --------------------------------------------------
    // 1. CORES
    // --------------------------------------------------
    
    function setCores() {
        const cores = [];
        const numSides = 42;
        for (let i = 0; i < 2 * numSides; i++)
            cores.push(0.1, 0.1, 0.1);

        for (let i = 0; i < 2 * numSides; i++)
            cores.push(0.4, 0.4, 0.4);

        return new Float32Array(cores);
    }

    const colors = setCores();

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

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        vertices,
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
        colors,
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
        vertices.length / 8
    );

    gl.drawArrays(
        gl.TRIANGLE_FAN,
        vertices.length / 8,
        vertices.length / 8
    );

    gl.drawArrays(
        gl.TRIANGLE_FAN,
        vertices.length / 4,
        vertices.length / 8
    );

    gl.drawArrays(
        gl.TRIANGLE_FAN,
        3 * vertices.length / 8,
        vertices.length / 8
    );
}