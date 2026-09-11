function getTransformations() {
    let bolaTransform = m3.translation(txBola, tyBola);
    let barraETransform = m3.translation(0.0, tyBarraE);
    let barraDTransform = m3.translation(0.0, tyBarraD);

    return { bolaTransform, barraETransform, barraDTransform };
}

function atualizarBola() {
    txBola += xOffBola;
    tyBola += yOffBola;

    // quique nas paredes superior/inferior (y) e esquerda/direita (x)
    if (tyBola > 0.95 || tyBola < -0.95) yOffBola = -yOffBola;
    if (txBola > 0.95 || txBola < -0.95) xOffBola = -xOffBola;

    // quique nas barras
    // barra esquerda
    if (txBola < -0.695) {
        let barraE_minY = tyBarraE - 0.2;
        let barraE_maxY = tyBarraE + 0.2;
        if ((tyBola + 0.05) > barraE_minY && (tyBola - 0.05) < barraE_maxY)
            xOffBola = -xOffBola;
    }
    // barra direita
    if (txBola > 0.695) {
        let barraD_minY = tyBarraD - 0.2;
        let barraD_maxY = tyBarraD + 0.2;
        if ((tyBola + 0.05) > barraD_minY && (tyBola - 0.05) < barraD_maxY)
            xOffBola = -xOffBola;
    }
}

function atualizarBarras() {
    if (isKeyDown("w") && tyBarraE < 0.8) tyBarraE += yOffBarraE;
    if (isKeyDown("s") && tyBarraE > -0.8) tyBarraE -= yOffBarraE;

    if (isKeyDown("ArrowUp") && tyBarraD < 0.8) tyBarraD += yOffBarraD;
    if (isKeyDown("ArrowDown") && tyBarraD > -0.8) tyBarraD -= yOffBarraD;
}