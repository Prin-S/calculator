let num1 = 0;
let operator = '';
let num2 = null;

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
const decimal = document.querySelector('#decimal');
const backspace = document.querySelector('#backspace');

function changeColorIn(button) {
    button.style.filter = 'brightness(90%)';
}

function changeColorOut(button) {
    button.style.filter = 'brightness(100%)';
}

function clearOperatorButtons() {
    operatorButtons.forEach(button => {
        button.style.background = 'orange';
    });
}

numButtons.forEach(button => {
    button.addEventListener('mouseover', changeColorIn.bind(this, button));
    button.addEventListener('mouseout', changeColorOut.bind(this, button));
    button.addEventListener('click', showNum.bind(this, button));
});

function showNum(button) {
    clearOperatorButtons();

    if (display.textContent == 0 || (num1 != 0 && operator != '' && num2 == null)) {
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
    button.addEventListener('mouseover', changeColorIn.bind(this, button));
    button.addEventListener('mouseout', changeColorOut.bind(this, button));
    button.addEventListener('click', selectOperator.bind(this, button));
});

function selectOperator(button) {
    clearOperatorButtons();
    button.style.background = 'lightgreen';
    
    if (num1 != 0 && num2 == null) {
        display.textContent = button.innerText;
        operator = button.id;
    }

    if (num2 != null) {
        display.textContent = checkDecimal(num1, operator, num2);
        num1 = Number(display.textContent);
        operator = button.id;
        num2 = null;
    }
}

equals.addEventListener('mouseover', changeColorIn.bind(this, equals));
equals.addEventListener('mouseout', changeColorOut.bind(this, equals));
equals.addEventListener('click', calculate.bind());

function calculate() {
    clearOperatorButtons();

    if (num2 == null) {
        num2 = num1;
    }

    if (operator == '') {
        display.textContent = num1;
    } else {
        display.textContent = checkDecimal(num1, operator, num2);
    }
    
    num1 = Number(display.textContent);
    operator = '';
    num2 = null;
}

function checkDecimal(num1, operator, num2) {
    if (operate(num1, operator, num2) % 1 == 0 || String(operate(num1, operator, num2).toFixed(2)).slice(-1) == 0) {
        return operate(num1, operator, num2);
    } else if (operator == 'divide' && num2 == 0) {
        return 'Error!';
    } else {
        return operate(num1, operator, num2).toFixed(2);
    }
}

clear.addEventListener('mouseover', changeColorIn.bind(this, clear));
clear.addEventListener('mouseout', changeColorOut.bind(this, clear));
clear.addEventListener('click', clearScreen.bind());

function clearScreen() {
    clearOperatorButtons();
    display.textContent = 0;
    num1 = 0;
    operator = '';
    num2 = null;
}

backspace.addEventListener('mouseover', changeColorIn.bind(this, backspace));
backspace.addEventListener('mouseout', changeColorOut.bind(this, backspace));
backspace.addEventListener('click', deleteNum.bind());

function deleteNum() {
    clearOperatorButtons();
    display.textContent = display.textContent.slice(0, -1);

    if (num2 == null) {
        num1 = display.textContent;
    } else {
        num2 = display.textContent;
    }
}