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

let activePlayer;
let scores;
let activeScore;
let playing;

const setText = (el, text) => {
  el.textContent = text;
};

const init = () => {
  if (activePlayer === 1) {
    switchPlayer();
  }
  activePlayer = 0;
  scores = [0, 0];
  activeScore = 0;
  playing = true;

  setText(player1CurrentEl, 0);
  setText(player1TotalEl, 0);
  setText(player2CurrentEl, 0);
  setText(player2TotalEl, 0);
  if (document.querySelector(`.player--winner`)) {
    document
      .querySelector(`.player--winner`)
      .classList.remove('player--winner');
  }

  diceEl.style.visibility = 'hidden';
};

init();

const getRandomDice = () => {
  const randomNum = Math.ceil(Math.random() * 6);
  diceEl.style.visibility = 'visible';
  diceEl.src = `dice-${randomNum}.png`;
  return randomNum;
};

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerCards.forEach(playerEl => {
    playerEl.classList.toggle('player-card_active');
  });
};

rollBtn.addEventListener('click', () => {
  if (playing) {
    const randomNum = getRandomDice();
    const currentEl = document.querySelector(
      `.player-card__current-score_player_${activePlayer}`
    );
    if (randomNum !== 1) {
      activeScore += randomNum;
      setText(currentEl, activeScore);
    } else {
      activeScore = 0;
      setText(currentEl, activeScore);
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (playing) {
    const currentEl = document.querySelector(
      `.player-card__current-score_player_${activePlayer}`
    );
    const totalEl = document.querySelector(
      `.player-card__total-score_player_${activePlayer}`
    );

    scores[activePlayer] += activeScore;
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player-card_player_${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    }

    setText(currentEl, 0);
    setText(totalEl, scores[activePlayer]);
    activeScore = 0;
    switchPlayer();
    diceEl.style.visibility = 'hidden';
  }
});

newGameBtn.addEventListener('click', init);
