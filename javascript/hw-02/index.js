"use strict";

let userInput = 0;
const numbers = [];
let total = 0;

do {
  userInput = prompt("Введите число");

  if (userInput === null) break;

  if (userInput != Number(userInput)) {
    alert("Было введено не число, попробуйте еще раз");
  } else {
    numbers.push(userInput);
  }
  
} while (userInput !== null);

for (let number of numbers) {
  if (numbers.length > 0) {
    total += Number(number);
  }
}

alert("Общая сумма чисел равна " + total);
