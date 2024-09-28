(() => {
  // src/card.js
  var Card = class _Card {
    static numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
    static suits = ["S", "H", "C", "D"];
    static _rep_suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
    constructor(number, suite) {
      let _tmpNumber = number.toUpperCase();
      if (!_Card.numbers.includes(_tmpNumber))
        throw new Error("Number is not correct (must be in ['2','3','4','5','6','7','8','9','T','J','Q','K','A'])");
      let _tmpSuite = suite.toUpperCase();
      if (!_Card.suits.includes(_tmpSuite))
        throw new Error("Suite must be 'S' (Spades), 'H' (Hearts), 'C' (Corbles) or 'D' (Diamonds)");
      this.suite = _Card.suits.indexOf(_tmpSuite);
      this.number = _Card.numbers.indexOf(_tmpNumber);
    }
    show() {
      console.log(_Card.numbers[this.number] + _Card._rep_suits[this.suite]);
    }
    toString() {
      return _Card.numbers[this.number] + _Card._rep_suits[this.suite];
    }
  };

  // src/deck.js
  var Deck = class {
    constructor() {
      this.cards = new Array();
      Card.numbers.forEach((n) => {
        Card.suits.forEach((s) => {
          this.cards.push(new Card(n, s));
        });
      });
    }
    is_free_card(card) {
      this.cards.forEach((c) => {
        if (c == card) return false;
      });
      return true;
    }
    show() {
      this.cards.forEach((c) => {
        c.show();
      });
    }
    shuffle() {
      this.cards.sort(() => 0.5 - Math.random());
    }
    deal_random() {
      if (this.cards <= 0)
        throw "Trying to deal from an empty deck";
      this.shuffle();
      let ret_card = this.cards[0];
      this.cards = this.cards.slice(1);
      return ret_card;
    }
    remove_cards(cards) {
      cards.forEach((c) => {
        this.remove_card(c);
      });
    }
    remove_card(card) {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i] == card) {
          this.cards.splice(i, 1);
        }
      }
    }
  };

  // src/player.js
  var Player = class {
    constructor() {
      this.cards = [null, null];
      this.hand = null;
    }
    show() {
      console.log(`${this.cards[0].toString()} ${this.cards[1].toString()}`);
    }
    show_hand() {
      let hand = "";
      for (let i = 0; i < this.hand.length; i++) {
        hand += this.hand[i].toString() + " ";
      }
      console.log(hand);
    }
  };

  // src/hand.js
  var Hand = class {
    constructor(cards) {
      if (cards === null || cards === void 0 || cards.length != 5)
        throw new Error("Hand must have 5 cards");
      this.cards = cards;
      this.rank = this.get_rank();
      this.cards = this.sort_numbers_by_rank();
    }
    get_rank() {
      this.cards.sort();
      if (this.is_straight_flush()) this.rank = 8;
      else if (this.is_quads()) this.rank = 7;
      else if (this.is_full()) this.rank = 6;
      else if (this.is_flush()) this.rank = 5;
      else if (this.is_straight()) this.rank = 4;
      else if (this.is_trips()) this.rank = 3;
      else if (this.is_two_pair()) this.rank = 2;
      else if (this.is_one_pair()) this.rank = 1;
      else if (this.is_high_card()) this.rank = 0;
    }
    is_straight_flush() {
      return this.is_flush() && this.is_straight();
    }
    is_quads() {
      return this.cards[0].number == this.cards[3].number || this.cards[1].number == this.cards[4].number;
    }
    is_full() {
      return this.cards[0].number == this.cards[2].number && this.cards[3].number == this.cards[4].number || this.cards[0].number == this.cards[1].number && this.cards[2].number == this.cards[4].number;
    }
    is_flush() {
      for (let i = 0; i < 4; i++)
        if (this.cards[i].suite != this.cards[i + 1].suite) return false;
      return true;
    }
    is_straight() {
      for (let i = 0; i < 4; i++) {
        if (this.cards[i].number + 1 != this.cards[i + 1].number) return false;
      }
      return true;
    }
    is_trips() {
      for (let i = 0; i < 3; i++) {
        if (this.cards[i].number == this.cards[i + 2].number)
          return true;
      }
    }
    is_two_pair() {
      return this.cards[0].number == this.cards[1].number && this.cards[2].number == this.cards[3].number || this.cards[0].number == this.cards[1].number && this.cards[3].number == this.cards[4].number || this.cards[1].number == this.cards[2].number && this.cards[3].number == this.cards[4].number;
    }
    is_one_pair() {
      for (let i = 0; i < 4; i++) {
        if (this.cards[i].number == this.cards[i + 1].number)
          return true;
      }
    }
    is_high_card() {
      return true;
    }
    sort_numbers_by_rank() {
      let cards = [...this.cards];
      if (this.rank == 7 && cards[0].number != cards[3].number)
        cards = [...cards.slice(1, 5), cards[0]];
      else if (this.rank == 6 && cards[0].number != cards[2].number)
        cards = [...cards.slice(2, 5), ...cards.slice(0, 2)];
      else if (this.rank == 3) {
        if (cards[1].number == cards[3].number)
          cards = [...cards.slice(1, 4), cards[0], cards[4]];
        else if (cards[2].number == cards[4].number)
          cards = [...cards.slice(2, 5), cards[0], cards[1]];
      } else if (this.rank == 2) {
        if (cards[0].number != cards[1].number)
          cards = [...cards.slice(1, 5), cards[0]];
        else if (cards[2].number != cards[1].number && cards[2].number != cards[3].number)
          cards = [...cards.slice(0, 2), ...cards.slice(3, 5), cards[2]];
      } else if (this.rank == 1) {
        if (cards[1].number == cards[2].number)
          cards = [...cards.slice(1, 3), cards[0], ...cards.slice(3, 5)];
        else if (cards[2].number == cards[3].number)
          cards = [...cards.slice(2, 4), ...cards.slice(0, 2), cards[4]];
        else if (cards[3].number == cards[4].number)
          cards = [...cards.slice(3, 5), ...cards.slice(0, 3)];
      }
      return cards;
    }
    compare_to(other) {
      if (this.rank > other.rank) return 1;
      else if (other.rank < this.rank) return -1;
      else {
        for (let i = 0; i < 5; i++) {
          if (this.cards[i].number > other.cards[i].number) return 1;
          else if (this.cards[i].number < other.cards[i].number) return -1;
        }
        return 0;
      }
    }
  };

  // src/combination.js
  var Combination = class {
    constructor(cards) {
      if (cards.length != 7)
        throw new Error("Combination must have 7 cards");
      this.cards = cards;
      this.hands = this.hands();
      this.best_hand = this.get_best_hand();
    }
    hands() {
      let hands = [];
      for (let i = 0; i < 7; i++) {
        for (let j = i + 1; j < 7; j++) {
          for (let k = j + 1; k < 7; k++) {
            for (let l = k + 1; l < 7; l++) {
              for (let m = l + 1; m < 7; m++) {
                hands.push(new Hand([this.cards[i], this.cards[j], this.cards[k], this.cards[l], this.cards[m]]));
              }
            }
          }
        }
      }
      return hands;
    }
    get_best_hand() {
      let best_hand = this.hands[0];
      for (let i = 1; i < this.hands.length; i++) {
        if (best_hand.compare_to(this.hands[i]) == -1) {
          best_hand = this.hands[i];
        }
      }
      return best_hand;
    }
  };

  // src/table.js
  var Table = class {
    constructor(n_players) {
      this.cards = [null, null, null, null, null];
      this.deck = new Deck();
      this.deck.shuffle();
      this.players = [];
      for (let i = 0; i < n_players; i++)
        this.players.push(new Player());
    }
    deal_to_player(player, cards) {
      if (cards.length > 2)
        throw "Players can only take 2 cards";
      if (cards.length < 1)
        throw "Must deal at least 1 card";
      cards.forEach((c) => {
        if (!this.is_free_card(c))
          throw "Trying to deal a taken card";
      });
      this.deck.remove_cards(cards);
      if (cards.length == 1)
        cards = [cards[0], null];
      player.cards = cards;
    }
    deal_to_table(cards) {
      if (cards.length > 5)
        throw "Table can only take 5 cards";
      if (cards.length < 1)
        throw "Must deal at least 1 card";
      cards.forEach((c) => {
        if (!this.is_free_card(c))
          throw "Trying to deal a taken card";
      });
      this.deck.remove_cards(cards);
      for (let i = cards.length; i < 5; i++) {
        cards.push(null);
      }
      this.cards = [...cards];
    }
    full_deal_random() {
      this.players.forEach((p) => {
        for (let i = 0; i < 2; i++) {
          if (p.cards[i] == null) {
            p.cards[i] = this.deck.deal_random();
          }
        }
      });
      for (let i = 0; i < 5; i++) {
        if (this.cards[i] == null) {
          this.cards[i] = this.deck.deal_random();
        }
      }
    }
    is_free_card(card) {
      return this.deck.is_free_card(card);
    }
    player_hands() {
      this.players.forEach((p) => {
        let player_combination = new Combination([...this.cards, ...p.cards]);
        p.hand = player_combination.best_hand;
      });
    }
    show() {
      let table_cards = "Table: ";
      for (let i = 0; i < 5; i++) {
        if (this.cards[i] != null)
          table_cards += this.cards[i].toString() + " ";
      }
      console.log(table_cards);
      for (let i = 0; i < this.players.length; i++) {
        let player_cards = `   p${i}: `;
        for (let j = 0; j < 2; j++) {
          if (this.players[i].cards[j] != null)
            player_cards += this.players[i].cards[j].toString() + " ";
        }
        console.log(player_cards);
      }
    }
  };

  // src/game.js
  var Game = class {
    constructor(n_players) {
      this.deck = new Deck();
      this.table = new Table();
      this.players = [];
      this.deck.shuffle();
      for (let i = 0; i < n_players; i++) {
        this.players.push(new Player());
      }
      for (let i = 0; i < n_players; i++) {
        this.players[i].cards[0] = this.deck.deal_n_cards(1)[0];
      }
      for (let i = 0; i < n_players; i++) {
        this.players[i].cards[1] = this.deck.deal_n_cards(1)[0];
      }
      this.deck.deal_n_cards(1);
      this.table.cards.splice(0, 3, ...this.deck.deal_n_cards(3));
      this.deck.deal_n_cards(1);
      this.table.cards.splice(3, 1, ...this.deck.deal_n_cards(1));
      this.deck.deal_n_cards(1);
      this.table.cards.splice(4, 1, ...this.deck.deal_n_cards(1));
    }
    show() {
      console.log(this.players);
      console.log(this.players.length);
      this.players.forEach((p, i) => {
        console.log("Player " + (i + 1) + ":");
        p.show();
      });
      console.log("   Table:");
      this.table.show();
    }
  };

  // src/index.js
  window.Card = Card;
  window.Deck = Deck;
  window.Game = Game;
  window.Hand = Hand;
  window.Player = Player;
  window.Table = Table;
})();
