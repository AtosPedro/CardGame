export default class Match {
  constructor(roundsList, listOfPlayers, matchWinner) {
    this.roundsList = roundsList;
    this.listOfPlayers = listOfPlayers;
    this.matchWinner = matchWinner;
  }
}
export class Round {
  constructor(listOfPlayers, winner) {
    this.listOfPlayers = listOfPlayers;
    this.winner = winner;
  }
}
