export { verifyResultIsNaN };

function verifyResultIsNaN(operacion: number) {
    return isNaN(operacion) || !isFinite(operacion) ? "Syntax error" : `${operacion}`;
}