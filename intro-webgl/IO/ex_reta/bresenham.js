function toCanvas(x, y, canvas) {
    const x_canvas = canvas.width * (x + 1) / 2;
    const y_canvas = canvas.height * (1 - y) / 2;
    return { x_canvas, y_canvas }
}

function toWebGL(x, y, canvas) {
    const x_web = 2 * (x / canvas.width) - 1;
    const y_web = -(2 * (y / canvas.height) - 1);
    return { x_web, y_web }
}

function fillBresenham(vertices, canvas) {
    const MAX_SIZE = vertices.length;
    let { x_canvas: x0, y_canvas: y0 } = toCanvas(vertices[0], vertices[1], canvas);
    let { x_canvas: x1, y_canvas: y1 } = toCanvas(vertices[2], vertices[3], canvas);

    if (x0 > x1) {
        let aux = x0;
        x0 = x1;
        x1 = aux;

        aux = y0;
        y0 = y1;
        y1 = aux;
    }

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const m = dy/dx;
    let ystep = 1;
    if (y1 - y0 < 0) ystep = -1;

    const incInf = 2 * dy;
    const incSup = 2 * (dy - dx);
    const incEsq = 2 * dx;
    const incDir = 2 * (dx - dy);

    let x = x0;
    let y = y0;
    let i = 4;

    if (Math.abs(m) <= 1) {
        let p = 2 * dy - dx;
        let numSteps = dx;
        for (let step = 0; i < MAX_SIZE && step < numSteps; step++) {
            if (p < 0)
                p += incInf;
            else {
                p += incSup;
                y += ystep;
            }
            x++;
            
            const { x_web: x_GL, y_web: y_GL } = toWebGL(x, y, canvas);
            vertices[i++] = x_GL;
            vertices[i++] = y_GL;
            drawnPoints++;
        }
    } else {
        let p = 2 * dx - dy;
        let numSteps = dy
        for (let step = 0; i < MAX_SIZE && step < numSteps; step++) {
            if (p < 0) 
                p += incEsq;
            else {
                p += incDir;
                x++;
            }
            y += ystep;
            
            const { x_web: x_GL, y_web: y_GL } = toWebGL(x, y, canvas);
            vertices[i++] = x_GL;
            vertices[i++] = y_GL;
            drawnPoints++;
        }
    }
}