import { m3 } from '../utils/m3.js'

export class SceneObject {
    constructor(vertices, color) {
        this.vertices = vertices;
        this.color = color; 
        this.modelTransform = m3.identity();
    }

    updateModelTransform(modelTransform) {
        this.modelTransform = modelTransform;
    }
}