import Combination from "./combination.ts";
import Deck from "./deck.ts";
import Player from "./player.ts";
import Card from "./card.ts";

export default class Table {
  cards: (Card | null)[];
  deck: Deck;
  players: Player[];

  constructor(n_players: number) {
    this.cards = [null, null, null, null, null];
    this.deck = new Deck();
    this.deck.shuffle();
    this.players = [];
    for (let i = 0; i < n_players; i++) {
      this.players.push(new Player(`Player ${i + 1}`));
    }
  }

  deal_to_player(player: Player, cards: (Card | null)[]): void {
    if (cards.length > 2) throw new Error("Players can only take 2 cards");
    if (cards.length < 1) throw new Error("Must deal at least 1 card");

    cards.forEach((c) => {
      if (!this.deck.is_free_card(c)) {
        throw new Error("Trying to deal a taken card");
      }
    });

    this.deck.remove_cards(cards);
    if (cards.length === 1) cards = [cards[0], null];
    player.cards = cards;
  }

  deal_to_table(cards: (Card | null)[]): void {
    if (cards.length > 5) throw new Error("Table can only take 5 cards");
    if (cards.length < 1) throw new Error("Must deal at least 1 card");

    cards.forEach((c) => {
      if (!this.deck.is_free_card(c)) {
        throw new Error("Trying to deal a taken card");
      }
    });

    this.deck.remove_cards(cards);
    for (let i = cards.length; i < 5; i++) {
      cards.push(null);
    }
    this.cards = [...cards];
  }

  full_deal_random(): void {
    // deal players
    this.players.forEach((p) => {
      for (let i = 0; i < 2; i++) {
        if (p.cards[i] == null) {
          p.cards[i] = this.deck.deal_random();
        }
      }
    });
    // deal table
    for (let i = 0; i < 5; i++) {
      if (this.cards[i] == null) {
        this.cards[i] = this.deck.deal_random();
      }
    }
  }

  player_hands(): void {
    const valid_table_cards: Card[] = this.cards as Card[];
    this.players.forEach((p) => {
      const valid_player_cards: Card[] = p.cards as Card[];
      const player_combination = new Combination([
        ...valid_table_cards,
        ...valid_player_cards,
      ]);
      p.hand = player_combination.best_hand;
    });
  }

  winners(): Player[] {
    let winners: Player[] = [];
    this.players.forEach((p) => {
      if (winners.length === 0) {
        winners.push(p);
      } else if (winners[0] && winners[0].hand) {
        const cmp = winners[0].hand.compare_to(p.hand);
        if (cmp === 0) {
          winners.push(p);
        } else if (cmp === -1) {
          winners = [];
          winners.push(p);
        }
      }
    });
    return winners;
  }

  copy(): Table {
    const new_table = new Table(this.players.length);
    new_table.cards = [null, null, null, null, null];
    for (let i = 0; i < 5; i++) {
      if (this.cards[i] != null) new_table.cards[i] = this.cards[i]!.copy();
    }
    new_table.deck = this.deck.copy();
    new_table.deck.shuffle();
    new_table.players = [];
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i] != null) {
        new_table.players.push(this.players[i].copy());
      }
    }
    return new_table;
  }

  show(): void {
    let table_cards = " Table: ";
    for (let i = 0; i < 5; i++) {
      if (this.cards[i] != null) table_cards += this.cards[i]!.toString() + " ";
    }
    console.log(table_cards);
    for (let i = 0; i < this.players.length; i++) {
      let player_cards = `    p${i}: `;
      for (let j = 0; j < 2; j++) {
        if (this.players[i].cards[j] != null) {
          player_cards += this.players[i].cards[j]!.toString() + " ";
        }
      }
      console.log(player_cards);
    }
  }
}
