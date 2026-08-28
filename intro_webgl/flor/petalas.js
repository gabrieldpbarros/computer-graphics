function desenhaPetalas(gl) {
    // --------------------------------------------------
    // 1. VERTICES
    // --------------------------------------------------
    
    function setVertices() {
        const vertices = [];

        let radius = 0.13;
        const qt_petals = 2;
        // top petal
        const x_prim_petals = 0.0;
        const y_prim_petals = 0.35;
        const numSides = 40;
        vertices.push(x_prim_petals, y_prim_petals)

        for (let i = 0; i <= numSides; i++) {
            const angle = i * 2 * Math.PI / numSides;
            const x = x_prim_petals + radius * Math.cos(angle);
            const y = y_prim_petals + radius * Math.sin(angle);
            vertices.push(x, y);
        }

        // side petals
        const x_sec_petals = [0.15, 0.1, 0.08, 0.04];
        const y_sec_spetals = [0.25, 0.08, 0.9, 0.9];
        for (let j = 0; j < qt_petals; j++) {
            // right one
            vertices.push(x_sec_petals[j], y_sec_spetals[j]);
            for (let i = 0; i <= numSides; i++) {
                const angle = i * 2 * Math.PI / numSides;
                const x = x_sec_petals[j] + radius * Math.cos(angle);
                const y = y_sec_spetals[j] + radius * Math.sin(angle);
                vertices.push(x, y);
            }

            // left one
            vertices.push(-x_sec_petals[j], y_sec_spetals[j]);
            for (let i = 0; i <= numSides; i++) {
                const angle = i * 2 * Math.PI / numSides;
                const x = radius * Math.cos(angle) - x_sec_petals[j];
                const y = y_sec_spetals[j] + radius * Math.sin(angle);
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
        for (let i = 0; i < 5 * numSides; i++)
            cores.push(0.7, 0.0, 0.5);

        return new Float32Array(cores);
    }

    const colors = setCores();
    
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
    let qt_petals = 5;
    
    for (let i = 0; i < qt_petals; i++) {
        gl.drawArrays(
            gl.TRIANGLE_FAN,
            i * vertices.length / 10,
            vertices.length / 10
        );
    }
}