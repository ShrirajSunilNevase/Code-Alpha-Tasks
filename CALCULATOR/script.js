// Select the display screen and all buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let firstOperand = '';

// Add an event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        // Use if-else statements to handle different button types
        if (value === 'C') {
            // Clear the display and all variables
            currentInput = '';
            operator = '';
            firstOperand = '';
            display.textContent = '0';
        } else if (value === '=') {
            // Perform the calculation if an operator has been used
            if (firstOperand && operator && currentInput) {
                try {
                    // Use eval() to calculate the result.
                    // Note: eval() can be a security risk in other contexts,
                    // but it's safe enough for this simple calculator.
                    const result = eval(firstOperand + operator + currentInput);
                    display.textContent = result;
                    currentInput = result; // The result becomes the new input
                    firstOperand = '';
                    operator = '';
                } catch (error) {
                    display.textContent = 'Error';
                }
            }
        } else if (button.classList.contains('operator')) {
            // Handle operator clicks
            if (currentInput) {
                firstOperand = currentInput;
                operator = value;
                currentInput = ''; // Clear input for the next number
            }
        } else {
            // Handle number and decimal clicks
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});