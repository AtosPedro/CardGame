// Imports

import Deck from "../models/Deck.js";
import { giveCards } from "../models/Deck.js";
import { remadeDeck } from "../models/Deck.js";
import { createDeck } from "../models/Deck.js";
import Player from "../models/Player.js";
import { tryLie } from "../models/Player.js";
import { lieResult } from "../models/Player.js";

import Match from "../models/Match.js";
import { Round } from "../models/Match.js";

// ob variables

var deck = new Deck();

var player1Obj = new Player();
var player2Obj = new Player();
var player3Obj = new Player();
var match = new Match();
match.roundsList = [];

// dom variables

var player1Div = document.getElementById("player-1D");
var player2Div = document.getElementById("player-2D");
var player3Div = document.getElementById("player-3D");
var infoDiv = document.getElementById("infoDiv");

// defining the player and computer names

player1Obj.name = "player1";
player2Obj.name = "player2";
player3Obj.name = "player3";

// adding them to the list of players of the match

match.listOfPlayers = [player1Obj, player2Obj, player3Obj];

// defining the button to make the rounds

const button = document.getElementById("showCards");

button.onclick = function matchManager() {
  // clear the player dom divs
  button.innerHTML = "Next Round";
  player1Div.innerHTML = "";
  player2Div.innerHTML = "";
  player3Div.innerHTML = "";

  // create a new round with the winner of that round
  match.roundsList.push(new Round(match.listOfPlayers, startMatch()));
  // when reach the round 12 shows the winner and refresh the page
  if (match.roundsList.length == 12) {
    let win;

    win = match.listOfPlayers.reduce(function (a, b) {
      if (typeof a != "number") {
        var c = a.pontuation;
      } else {
        var c = a;
      }
      var d = b.pontuation;
      return Math.max(c, d);
    });

    match.matchWinner = match.listOfPlayers.reduce(function (a, b) {
      if (a.pontuation == win) {
        return a;
      } else {
        return b;
      }
    });

    button.disabled = true;

    setTimeout(function () {
      alert("The winner of the match is " + match.matchWinner.name);
      location.reload();
    }, 5000);
  }
  infoDiv.innerHTML = `<p><strong>${player1Obj.name}</strong>Vanquished Rounds: ${player1Obj.pontuation}</p> <p><strong>${player2Obj.name}</strong> Vanquished Rounds: ${player2Obj.pontuation}</p> <p><strong>${player3Obj.name}</strong> Vanquished Rounds: ${player3Obj.pontuation}</p>`;
};

function startMatch() {
  player1Obj.cards = giveCards(deck.cards);
  deck = remadeDeck(deck, player1Obj.cards);
  player2Obj.cards = giveCards(deck.cards);
  deck = remadeDeck(deck, player2Obj.cards);
  player3Obj.cards = giveCards(deck.cards);
  deck = remadeDeck(deck, player3Obj.cards);

  drawCards(player1Div, player1Obj);
  drawCards(player2Div, player2Obj);
  drawCards(player3Div, player3Obj);

  let roundResult = countPoints(player1Obj, player2Obj, player3Obj);

  let winner = roundResult.indexOf(
    roundResult.reduce(function (a, b) {
      return Math.max(a, b);
    })
  );

  deck.cards = createDeck();

  switch (winner) {
    case 0:
      setTimeout(() => {
        alert("the winner of this round is " + player1Obj.name);
      }, 1000);
      player1Obj.pontuation++;
      return player1Obj;
    case 1:
      setTimeout(() => {
        alert("the winner of this round is " + player2Obj.name);
      }, 1000);
      player2Obj.pontuation++;
      return player2Obj;
    case 2:
      setTimeout(() => {
        alert("the winner of this round is " + player3Obj.name);
      }, 1000);
      player3Obj.pontuation++;
      return player3Obj;
  }
}
function countPoints(p1, p2, p3) {
  let pts = [0, 0, 0];
  for (let index = 0; index < p1.cards.length; index++) {
    pts[0] += Number(p1.cards[index].points);
    pts[1] += Number(p2.cards[index].points);
    pts[2] += Number(p3.cards[index].points);
  }

  return pts;
}
function drawCards(playerDiv, playerObj) {
  playerObj.cards.forEach(function (card) {

    playerDiv.innerHTML += `<div class="cardElement"><p>${card.name} ${card.suits}</p> <span>${card.suits}</span><p>Points: ${card.points}</p></div>`;
    
  });
}
