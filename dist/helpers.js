export { verifyResultIsNaN };
function verifyResultIsNaN(operacion) {
    return isNaN(operacion) || !isFinite(operacion) ? "Syntax error" : `${operacion}`;
}
