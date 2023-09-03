let score = JSON.parse(localStorage.getItem ('score')) || {
  wins : 0,
  losses : 0,
  ties : 0
};

updateScoreElement();

function updateScoreElement() {
  document.querySelector ('.js-score')
  .innerHTML = `Wins : ${score.wins} , Losses : ${score.losses}, Ties : ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay () {

  const buttonElement = document.querySelector('.js-autoplay-button');

  if (!isAutoPlaying) {

    buttonElement.innerText = 'Auto Playing...';
    intervalId = setInterval ( () => {
      const playerMove = pickComputerMove ();
      playGame (playerMove);
    } , 2000);
    isAutoPlaying = true;
    buttonElement.classList.add('is-autoPlaying');      
  } else {
    buttonElement.innerText = 'Auto Play';
    clearInterval (intervalId);
    isAutoPlaying = false;
    buttonElement.classList.remove('is-autoPlaying');    
  }
  
}

document.querySelector ('.js-rock-button')
  .addEventListener ('click' , () => {
  playGame ('Rock');
})
document.querySelector ('.js-paper-button')
  .addEventListener ('click' , () => {
  playGame ('Paper');
})
document.querySelector ('.js-scissors-button')
  .addEventListener ('click' , () => {
  playGame ('Scissors');
})
//---------------------------------------------------------
document.querySelector ('.js-reset-button')
    .addEventListener ('click' , () => {
      score.wins = 0;
      score.losses = 0;
      score.ties =0;
      localStorage.removeItem('score');
      updateScoreElement();
  })
document.querySelector ('.js-autoplay-button')
  .addEventListener ('click' , () => {
  autoPlay();
})
//---------------------------------------------------------
document.body.addEventListener ('keydown' , (event) => {
    if (event.key === 'r' || event.key ==='R') {
      playGame ('Rock');
    } else if (event.key === 'p' || event.key ==='P') {
      playGame ('Paper');
    } else if (event.key === 's' || event.key ==='S') {
      playGame ('Scissors');
    }
})


function playGame (playerMove) {
  computerMove =pickComputerMove();
  let result = '';
  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
  result = 'You Lose.';
  score.losses ++;
  } else if (computerMove === 'Paper') {
  result = 'You Win.';
  score.wins ++;
  } else if (computerMove === 'Scissors') {
  result = 'Tie.'
  score.ties ++;
  }
  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
  result = 'You Win.';
  score.wins++;
  } else if (computerMove === 'Paper') {
  result = 'Tie.';
  score.ties++;
  } else if (computerMove === 'Scissors') {
  result = 'You Lose.'
  score.losses ++;
  }
  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
  result = 'Tie.';
  score.ties ++;
  } else if (computerMove === 'Paper') {
  result = 'You Lose.';
  score.losses ++;
  } else if (computerMove === 'Scissors') {
  result = 'You Win.'
  score.wins ++;
  }
  }

  localStorage.setItem ('score', JSON.stringify(score));

  document.querySelector ('.js-result').innerHTML = result;
  document.querySelector ('.js-move').innerHTML = 
  `You 
  <img src="Images/${playerMove}-emoji.png" class="move-icon">
  <img src="Images/${computerMove}-emoji.png" class="move-icon">
  Computer`;

  updateScoreElement();

}

function pickComputerMove() {
  const randomNumber = Math.random ();
  let computerMove = '';
  if (randomNumber>= 0 && randomNumber < 1/3) {
  computerMove = 'Rock';
  } else if (randomNumber>= 1/3 && randomNumber < 2/3) {
  computerMove = 'Paper';
  } else if (randomNumber>= 2/3) {
  computerMove = 'Scissors';
  }
  return computerMove;
}