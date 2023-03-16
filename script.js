'use strict';
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn_type_roll');
const holdBtn = document.querySelector('.btn_type_hold');
const newGameBtn = document.querySelector('.btn_type_new-game');
const playerCards = document.querySelectorAll('.player-card');
const player1CurrentEl = playerCards[0].querySelector(
  '.player-card__current-score'
);
const player1TotalEl = playerCards[0].querySelector(
  '.player-card__total-score'
);
const player2CurrentEl = playerCards[1].querySelector(
  '.player-card__current-score'
);
const player2TotalEl = playerCards[1].querySelector(
  '.player-card__total-score'
);

let isFirstPlayer = true;
let player1Total = 0;
let player1Current = 0;
let player2Total = 0;
let player2Current = 0;

const getRandomDice = () => {
  const randomNum = Math.ceil(Math.random() * 6);
  diceEl.src = `dice-${randomNum}.png`;
  return randomNum;
};

const switchPlayer = () => {
  isFirstPlayer = !isFirstPlayer;
  playerCards.forEach(playerEl => {
    playerEl.classList.toggle('player-card_active');
  });
};

const setText = (el, text) => {
  el.textContent = text;
};

rollBtn.addEventListener('click', () => {
  const randomNum = getRandomDice();
  if (isFirstPlayer) {
    if (randomNum !== 1) {
      player1Current += randomNum;
      setText(player1CurrentEl, player1Current);
    } else {
      player1Current = 0;
      setText(player1CurrentEl, player1Current);
      switchPlayer();
    }
  } else {
    if (randomNum !== 1) {
      player2Current += randomNum;
      setText(player2CurrentEl, player2Current);
    } else {
      player2Current = 0;
      setText(player2CurrentEl, player2Current);
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (isFirstPlayer) {
    player1Total += player1Current;
    setText(player1CurrentEl, 0);
    setText(player1TotalEl, player1Total);
  } else {
    player2Total += player2Current;
    setText(player2CurrentEl, 0);
    setText(player2TotalEl, player2Total);
  }
  switchPlayer();
});

newGameBtn.addEventListener('click', () => {
  player1Current = 0;
  player1Total = 0;
  player2Current = 0;
  player2Total = 0;
  setText(player1CurrentEl, player1Current);
  setText(player1TotalEl, player1Total);
  setText(player2CurrentEl, player2Current);
  setText(player2TotalEl, player2Total);
  if (!isFirstPlayer) {
    switchPlayer();
  }
});
