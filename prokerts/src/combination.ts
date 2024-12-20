import Hand from "./hand.ts";
import Card from "./card.ts";

export default class Combination {
  cards: (Card)[];
  hands: Hand[];
  best_hand: Hand;

  constructor(cards: (Card)[]) {
    if (cards.length !== 7) {
      throw new Error("Combination must have 7 cards");
    }
    this.cards = cards;
    this.hands = this.generateHands();
    this.best_hand = this.getBestHand();
  }

  private generateHands(): Hand[] {
    const hands: Hand[] = [];
    for (let i = 0; i < 7; i++) {
      for (let j = i + 1; j < 7; j++) {
        for (let k = j + 1; k < 7; k++) {
          for (let l = k + 1; l < 7; l++) {
            for (let m = l + 1; m < 7; m++) {
              hands.push(
                new Hand([
                  this.cards[i],
                  this.cards[j],
                  this.cards[k],
                  this.cards[l],
                  this.cards[m],
                ]),
              );
            }
          }
        }
      }
    }
    return hands;
  }

  private getBestHand(): Hand {
    let best_hand = this.hands[0];
    for (let i = 1; i < this.hands.length; i++) {
      if (best_hand.compare_to(this.hands[i]) === -1) {
        best_hand = this.hands[i];
      }
    }
    return best_hand;
  }
}
