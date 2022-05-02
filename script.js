// Arithmetic Operations

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return num1 / num2;
}

function operate(num1, operator, num2) {
	firstNum = Number(num1);
	secondNum = Number(num2);

	switch (operator) {
		case '+':
			return add(firstNum, secondNum);
		case '-':
			return subtract(firstNum, secondNum);
		case 'x':
			return multiply(firstNum, secondNum);
		case '÷':
			if (firstNum === 0 || secondNum === 0) return null;
			else return divide(firstNum, secondNum);
		default:
			return null;
	}
}
