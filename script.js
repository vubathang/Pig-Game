'use strict'
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
const score0 = document.getElementById('score--0')
const score1 = document.getElementById('score--1')
const current_score0 = document.querySelector('#current--0')
const current_score1 = document.querySelector('#current--1')
const dice = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

const scores = [0, 0]
let activePlayer = 0
let current_score = 0
let playing = true

const init = function() {
  playing = true
  dice.classList.add('hidden')
  score0.textContent = 0
  score1.textContent = 0
  player0.classList.remove('player--winner')
  player1.classList.remove('player--winner')
  activePlayer = 0
  player0.classList.add('player--active')
  player1.classList.remove('player--active')
  current_score0.textContent = 0
  current_score1.textContent = 0
}
init()

const changePlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  current_score = 0
  player0.classList.toggle('player--active')
  player1.classList.toggle('player--active')
}

const updateScore = function() {
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
}

const checkWinner = function() {
  if (scores[activePlayer] >= 100) {
    playing = false
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
    dice.classList.add('hidden')
  }
}

btnRoll.addEventListener('click', function() {
  if (playing) {
    const diceRandom = Math.trunc(Math.random() * 6) + 1
    dice.classList.remove('hidden')
    dice.src = `dice-${diceRandom}.png`
    if (diceRandom !== 1) {
      current_score += diceRandom
      document.getElementById(`current--${activePlayer}`).textContent = current_score
    }
    else {
      changePlayer()
    }
  }
})

btnHold.addEventListener('click', function() {
  if (playing) {
    scores[activePlayer] += current_score
    updateScore()
    checkWinner()
    changePlayer()
  }
})

btnNew.addEventListener('click', init)