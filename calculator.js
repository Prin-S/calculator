let num1 = 0;
let operator = '';
let num2 = 0;

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    return Number(num1) / Number(num2);
}

function operate(num1, operator, num2) {
    if (operator == 'plus') {
        return add(num1, num2);
    } else if (operator == 'minus') {
        return subtract(num1, num2);
    } else if (operator == 'times') {
        return multiply(num1, num2);
    } else if (operator == 'divide') {
        return divide(num1, num2);
    }
}

const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.button');
const operatorButtons = document.querySelectorAll('.operator_button');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');

numButtons.forEach(button => {
    button.addEventListener('click', showValue.bind(this, button));
});

function showValue(button) {
    if (display.textContent == 0) {
        display.textContent = button.innerText;
    } else if (num1 != 0 && operator != '' && num2 == 0) {
        display.textContent = button.innerText;
    } else {
        display.textContent += button.innerText;
    }
    
    if (operator == '') {
        num1 = Number(display.textContent);
    } else {
        num2 = Number(display.textContent);
    }
}

operatorButtons.forEach(button => {
    button.addEventListener('click', highlight.bind(this, button));
});

function highlight(button) {
    button.style.filter = 'brightness(80%)';
    
    if (num1 != 0 && num2 == 0) {
        display.textContent = button.innerText;
        operator = button.id;
    }

    if (num2 != 0) {
        display.textContent = checkDecimal(num1, operator, num2);
        num1 = Number(display.textContent);
        operator = button.id;
        num2 = 0;
    }
}

equals.addEventListener('click', calculate.bind());

function calculate() {
    display.textContent = checkDecimal(num1, operator, num2);
    num1 = Number(display.textContent);
    operator = '';
    num2 = 0;
}

function checkDecimal(num1, operator, num2) {
    if (operate(num1, operator, num2) % 1 == 0) {
        return operate(num1, operator, num2);
    } else {
        return operate(num1, operator, num2).toFixed(2);
    }
}

clear.addEventListener('click', clearScreen.bind());

function clearScreen() {
    display.textContent = 0;
    num1 = 0;
    operator = '';
    num2 = 0;
}