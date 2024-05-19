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

let num1 = 0;
let num2 = 0;
let operator = '';
let tempnum = 0;

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

const container = document.querySelector('#container');
const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.button');
const operatorButtons = document.querySelectorAll('.operator_button');
const equals = document.querySelector('#equals');

numButtons.forEach(button => {
    button.addEventListener('click', showValue.bind(this, button));
});

function showValue(button) {
    display.textContent = button.innerText;
    if (operator == '') {
        tempnum = button.innerText;
    } else {
        num2 = button.innerText;
    }
}

operatorButtons.forEach(button => {
    button.addEventListener('click', highlight.bind(this, button));
});

function highlight(button) {
    button.style.filter = 'brightness(80%)';
    num1 = tempnum;
    operator = button.id;
}

equals.addEventListener('click', calculate.bind(this, equals));

function calculate(button) {
    display.textContent = operate(num1, operator, num2);
}