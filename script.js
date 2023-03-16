'use strict';
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn_type_roll');

const getRandomDice = () => {
  const randomNum = Math.ceil(Math.random() * 6);
  diceEl.src = `dice-${randomNum}.png`;
};

rollBtn.addEventListener('click', getRandomDice);
