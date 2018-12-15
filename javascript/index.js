'use strict';


const adminLogin = 'admin';
const adminPassword = 'm4ng0h4ckz';
let message;

let userInput = prompt('Введите логин');

if (!userInput) {
  message = 'Отменено пользователем!';
}

else {

  if (userInput === adminLogin){

    userInput = prompt('Введите пароль');

    if (userInput === adminPassword) {
      message = 'Добро пожаловать!';
    }

    else if (!userInput) {
      message = 'Отменено пользователем!';
    }
  
    else {
      message = 'Доступ запрещен, неверный пароль';
    }

  }

  else {
    message = 'Доступ запрещен, неверный логин';
  }

}

alert(message);