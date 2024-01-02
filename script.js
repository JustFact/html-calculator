let newOperand = true;
let expression = [];
let divideByZero = false;

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
    if(num2==0){
        divideByZero = true;
        return num1;
    }else{
        return num1/num2
    }
}

// function operate(opr, operand1, operand2){
//     let result = 0;
//     switch(opr){
//         case '+': result = add(operand1,operand2);
//         break;
//         case '-': result = subtract(operand1,operand2);
//         break;
//         case '*': result = multiply(operand1,operand2);
//         break;
//         case '/': result = divide(operand1,operand2);
//         break;
//     }
//     return result;
// }

// function makeExpression(e){
//     let currentOperand = Number.parseInt(display.innerText);
//     let currentOperator = '';
//     switch(e.srcElement.dataset.operator){
//         case '+': currentOperator = '+'; break;
//         case '-': currentOperator = '-'; break;
//         case '*': currentOperator = '*'; break;
//         case '/': currentOperator = '/'; break;
//     }
//     if(!newOperand){
//         if(expression[expression.length-1]==0){
//             expression.pop()
//         }
//         expression.push(currentOperand);
//         expression.push(currentOperator);
//         newOperand = true;
//         display.innerText = '';
//     }
// }

// function cleanExpression(){
//     switch(expression[expression.length-1]){
//         case '/':
//         case '*': 
//             if(display.innerText != ''){
//                 expression.push(Number.parseInt(display.innerText));
//                 display.innerText = '';
//             }else{
//                 expression.push(1);
//             }
//             break;
//         case '+':
//         case '-': if(display.innerText != ''){
//             expression.push(Number.parseInt(display.innerText));
//             display.innerText = '';
//         }else{
//             expression.push(0);
//         }
//     }
// }

// function solveExpression(){
//     // 6+3*4/2-1+10*2-5=26
//     let currentOperators = ['*','/','-','+']; //DO NOT CHANGE THE ORDER OF OPERATORS
    
//     currentOperators.forEach(currentOperator=>{
//         for(let i = 0; i<expression.length; i++){
//             let result = 0;
//             if(expression[i]==currentOperator){
//                 result = operate(currentOperator,expression[i-1],expression[i+1]);
//                 expression.splice(i-1,3,result);
//                 i=-1;
//             }
//         }
//     })
// }

// function evaluateExpression(){
//     cleanExpression();
//     solveExpression();
//     display.innerText = expression[0];
//     expression = []
// }

function operate(e){
    let expressionLength = expression.length;

    if(expressionLength==0){ //initial expression
        expression.push(Number.parseInt(display.innerText));
        expression.push(e.srcElement.dataset.operator);
    }else if(expressionLength==1){ //previous expression is solved and stored
        expression.push(e.srcElement.dataset.operator);    
        // solve();
    }else if(expressionLength==2){
        solve();
        expression.push(e.srcElement.dataset.operator);
    }
    newOperand = true;
}
/*
operand
operator
equal

operand,operand,operand, - type multi digit operand [working]
operator,operator,operator, - Nothing [the divide operator shows NaN]
equal,equal,equal, - Nothing [the equal shows 'undefined']
operand, operator, operator - use same operand and calculate and save the result [working]
operand, operator, equal - use same operand and calculate [working]
operand operator, operand - calculate and save the result for next expression
operand, operator, equal, equal - calculate and show result and do nothing [result is recalculated]
12 + 7 - 5 * 3 = 42
*/


function solve(){
    let op2,opr,op1,result;
    let expressionLength = expression.length;
    if(expressionLength==0 || expressionLength==1){
        return;
    }else{   
        op2 = Number.parseInt(display.innerText);
        opr = expression.pop();
        op1 = expression.pop();
    }

    switch(opr){
        case '+': result = add(op1,op2);
        break;
        case '-': result = subtract(op1,op2);
        break;
        case '*': result = multiply(op1,op2);
        break;
        case '/': result = divide(op1,op2);
        break;
    }
    if(!divideByZero){
        display.innerText = result;
        expression.push(result);
    }else{
        expression.push(result);
        alert('NOOO! **Cries in infinity**');
        divideByZero = false;
    }
}

let numBtns = document.querySelectorAll('.num-btn');
let oprBtns = document.querySelectorAll('.opr-btn');
let eql = document.querySelector('#eql');
const display = document.querySelector('#display');

numBtns.forEach(numBtn=>{
    numBtn.addEventListener('click',()=>{
        if(newOperand){
            display.innerText = ''
            newOperand = false;
        }
        display.innerText = display.innerText + numBtn.dataset.num;
    });
})

oprBtns.forEach(opr=>{
    if(opr.dataset.operator != 'IGNR'){
        opr.addEventListener('click',operate)   
    }
})

eql.addEventListener('click',solve)
