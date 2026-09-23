function compileShaders(gl) {
    // --------------------------------------------------
    // 3. VERTEX SHADER
    // --------------------------------------------------
    const vertexShaderSource = `#version 300 es
    in vec2 aPosition;
    uniform mat3 u_transform;

    void main() {
        vec3 position = u_transform * vec3(aPosition, 1.0);
        gl_Position = vec4(position.xy, 0.0, 1.0);
    }
    `;

    // --------------------------------------------------
    // 4. FRAGMENT SHADER
    // --------------------------------------------------
    const fragmentShaderSource = `#version 300 es
    precision mediump float;
    uniform vec3 u_color;
    out vec4 outColor;

    void main() {
        outColor = vec4(u_color, 1.0);
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

    return { vertexShader, fragmentShader };
}