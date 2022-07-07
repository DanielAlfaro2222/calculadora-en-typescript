import { verifyResultIsNaN } from "./helpers";

export { Calculator };

type HTML = HTMLElement;
type ListHTML = NodeList;

class Calculator {
    protected container: HTML;
    protected clearButton: HTML;
    protected buttonEqual: HTML;
    protected buttonDeletDigit: HTML;
    protected buttonPoint: HTML;
    protected operator: string;
    protected previousResult: HTML;
    protected currentResult: HTML;
    protected operators: ListHTML;
    protected numbers: ListHTML;

    constructor(container: HTML) {
        this.container = container;
        this.clearButton = container.querySelector("#clear-btn");
        this.buttonEqual = container.querySelector(".container-buttons-calculator__btn--equal");
        this.buttonDeletDigit = container.querySelector(".container-buttons-calculator__btn--delete-digit");
        this.buttonPoint = container.querySelector(".container-buttons-calculator__btn--point");
        this.operator = '';
        this.previousResult = container.querySelector("#prev-value");
        this.currentResult = container.querySelector("#current-value");
        this.operators = container.querySelectorAll(".container-buttons-calculator__btn--operator");
        this.numbers = container.querySelectorAll(".container-buttons-calculator__btn--number");


        // Escuchar eventos
        this.buttonEqual.addEventListener('click', () => {
            const operador: string = this.operator;
            const numeroAnterior: number = Number(this.previousResult.textContent.split(" ")[0]);
            const numeroActual: number = Number(this.currentResult.textContent);

            this.calcular(operador, numeroAnterior, numeroActual);
        });

        this.clearButton.addEventListener('click', () => this.limpiarPantalla());

        this.buttonDeletDigit.addEventListener('click', () => this.eliminarDigito());

        this.buttonPoint.addEventListener('click', () => this.agregarPunto());

        this.operators.forEach((operator: HTML) => {
            operator.onclick = () => this.mostrarOperacion(operator.textContent.trim());
        });

        this.numbers.forEach((num: HTML) => {
            num.onclick = () => this.mostrarNumero(num.textContent.trim());
        });
    }

    mostrarNumero(num: string): void {
        if (this.currentResult.textContent !== "0" && this.currentResult.textContent !== "Syntax error") {
            this.currentResult.textContent += num;
        } else {
            this.currentResult.textContent = num;
        }
    }

    mostrarOperacion(operador: string): void {
        if (this.currentResult.textContent !== "0" && this.currentResult.textContent !== "Syntax error" && this.currentResult.textContent !== "" && this.operator === "") {
            this.operator = operador;
            this.previousResult.textContent = `${this.currentResult.textContent} ${this.operator}`;
            this.currentResult.textContent = "";
        }
    }

    limpiarPantalla(resultadoActual: string = "0"): void {
        this.operator = "";
        this.currentResult.textContent = resultadoActual;
        this.previousResult.textContent = "";
    }

    calcular(operador: string, numeroAnterior: number, numeroActual: number): void {
        if (operador === "+") {
            this.currentResult.textContent = verifyResultIsNaN(numeroAnterior + numeroActual);
        } else if (operador === "*") {
            this.currentResult.textContent = verifyResultIsNaN(numeroAnterior * numeroActual);
        } else if (operador === "-") {
            this.currentResult.textContent = verifyResultIsNaN(numeroAnterior - numeroActual);
        } else {
            this.currentResult.textContent = verifyResultIsNaN(numeroAnterior / numeroActual);
        }

        this.limpiarPantalla(this.currentResult.textContent);
    }

    eliminarDigito(): void {
        let valorActual: string = this.currentResult.textContent;

        if (valorActual.length === 1) {
            this.currentResult.textContent = "0";
        } else if (valorActual !== "Syntax error") {
            this.currentResult.textContent = valorActual.slice(0, valorActual.length - 1);
        }
    }

    agregarPunto(): void {
        if (this.currentResult.textContent.at(-1) !== ".") {
            this.currentResult.textContent += ".";
        }
    }
}