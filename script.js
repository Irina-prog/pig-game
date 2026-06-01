'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0DomEl = document.querySelector('#score--0');
const score1DomEl = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');

const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

// declaring variables
let scoresTotal, currentScore, activePlayer, playing;

// starting condition

const initialization = function () {
  // assigning variables
  scoresTotal = [0, 0];
  current0El.textContent = 0;
  current1El.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  playing = true; // state variable

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0DomEl.textContent = 0;
  score1DomEl.textContent = 0;
  diceEl.classList.add('hidden');
};
initialization();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality

buttonRoll.addEventListener('click', function () {
  if (playing) {
    // 1 - generate random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. - display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3 - check for rolled 1 :
    if (dice !== 1) {
      // add dice to a current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if true switch to a new player
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (playing) {
    // 1.add current score to the global score of active player
    scoresTotal[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scoresTotal[activePlayer];
    // check if score >=100. if yes - finish the game
    if (scoresTotal[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // 3 switch active player
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', initialization);
