import { rectangleVertices } from '../../../utils/rectangle.js';
import { triangleVertices } from '../../../utils/triangle.js';
import { SceneObject } from '../../scene_object.js';

function setInitialFaceVertex(vertex) {
    return rectangleVertices(vertex);
}

function setLowerMouthVertex(vertex) {
    return triangleVertices(vertex);
}

export class Face extends SceneObject {
    constructor(vertex, color) {
        const leftEyeVertex = vertex.slice(0,4);
        const rightEyeVertex = vertex.slice(4,8);
        const upperMouthVertex = vertex.slice(8,12);
        const lowerMouthVertex = vertex.slice(12,18);

        const leftEye = setInitialFaceVertex(leftEyeVertex);
        const rightEye = setInitialFaceVertex(rightEyeVertex);
        const upperMouth = setInitialFaceVertex(upperMouthVertex);
        const lowerMouth = setLowerMouthVertex(lowerMouthVertex);
        const allVertices = [
            ...leftEye,
            ...rightEye,
            ...upperMouth,
            ...lowerMouth
        ];
        super(
            new Float32Array(allVertices),
            color
        );
    }
}