// Calculator Functionality

class Calculator {
	constructor(prevOpText, currentOpText) {
		this.prevOpText = currentOpText;
		this.currentOpText = currentOpText;
		this.clear();
	}

	clear() {
		this.prevOp = '';
		this.currentOp = '';
		this.operation = undefined;
	}

	delete() {
		this.currentOp = this.currentOp.toString().slice(0, -1);
	}

	appendNum(number) {
		if (number === '.' && this.currentOp.includes('.')) return;
		this.currentOp = this.currentOp.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOp === '') return;
		if (this.currentOp !== '') {
			this.compute();
		}

		this.operation = operation;
		this.prevOp = this.currentOp;
		this.currentOp = '';
	}

	compute() {
		let computation;
		const prev = parseFloat(this.prevOp);
		const curr = parseFloat(this.currentOp);

		function divide(prev, curr) {
			if (prev === 0 || curr === 0) computation = null;
			else return prev / curr;
		}

		switch (this.operation) {
			case '+':
				computation = prev + curr;
				break;
			case '-':
				computation = prev - curr;
				break;
			case '*':
				computation = prev * curr;
				break;
			case '÷':
				computation = divide(prev, curr);
				break;
			default:
				return;
		}

		this.currentOp = computation;
		this.prevOp = '';
		this.operator = undefined;
	}

	updateDisplay() {
		this.currentOpText.innerText = this.currentOp;
	}
}

// Query Selections + Init
const numButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const acButton = document.querySelector('[data-all-clear]');
const delButton = document.querySelector('[data-delete]');
const currentOpText = document.querySelector('[data-current-op]');
const prevOpText = document.querySelector('[data-prev-op]');

const calculator = new Calculator(prevOpText, currentOpText);

this.currentOp = '';
this.prevOp = '';
this.operator = undefined;

// Event Listeners

numButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendNum(button.innerText);
		calculator.updateDisplay();
	});
});

opButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener('click', () => {
	calculator.compute();
	calculator.updateDisplay();
});

acButton.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});

delButton.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay();
});
