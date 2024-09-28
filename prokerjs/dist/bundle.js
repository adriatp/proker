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
    show() {
      this.cards.forEach((c) => {
        c.show();
      });
    }
    shuffle() {
      this.cards.sort(() => 0.5 - Math.random());
    }
    deal_n_cards(n_cards) {
      let ret_cards = this.cards.slice(0, n_cards);
      this.cards = this.cards.slice(n_cards, this.cards.length);
      return ret_cards;
    }
    deal_card(card) {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i] == card) {
          let ret_card = this.cards[i];
          this.cards.splice(i, 1);
          return ret_card;
        }
      }
      return null;
    }
  };

  // src/player.js
  var Player = class {
    constructor() {
      this.cards = [null, null];
    }
    show() {
      this.cards.forEach((c) => {
        c.show();
      });
    }
  };

  // src/table.js
  var Table = class {
    constructor() {
      this.cards = [null, null, null, null, null];
    }
    show() {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i] !== null) {
          this.cards[i].show();
        }
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

  // src/hand.js
  var Hand = class {
    constructor(cards) {
      if (cards.length != 5)
        throw new Error("Hand must have 5 cards");
      this.cards = cards;
      this.rank = get_rank();
      this.cards = sort_cards();
    }
    get_rank() {
      if (is_straight_flush()) this.rank = 8;
      else if (is_quads()) this.rank = 7;
      else if (is_full()) this.rank = 6;
      else if (is_flush()) this.rank = 5;
      else if (is_straight()) this.rank = 4;
      else if (is_trips()) this.rank = 3;
      else if (is_two_pair()) this.rank = 2;
      else if (is_one_pair()) this.rank = 1;
      else if (is_high_card()) this.rank = 0;
    }
    sort_cards() {
      let cards = [...this.cards];
      cards.sort();
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
          if (this.cards[i] > other.cards[i]) return 1;
          else if (this.cards[i] < other.cards[i]) return -1;
        }
        return 0;
      }
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
