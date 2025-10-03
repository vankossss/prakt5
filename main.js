const resultInput = document.getElementById('result');
const buttons = document.querySelector('.buttons');

let result = '0';         
let firstOperand = null;  
let math_operator = null; 
let secondOperand = false; 

function update() {
    resultInput.value = result;

    if (result.length > 10) {
        resultInput.style.fontSize = "2em";
    } else {
        resultInput.style.fontSize = "2.5em";
    }
}

function clear() {
    result = '0';
    firstOperand = null;
    math_operator = null;
    secondOperand = false;
    update();
}

function calculate() {
    if (math_operator === null || firstOperand === null) return;

    const prev = parseFloat(firstOperand);
    const curr = parseFloat(result);
    let calcResult;

    switch (math_operator) {
        case '+':
            calcResult = prev + curr;
            break;
        case '-':
            calcResult = prev - curr;
            break;
        case '*':
            calcResult = prev * curr;
            break;
        case '/':
            calcResult = curr === 0 ? 'Виникла помилка!' : prev / curr;
            break;
        default:
            return;
    }

    result = calcResult.toString();
    math_operator = null;
    firstOperand = null;
    secondOperand = true;
    update();
}

buttons.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const value = e.target.dataset.value;

    if (!isNaN(value) || value === '.') {
        if (secondOperand) {
            result = '0';
            secondOperand = false;
        }
        if (value === '.') {
            if (!result.includes('.')) {
                result += '.';
            }
        } else {
            result = result === '0' ? value : result + value;
        }
        update();
    }

    if (['+', '-', '*', '/'].includes(value)) {
        if (math_operator && !secondOperand) {
            calculate();
        }
        math_operator = value;
        firstOperand = result;
        secondOperand = true;
    }

    if (value === '=') {
        calculate();
    }

    if (value === 'C') {
        clear();
    }
});

update();
