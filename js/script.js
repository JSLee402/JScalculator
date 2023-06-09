const calculator = {
    displayValue: '0',
    firstOprnd: null,
    isSecondOprnd: false,
    operator: null,
};

function inputDigits(digit) {
    const {displayValue, isSecondOprnd} = calculator;

    if (isSecondOprnd === true) {
        calculator.displayValue = digit;
        calculator.isSecondOprnd = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(digit)
    console.log(displayValue)
}

function inputDecimal(dot) {
    if (calculator.isSecondOprnd === true) {
        calculator.displayValue = '.0'
        calculator.isSecondOprnd = false
        return
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot
    }
    console.log(dot)
    console.log(displayValue)
}

function handleOperator(nextOperator) {
    const {firstOprnd, displayValue, operator} = calculator
    const inputValue = parseFloat(displayValue)

    if (operator && calculator.isSecondOprnd) {
        calculator.operator = nextOperator
        return;
    }

    if (firstOprnd == null && !isNaN(inputValue)) {
        calculator.firstOprnd = inputValue
    } else if (operator) {
        const result = calculate(firstOprnd, inputValue, operator)

        calculator.displayValue = `${parseFloat(result.toFixed(5))}`
        calculator.firstOprnd = result
    }

    calculator.isSecondOprnd = true
    calculator.operator = nextOperator

    console.log(nextOperator)
    console.log(inputValue)
}

function calculate(oprnd1, oprnd2, operator) {
    if (operator === '+'){
        return oprnd1 + oprnd2;
    } else if (operator === '-') {
        return oprnd1 - oprnd2;
    } else if (operator === '*') {
        return oprnd1 * oprnd2;
    } else if (operator === '/') {
        return oprnd1 / oprnd2;
    }
    // return oprnd2
}

function resetCalculator() {
    calculator.displayValue = '0'
    calculator.firstOprnd = null
    calculator.isSecondOprnd = false
    calculator.operator = null
}

function updateDisplay() {
    const display = document.querySelector('.calculator-result')
    display.value = calculator.displayValue
}

updateDisplay();

const keys = document.querySelector('.calculator')
keys.addEventListener('click', e => {
    const {target} = e
    const {value} = target
    if(!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '/':
        case '*':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'clear':
            resetCalculator()
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigits(value)
            }
    }

    updateDisplay()
})