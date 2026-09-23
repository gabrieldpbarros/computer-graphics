export function rectangleVertices(vertex){
    var x = vertex[0];
    var y = vertex[1];
    var width = vertex[2];
    var height = vertex[3];

    return [
        x, y,
        x+width, y+height,
        x, y+height,

        x, y,
        x+width, y,
        x+width, y+height
    ];
}