import { rectangleVertices } from '../../../utils/rectangle.js';
import { SceneObject } from '../../scene_object.js';

function setInitialLegVertex(vertex) {
    return new Float32Array(rectangleVertices(vertex));
}

export class Leg extends SceneObject {
    constructor(vertex, color) {
        super(
            setInitialLegVertex(vertex),
            color
        );
    }
}