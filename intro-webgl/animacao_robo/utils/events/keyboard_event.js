const keysPressed = {};

export function setupKeyboard() {
    window.addEventListener("keydown", (e) => {
        keysPressed[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
        keysPressed[e.key] = false;
    });
}

export function isKeyDown(key) {
    return !!keysPressed[key];
}