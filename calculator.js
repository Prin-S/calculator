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
const plusButton = document.querySelector('#plus');
const minusButton = document.querySelector('#minus');
const timesButton = document.querySelector('#times');
const divideButton = document.querySelector('#divide');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');

function changeColorIn(button) {
    button.style.filter = 'brightness(90%)';
}

function changeColorOut(button) {
    button.style.filter = 'brightness(100%)';
}

function clearOperatorButtons() { // Change operator buttons to default color
    operatorButtons.forEach(button => {
        button.style.background = 'orange';
    });
}

document.addEventListener('keydown', function(event) { // Keyboard control
    if (event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || event.key == '5' ||
        event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' || event.key == '0' ||
        event.key == '.') {
        showNum(event);
    } else if (event.key == '+') {
        selectOperator(plusButton);
    } else if (event.key == '-') {
        selectOperator(minusButton);
    } else if (event.key == '*') {
        selectOperator(timesButton);
    } else if (event.key == '/') {
        selectOperator(divideButton);
    } else if (event.key == '=' || event.key == 'Enter') {
        calculate();
    } else if (event.key == 'c') {
        clearScreen();
    } else if (event.key == 'Backspace') {
        deleteNum();
    }
  });

numButtons.forEach(button => {
    button.addEventListener('mouseover', changeColorIn.bind(this, button));
    button.addEventListener('mouseout', changeColorOut.bind(this, button));
    button.addEventListener('click', showNum.bind(this, button));
});

function showNum(button) {
    clearOperatorButtons();

    if (button.key) { // In case number is entered through keyboard
        button.innerText = button.key;
    }

    if ((display.textContent == '0' || (num1 != 0 && operator != '' && num2 == null)) && button.innerText == '.') { // If decimal is entered when number is empty,
        // show 0 before it
        display.textContent = '0.';
    } else if (display.textContent == '0' || (num1 != 0 && operator != '' && num2 == null)) { // When first or second number has not been entered
        display.textContent = button.innerText;
    } else if (display.textContent.includes('.') && button.innerText == '.') { // Prevent more than one decimal
        display.textContent;
    } else {
        display.textContent += button.innerText;
    }
    
    if (operator == '') { // If no operator is selected, assign number to num1
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
    button.style.background = 'lightgreen'; // Highlight selected operator

    if (num1 != 0 && num2 == null) {
        display.textContent = button.innerText;
        operator = button.id;
    }

    if (num2 != null) {
        display.textContent = checkDecimal(num1, operator, num2); // Calculate if first and second number are entered and operator is selected 
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

    if (operator == '') { // If no operator is selected and calculate button is pressed
        display.textContent = num1;
    } else {
        display.textContent = checkDecimal(num1, operator, num2);
    }
    
    num1 = Number(display.textContent);
    operator = '';
    num2 = null;
}

function checkDecimal(num1, operator, num2) {
    if (operate(num1, operator, num2).toFixed(3) % 1 == 0 && String(operate(num1, operator, num2)).includes('.')) { // If result contains only 0 when rounded to three
        // decimal places, return number with zero decimal places
        return operate(num1, operator, num2).toFixed(0);
    } else if (operate(num1, operator, num2) % 1 == 0) { // If result has no decimal numbers
        return operate(num1, operator, num2);
    } else if (operator == 'divide' && num2 == 0) { // Prevent division by 0
        return 'Error!';
    } else {
        return operate(num1, operator, num2).toFixed(3);
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
    display.textContent = display.textContent.slice(0, -1); // Delete the last number entered

    if (num2 == null) {
        num1 = display.textContent;
    } else {
        num2 = display.textContent;
    }
}