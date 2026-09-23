function getDrawingAssets(gl) {
    let vertices = new Float32Array(MAX_PONTOS * 2);

    const colorsArray = [];
    const pointsArray = [];
    for (let i = 0; i < MAX_PONTOS; i++) {
        colorsArray.push(0.2, 0.6, 0.9),
        pointsArray.push(3.5);
    }
    let colors = new Float32Array(colorsArray);
    let pointSizes = new Float32Array(pointsArray);

    return { vertices, colors, pointSizes };
}