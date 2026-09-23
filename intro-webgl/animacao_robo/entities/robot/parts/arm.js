import { rectangleVertices } from '../../../utils/rectangle.js';
import { SceneObject } from '../../scene_object.js';

function setInitialArmVertex(vertex) {
    return new Float32Array(rectangleVertices(vertex));
}

export class Arm extends SceneObject {
    constructor(vertex, color) {
        super(
            setInitialArmVertex(vertex),
            color
        );
    }
}