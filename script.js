let operandLeft = 0;
let operandRight = 0;
let operation = '';
let newOperand = false;
let expression = [];

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

function makeExpression(e){
    console.log(e)
    let currentOperand = Number.parseInt(display.innerText);
    let currentOperator = '';
    switch(e.srcElement.dataset.operator){
        case '+': currentOperator = '+'; break;
        case '-': currentOperator = '-'; break;
        case '*': currentOperator = '*'; break;
        case '/': currentOperator = '/'; break;
    }
    expression.push(currentOperand);
    expression.push(currentOperator);
    newOperand = true;
    display.innerText = '';
}

let numBtns = document.querySelectorAll('.num-btn');
const display = document.querySelector('#display');

numBtns.forEach(numBtn=>{
    numBtn.addEventListener('click',()=>{
        if(display.innerText=='000' || newOperand){
            display.innerText = '';    
        }
        display.innerText = display.innerText + numBtn.dataset.num;
    });
})

let oprBtns = document.querySelectorAll('.opr-btn');

oprBtns.forEach(opr=>{
    if(opr.dataset.operator != 'IGNR'){
        opr.addEventListener('click',makeExpression)   
    }
})