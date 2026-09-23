import { rectangleVertices } from '../../../utils/rectangle.js';
import { SceneObject } from '../../scene_object.js';

function setInitialBodyVertex(vertex) {
    return new Float32Array(rectangleVertices(vertex));
}

export class Body extends SceneObject {
    constructor(vertex, color) {
        super(
            setInitialBodyVertex(vertex),
            color
        );
    }
}