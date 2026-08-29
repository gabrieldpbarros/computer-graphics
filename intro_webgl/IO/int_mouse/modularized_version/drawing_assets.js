function getDrawingAssets(gl) {
    let vertices = new Float32Array([0.0,0.0]);
    let colors = new Float32Array([1.0, 0.0, 0.0]);
    let pointSizes = new Float32Array([10.0]);

    return { vertices, colors, pointSizes };
}