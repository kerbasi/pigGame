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
let scores = [0, 0];
let activeScore = 0;

const getRandomDice = () => {
  const randomNum = Math.ceil(Math.random() * 6);
  diceEl.style.visibility = 'visible';
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
      activeScore += randomNum;
      setText(player1CurrentEl, activeScore);
    } else {
      activeScore = 0;
      setText(player1CurrentEl, activeScore);
      switchPlayer();
    }
  } else {
    if (randomNum !== 1) {
      activeScore += randomNum;
      setText(player2CurrentEl, activeScore);
    } else {
      activeScore = 0;
      setText(player2CurrentEl, activeScore);
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (isFirstPlayer) {
    scores[0] += activeScore;
    setText(player1CurrentEl, 0);
    setText(player1TotalEl, scores[0]);
  } else {
    scores[1] += activeScore;
    setText(player2CurrentEl, 0);
    setText(player2TotalEl, scores[1]);
  }
  switchPlayer();
  diceEl.style.visibility = 'hidden';
});

newGameBtn.addEventListener('click', () => {
  activeScore = 0;
  scores = [0, 0];
  setText(player1CurrentEl, 0);
  setText(player1TotalEl, 0);
  setText(player2CurrentEl, 0);
  setText(player2TotalEl, 0);
  if (!isFirstPlayer) {
    switchPlayer();
  }
  diceEl.style.visibility = 'hidden';
});
