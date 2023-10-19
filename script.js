let operandLeft = 0;
let operandRight = 0;
let operation = '';
let newOperand = true;
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
    let currentOperand = Number.parseInt(display.innerText);
    let currentOperator = '';
    switch(e.srcElement.dataset.operator){
        case '+': currentOperator = '+'; break;
        case '-': currentOperator = '-'; break;
        case '*': currentOperator = '*'; break;
        case '/': currentOperator = '/'; break;
    }
    if(!newOperand){
        if(expression[expression.length-1]==0){
            expression.pop()
        }
        expression.push(currentOperand);
        expression.push(currentOperator);
        newOperand = true;
        display.innerText = '';
    }
}

function cleanExpression(){
    let expressionLength = expression.length;
    switch(expression[expressionLength-1]){
        case '/':
        case '*': 
            if(display.innerText != ''){
                expression.push(Number.parseInt(display.innerText));
                display.innerText = '';
            }else{
                expression.push(1);
            }
            break;
        case '+':
        case '-': if(display.innerText != ''){
            expression.push(Number.parseInt(display.innerText));
            display.innerText = '';
        }else{
            expression.push(0);
        }
    }
}

function evaluateExpression(){
    cleanExpression();
    solveExpression();
    display.innerText = expression[0];
}

function solveExpression(){
    // 6+3*4/2-1+10*2-5=26
    let currentOperators = ['*','/','-','+']; //DO NOT CHANGE THE ORDER OF OPERATORS
    
    currentOperators.forEach(currentOperator=>{
        for(let i = 0; i<expression.length; i++){
            let result = 0;
            if(expression[i]==currentOperator){
                result = operate(currentOperator,expression[i-1],expression[i+1]);
                expression.splice(i-1,3,result);
                i=-1;
            }
        }
    })
}

let numBtns = document.querySelectorAll('.num-btn');
const display = document.querySelector('#display');

numBtns.forEach(numBtn=>{
    numBtn.addEventListener('click',()=>{
        if(newOperand){
            newOperand = false;
            if(display.innerText=='000'){
                display.innerText = '';
            }
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


let eql = document.querySelector('#eql');
eql.addEventListener('click',evaluateExpression)