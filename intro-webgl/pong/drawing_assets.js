function getVerticesBola() {
    return [
        0.05, 0.05,
        -0.05, 0.05,
        -0.05, -0.05,

        0.05, 0.05,
        -0.05, -0.05,
        0.05, -0.05
    ];
}

function getVerticesBarraEsquerda() {
    return [
        -0.75, 0.2,
        -0.85, 0.2,
        -0.85, -0.2,
        
        -0.75, 0.2,
        -0.85, -0.2,
        -0.75, -0.2
    ];
}

function getVerticesBarraDireita() {
    return [
        0.75, 0.2,
        0.85, 0.2,
        0.85, -0.2,
        
        0.75, 0.2,
        0.85, -0.2,
        0.75, -0.2
    ];
}

function defineVertices() {
    let verticesBola = getVerticesBola();
    let verticesBarraEsquerda = getVerticesBarraEsquerda();
    let verticesBarraDireita = getVerticesBarraDireita();

    return new Float32Array(verticesBola.concat(verticesBarraEsquerda).concat(verticesBarraDireita));
}

function defineColors() {
    let colors = [];
    for (let i = 0; i < 18; i++)
        colors.push(1.0, 1.0, 1.0);
    
    return new Float32Array(colors);
}

function getDrawingAssets() {
    let vertices = defineVertices();
    let colors = defineColors();

    return { vertices, colors };
}