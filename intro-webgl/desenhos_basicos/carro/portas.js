function desenhaPortas(gl) {
    // --------------------------------------------------
    // 1. VERTICES
    // --------------------------------------------------
    
    const vertices = new Float32Array([
        // Primeiro triangulo porta traseira
        -0.1, 0.5,
        -0.45, 0.5,
        -0.45, -0.1,
        
        // Segundo triangulo porta traseira
        -0.1, 0.5,
        -0.45, -0.1,
        -0.1, -0.1,

        // Primeiro triangulo borda porta traseira
        -0.45, 0.2,
        -0.55, 0.2,
        -0.55, -0.1,

        // Segundo triangulo borda porta traseira
        -0.45, 0.2,
        -0.55, -0.1,
        -0.45, -0.1,
        
        // Primeiro triangulo porta dianteira
        0.4, 0.5,
        0.05, 0.5,
        0.05, -0.1,
        
        // Segundo triangulo porta dianteira
        0.4, 0.5,
        0.05, -0.1,
        0.4, -0.1,

        // Primeiro triangulo borda porta dianteira
        0.44, 0.2,
        0.4, 0.2,
        0.4, -0.1,

        // Segundo triangulo borda porta dianteira
        0.44, 0.2,
        0.4, -0.1,
        0.44, -0.1,

        // Primeiro triangulo vidro traseiro
        -0.1, 0.5,
        -0.45, 0.5,
        -0.45, 0.2,
        
        // Segundo triangulo vidro traseiro
        -0.1, 0.5,
        -0.45, 0.2,
        -0.1, 0.2,

        // Triangulo inclinacao vidro traseiro
        -0.45, 0.5,
        -0.55, 0.2,
        -0.45, 0.2,

        // Primeiro triangulo vidro dianteiro
        0.4, 0.5,
        0.05, 0.5,
        0.05, 0.2,

        // Segundo triangulo vidro dianteiro
        0.4, 0.5,
        0.05, 0.2,
        0.4, 0.2,

        // Triangulo inclinacao vidro dianmteiro
        0.4, 0.5,
        0.4, 0.2,
        0.44, 0.2
    ]);
    
    
    // --------------------------------------------------
    // 1. CORES
    // --------------------------------------------------
    
    const colors = new Float32Array([
        // t1
        0.65, 0.0, 0.0, 
        0.65, 0.0, 0.0,
        0.65, 0.0, 0.0, 
        
        // t2
        0.65, 0.0, 0.0, 
        0.65, 0.0, 0.0,
        0.65, 0.0, 0.0, 
        
        // t3
        0.65, 0.0, 0.0, 
        0.65, 0.0, 0.0,
        0.65, 0.0, 0.0, 
        
        // t4
        0.65, 0.0, 0.0, 
        0.65, 0.0, 0.0,
        0.65, 0.0, 0.0,

        // t5
        0.65, 0.0, 0.0, 
        0.65, 0.0, 0.0,
        0.65, 0.0, 0.0, 
        
        // t6
        0.65, 0.0, 0.0, 
        0.65, 0.0, 0.0,
        0.65, 0.0, 0.0, 
        
        // t7
        0.65, 0.0, 0.0, 
        0.65, 0.0, 0.0,
        0.65, 0.0, 0.0, 
        
        // t8
        0.65, 0.0, 0.0, 
        0.65, 0.0, 0.0,
        0.65, 0.0, 0.0,
        
        // t9
        0.2, 0.5, 0.7, 
        0.2, 0.5, 0.7,
        0.2, 0.5, 0.7, 
        
        // t10
        0.2, 0.5, 0.7, 
        0.2, 0.5, 0.7,
        0.2, 0.5, 0.7,

        // t11
        0.2, 0.5, 0.7, 
        0.2, 0.5, 0.7,
        0.2, 0.5, 0.7, 
        
        // t12
        0.2, 0.5, 0.7, 
        0.2, 0.5, 0.7,
        0.2, 0.5, 0.7, 

        // t13
        0.2, 0.5, 0.7, 
        0.2, 0.5, 0.7,
        0.2, 0.5, 0.7,

        // t14
        0.2, 0.5, 0.7, 
        0.2, 0.5, 0.7,
        0.2, 0.5, 0.7, 
    ])
    
    
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