const suits = ["♣", "♦", "♥", "♠"];
const cardValue = ["2", "3", "4", "5", "6", "7", "A", "J", "Q", "K"];

export default class Deck {
  constructor(cards = createDeck()) {
    this.cards = cards;
  }
}
export class Card {
  constructor(suits, name, points) {
    this.name = name;
    this.points = points;
    this.suits = suits;
  }
}

// função responsável por popular o Deck de cartas, com os objetos de cartas certos
export function createDeck() {
  let listOfCards = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < cardValue.length; j++) {
      switch (cardValue[j]) {
        case "2":
          listOfCards.push(new Card(suits[i], cardValue[j], 8));
          break;
        case "3":
          listOfCards.push(new Card(suits[i], cardValue[j], 9));
          break;
        case "4":
          listOfCards.push(new Card(suits[i], cardValue[j], 0));
          break;
        case "5":
          listOfCards.push(new Card(suits[i], cardValue[j], 1));
          break;
        case "6":
          listOfCards.push(new Card(suits[i], cardValue[j], 2));
          break;
        case "7":
          listOfCards.push(new Card(suits[i], cardValue[j], 3));
          break;
        case "A":
          listOfCards.push(new Card(suits[i], cardValue[j], 7));
          break;
        case "K":
          listOfCards.push(new Card(suits[i], cardValue[j], 6));
          break;
        case "J":
          listOfCards.push(new Card(suits[i], cardValue[j], 5));
          break;
        case "Q":
          listOfCards.push(new Card(suits[i], cardValue[j], 4));
          break;
      }
    }
  }

  return listOfCards;
}

// retorna uma lista de 3 cartas aleatórias do baralho
export function giveCards(listOfCards) {
  let card = [];

  while (card.length < 3) {
    let randomIndex = Math.floor(Math.random() * listOfCards.length);

    if (!card.includes(listOfCards[randomIndex])) {
      card.push(listOfCards[randomIndex]);
    }
  }

  return card;
}
// refaz o deck depois da função giveCards
export function remadeDeck(deckp, cardp) {
  let newDeck = new Deck();
  newDeck.cards = deckp.cards.filter((x) => !cardp.includes(x));
  return newDeck;
}
