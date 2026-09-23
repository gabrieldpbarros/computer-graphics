function addKeyboardListener(gl, vertices) {
    const modeText = 
        document.getElementById(
            "mode"
        );

    // --------------------------------------------------
    // 10. INTERAÇÃO COM O TECLADO
    // --------------------------------------------------
    document.addEventListener(
        "keydown",
        keyboardClick,
        false
    );

    function keyboardClick(event) {
        switch(event.key.toLowerCase()) {
            case "r":
                if (mode != "reta") {
                    mode = "reta";
                    drawnPoints = 0;
                    clickCounter = 0;
                    vertices.fill(0.0);
                    clearScreen(gl);
                    modeText.textContent = 
                        `Modo: Retas`;
                }
                break;
            case "t":
                if (mode != "triangulo") {
                    mode = "triangulo";
                    drawnPoints = 0;
                    clickCounter = 0;
                    vertices.fill(0.0);
                    clearScreen(gl);
                    modeText.textContent = 
                        `Modo: Triângulos`;
                }
                break;
            default:
                return;
        }
    }
}