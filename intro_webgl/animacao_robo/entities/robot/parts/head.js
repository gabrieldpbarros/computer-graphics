import { rectangleVertices } from '../../../utils/rectangle.js';
import { SceneObject } from '../../scene_object.js';

function setInitialHeadVertex(vertex) {
    return new Float32Array(rectangleVertices(vertex));
}

export class Head extends SceneObject {
    constructor(vertex, color) {
        super(
            setInitialHeadVertex(vertex),
            color
        );
    }
}