export function triangleVertices(vertex) {
    const x1 = vertex[0];
    const y1 = vertex[1];
    const x2 = vertex[2];
    const y2 = vertex[3];
    const x3 = vertex[4];
    const y3 = vertex[5];

    return [
        x1, y1,
        x2, y2,
        x3, y3
    ];
}