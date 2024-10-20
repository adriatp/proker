import Card from "./card.ts";

export default class Deck {
  cards: Card[];

  constructor() {
    this.cards = [];
    Card.numbers.forEach((n) => {
      Card.suits.forEach((s) => {
        this.cards.push(new Card(n, s));
      });
    });
  }

  is_free_card(card: Card | null): boolean {
    if (!(card instanceof Card)) {
      throw new Error("is_free_card must receive an instance of Card");
    }
    return this.cards.some((deckCard) =>
      deckCard.toString() === card.toString()
    );
  }

  shuffle(): void {
    this.cards.sort(() => 0.5 - Math.random());
  }

  deal_random(): Card {
    if (this.cards.length <= 0) {
      throw new Error("Trying to deal from an empty deck");
    }
    this.shuffle();
    const ret_card = this.cards[0];
    this.cards = this.cards.slice(1);
    return ret_card;
  }

  remove_cards(cards: (Card | null)[]): void {
    cards.forEach((card) => this.remove_card(card));
  }

  remove_card(card: Card | null): void {
    if (!(card instanceof Card)) {
      throw new Error("remove_card must receive only an instance of Card");
    }
    this.cards = this.cards.filter((deckCard) =>
      deckCard.toString() !== card.toString()
    );
  }

  return_cards(cards: (Card | null)[]): void {
    for (let i=0; i<cards.length; i++) {
      if (cards[i] instanceof Card) {
        if (this.is_free_card(cards[i])) {
          this.cards.push(cards[i]);
        }
      }
    }
  }

  copy(): Deck {
    const new_deck = new Deck();
    new_deck.cards = this.cards.map((card) => card.copy());
    return new_deck;
  }

  toString(): string {
    return this.cards.map((card) => card.toString()).join(" ");
  }

  show(): void {
    console.log(this.toString());
  }
}
