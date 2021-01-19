export default class Player {
  constructor(name = "player", pontuation = 0, cards = []) {
    this.name = name;
    this.pontuation = pontuation;
    this.cards = cards;
  }
}

export function tryLie() {
  let chance = Math.random();

  if (chance < 0.3) {
    return true;
  } else {
    return false;
  }
}

export function lieResult(input, player, enimes) {
  if (input) {
    player.pontuation++;
  } else {
    enimes[0].pontuation++;
    enimes[1].pontuation++;
  }
}
