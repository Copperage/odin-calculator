// Calculator Functionality
class Calculator {
	constructor(prevOpText, currentOpText) {
		this.prevOpText = prevOpText;
		this.currentOpText = currentOpText;
		this.clear();
	}

	clear() {
		this.prevOp = '';
		this.currentOp = '';
		this.operation = undefined;
	}

	deleteLast() {
		this.currentOp = this.currentOp.toString().slice(0, -1);
	}

	appendNum(number) {
		if (number === '.' && this.currentOp.includes('.')) return;
		this.currentOp = this.currentOp.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOp === '') return;
		if (this.prevOp !== '') {
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

		this.currentOp = Math.round(computation * 1000000) / 1000000;
		this.prevOp = '';
		this.operation = undefined;
	}

	updateDisplay() {
		this.currentOpText.innerText = this.currentOp;
		if (this.operation != null) {
			this.prevOpText.innerText = `${this.prevOp} ${this.operation}`;
		} else {
			this.prevOpText.innerText = '';
		}
	}
}

// Keyboard Event Listeners
function keyboardInput(e) {
	if (e.key >= 0 && e.key <= 9) {
		calculator.appendNum(e.key);
		calculator.updateDisplay();
	}
	if (e.key === '.') {
		calculator.appendNum(e.key);
		calculator.updateDisplay();
	}
	if (e.key === '=' || e.key === 'Enter') {
		calculator.compute();
		calculator.updateDisplay();
	}
	if (e.key === 'Backspace') {
		calculator.deleteLast();
		calculator.updateDisplay();
	}
	if (e.key === 'Escape') {
		calculator.clear();
		calculator.updateDisplay();
	}

	if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
		calculator.chooseOperation(operatorConversion(e.key));
		calculator.updateDisplay();
	}
}

function operatorConversion(keyboardOperator) {
	if (keyboardOperator === '/') return '÷';
	if (keyboardOperator === '*') return '*';
	if (keyboardOperator === '-') return '-';
	if (keyboardOperator === '+') return '+';
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
this.operation = undefined;

// Event Listeners
document.addEventListener('keydown', keyboardInput);

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
