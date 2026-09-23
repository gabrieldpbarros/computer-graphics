import { Arm } from './parts/arm.js';
import { Body } from './parts/body.js';
import { Head } from './parts/head.js';
import { Leg } from './parts/leg.js';
import { Face } from './parts/face.js';
import { isKeyDown } from '../../utils/events/keyboard_event.js';
import { m3 } from '../../utils/m3.js'

export class Robot {
    constructor(tx, ty, speed) {
        this.tx = tx;
        this.ty = ty;
        this.speed = speed;
        
        const defaultColor = new Float32Array([0.3, 0.3, 0.3]);
        const faceColor = new Float32Array([0.1, 0.1, 0.1]);

        this.head = new Head(
            [-0.2, 0.6, 0.4, 0.28],
            new Float32Array(defaultColor)
        );
        this.body = new Body(
            [-0.4, -0.25, 0.8, 0.85],
            new Float32Array(defaultColor)
        );
        this.leftArm = new Arm(
            [0.4, -0.35, 0.2, 0.95],
            new Float32Array(defaultColor)
        );
        this.rightArm = new Arm(
            [-0.6, -0.35, 0.2, 0.95],
            new Float32Array(defaultColor)
        );
        this.leftLeg = new Leg(
            [0.15, -0.9, 0.25, 0.65],
            new Float32Array(defaultColor)
        );
        this.rightLeg = new Leg(
            [-0.4, -0.9, 0.25, 0.65],
            new Float32Array(defaultColor)
        );
        this.face = new Face(
            [
                0.07, 0.73, 0.1, 0.1,
                -0.17, 0.73, 0.1, 0.1,
                -0.12, 0.65, 0.24, 0.055,
                -0.12, 0.65, 0.0, 0.63, 0.12, 0.65                
            ],
            new Float32Array(faceColor)
        );
    }

    move(input) {
        if(isKeyDown("w") && this.ty < 2.12) this.ty += this.speed;
        if(isKeyDown("a") && this.tx > -2.39) this.tx -= this.speed;
        if(isKeyDown("s") && this.ty > -2.1) this.ty -= this.speed;
        if(isKeyDown("d") && this.tx < 2.39) this.tx += this.speed;

        const movementTranslation = m3.translation(this.tx, this.ty);
        this.head.updateModelTransform(movementTranslation);
        this.body.updateModelTransform(movementTranslation);
        this.leftArm.updateModelTransform(movementTranslation);
        this.rightArm.updateModelTransform(movementTranslation);
        this.leftLeg.updateModelTransform(movementTranslation);
        this.rightLeg.updateModelTransform(movementTranslation);
        this.face.updateModelTransform(movementTranslation);
    }

    draw(renderer) {
        renderer.draw(this.head);
        renderer.draw(this.body);
        renderer.draw(this.leftArm);
        renderer.draw(this.rightArm);
        renderer.draw(this.leftLeg);
        renderer.draw(this.rightLeg);
        renderer.draw(this.face);
    }
}