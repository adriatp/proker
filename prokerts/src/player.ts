import Card from "./card.ts";
import Hand from "./hand.ts";

export default class Player {
  name: string;
  cards: (Card | null)[];
  hand: Hand | null;
  wins: number;
  loses: number;
  draws: number;

  constructor(name: string) {
    this.name = name;
    this.cards = [null, null];
    this.hand = null;
    this.wins = 0;
    this.loses = 0;
    this.draws = 0;
  }

  copy(): Player {
    const new_player = new Player(this.name);
    new_player.wins = this.wins;
    new_player.loses = this.loses;
    new_player.draws = this.draws;
    new_player.cards = [null, null];

    for (let i = 0; i < 2; i++) {
      if (this.cards != null && this.cards[i] != null) {
        new_player.cards[i] = this.cards[i]!.copy();
      }
    }

    if (this.hand != null) {
      new_player.hand = this.hand.copy();
    }

    return new_player;
  }

  show(): void {
    console.log(`${this.cards[0]?.toString()} ${this.cards[1]?.toString()}`);
  }

  toString(): string {
    return this.name;
  }
}
