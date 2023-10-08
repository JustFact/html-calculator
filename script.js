let operandLeft = 0;
let operandRight = 0;
let operation = '';

function add(num1, num2){
    return num1+num2;
}

function subtract(num1, num2){
    return num1-num2;
}

function multiply(num1, num2){
    return num1*num2;
}

function divide(num1, num2){
    return num1/num2
}

function operate(opr, operand1, operand2){
    let result = 0;
    switch(opr){
        case '+': result = add(operand1,operand2);
        break;
        case '-': result = subtract(operand1,operand2);
        break;
        case '*': result = multiply(operand1,operand2);
        break;
        case '/': result = divide(operand1,operand2);
        break;
    }
    return result;
}

let numBtns = document.querySelectorAll('.num-btn');
const display = document.querySelector('#display');

numBtns.forEach(numBtn=>{
    numBtn.addEventListener('click',()=>{
        if(display.innerText=='000'){
            display.innerText = '';    
        }
        display.innerText = display.innerText + numBtn.dataset.num;
    });
})