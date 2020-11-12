/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, recentDice, activePlayer, gamePlaying, targetScore;

init();

// document.querySelector("#current-" + activePlayer).innerHTML =
//   "<em>" + dice + "</em>";

document.querySelector(".btn-roll").addEventListener("click", function (e) {
  if (gamePlaying) {
    //random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //display the result
    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "dice-" + dice + ".png";

    //update score
    if (dice === 1) {
      //next player
      nextPlayer();
    } else {
      //add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      if (dice === 6) {
        recentDice.push(dice);
        if (recentDice.length === 2) {
          scores[activePlayer] = 0;
          document.getElementById("score-0").textContent = "0";
          recentDice = [];
          nextPlayer();
        }
      }
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function (e) {
  if (gamePlaying) {
    //add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    roundScore = 0;
    //update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    //check who wins
    targetScore = document.getElementById("target").nodeValue;
    if (!targetScore) {
      alert("请输入目标分数");
      return;
    }
    if (scores[activePlayer] >= targetScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("winner");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

//init不要调用
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  recentDice = [];
  targetScore = 0;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove = "winner";
  document.querySelector(".player-1-panel").classList.remove = "winner";
  document.querySelector(".player-1-panel").classList.remove = "active";
  document.querySelector(".player-0-panel").classList.add = "active";
}

function nextPlayer() {
  activePlayer = activePlayer === 1 ? 0 : 1;
  roundScore = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}
