(() => {
  // src/card.js
  var Card2 = class _Card {
    static numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
    static suits = ["S", "H", "C", "D"];
    static _rep_suits = ["\u2660", "\u2665", "\u2663", "\u2666"];
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
    copy() {
      return new _Card(_Card.numbers[this.number], _Card.suits[this.suite]);
    }
    static compare(c1, c2, asc = true) {
      const factor = asc ? 1 : -1;
      return (c1.number - c2.number) * factor;
    }
    show() {
      console.log(_Card.numbers[this.number] + _Card._rep_suits[this.suite]);
    }
    toString() {
      return _Card.numbers[this.number] + _Card._rep_suits[this.suite];
    }
  };

  // src/hand.js
  var Hand = class _Hand {
    static ranks = ["HIGH CARD", "ONE PAIR", "TWO PAIR", "TRIPS", "STRAIGHT", "FLUSH", "FULL", "QUADS", "STRAIGHT FLUSH"];
    constructor(cards) {
      if (cards === null || cards === void 0 || cards.length != 5)
        throw new Error("Hand must have 5 cards");
      this.cards = cards;
      this.rank = this.get_rank();
      this.cards = this.sort_numbers_by_rank();
    }
    get_rank() {
      this.cards.sort((a, b) => Card.compare(a, b, false));
      if (this.is_straight_flush()) return 8;
      else if (this.is_quads()) return 7;
      else if (this.is_full()) return 6;
      else if (this.is_flush()) return 5;
      else if (this.is_straight()) return 4;
      else if (this.is_trips()) return 3;
      else if (this.is_two_pair()) return 2;
      else if (this.is_one_pair()) return 1;
      else if (this.is_high_card()) return 0;
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
      if (this.cards[0].number == 12 && this.cards[1].number == 3 && this.cards[2].number == 2 && this.cards[3].number == 1 && this.cards[4].number == 0) {
        this.cards = [...this.cards.slice(1, 5), this.cards[0]];
        return true;
      }
      for (let i = 0; i < 4; i++) {
        if (this.cards[i].number - 1 != this.cards[i + 1].number) return false;
      }
      return true;
    }
    is_trips() {
      for (let i = 0; i < 3; i++) {
        if (this.cards[i].number == this.cards[i + 2].number)
          return true;
      }
      return false;
    }
    is_two_pair() {
      return this.cards[0].number == this.cards[1].number && this.cards[2].number == this.cards[3].number || this.cards[0].number == this.cards[1].number && this.cards[3].number == this.cards[4].number || this.cards[1].number == this.cards[2].number && this.cards[3].number == this.cards[4].number;
    }
    is_one_pair() {
      for (let i = 0; i < 4; i++) {
        if (this.cards[i].number == this.cards[i + 1].number)
          return true;
      }
      return false;
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
      else if (this.rank < other.rank) return -1;
      else {
        for (let i = 0; i < 5; i++) {
          if (this.cards[i].number > other.cards[i].number) return 1;
          else if (this.cards[i].number < other.cards[i].number) return -1;
        }
        return 0;
      }
    }
    copy() {
      let cards = [];
      for (let i = 0; i < this.cards.length; i++)
        cards.push(this.cards[i].copy());
      let new_hand = new _Hand(cards);
      return new_hand;
    }
    toString() {
      let hand_str = "Hand: ";
      for (let i = 0; i < 5; i++) {
        hand_str += this.cards[i].toString() + " ";
      }
      return hand_str + "- " + _Hand.ranks[this.rank];
    }
    show() {
      console.log(this.toString());
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

  // src/deck.js
  var Deck = class _Deck {
    constructor() {
      this.cards = new Array();
      Card2.numbers.forEach((n) => {
        Card2.suits.forEach((s) => {
          this.cards.push(new Card2(n, s));
        });
      });
    }
    is_free_card(card) {
      if (!(card instanceof Card2))
        throw "is_free_card must receive an instance of Card";
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].toString() == card.toString()) return true;
      }
      return false;
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
      if (!(card instanceof Card2))
        throw "remove_card must receive only an instance of Card";
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].toString() == card.toString()) {
          this.cards.splice(i, 1);
        }
      }
    }
    copy() {
      let new_deck = new _Deck();
      new_deck.cards = [];
      this.cards.forEach((c) => {
        new_deck.cards.push(c.copy());
      });
      return new_deck;
    }
    toString() {
      let cards_str = "";
      this.cards.forEach((c) => {
        cards_str += `${c.toString()} `;
      });
      return cards_str;
    }
    show() {
      console.log(this.toString());
    }
  };

  // src/player.js
  var Player = class _Player {
    constructor(name) {
      this.name = name;
      this.cards = [null, null];
      this.hand = null;
      this.wins = 0;
      this.loses = 0;
      this.draws = 0;
    }
    copy() {
      let new_player = new _Player(this.name);
      new_player.wins = this.wins;
      new_player.loses = this.loses;
      new_player.draws = this.draws;
      new_player.cards = [null, null];
      for (let i = 0; i < 2; i++) {
        if (this.cards[i] != null)
          new_player.cards[i] = this.cards[i].copy();
      }
      if (this.hand != null)
        new_player.hand = this.hand.copy();
      return new_player;
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
    toString() {
      return this.name;
    }
  };

  // src/table.js
  var Table = class _Table {
    constructor(n_players) {
      this.cards = [null, null, null, null, null];
      this.deck = new Deck();
      this.deck.shuffle();
      this.players = [];
      for (let i = 0; i < n_players; i++)
        this.players.push(new Player(`Player ${i + 1}`));
    }
    deal_to_player(player, cards) {
      if (cards.length > 2)
        throw "Players can only take 2 cards";
      if (cards.length < 1)
        throw "Must deal at least 1 card";
      cards.forEach((c) => {
        if (!this.deck.is_free_card(c))
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
        if (!this.deck.is_free_card(c))
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
    player_hands() {
      this.players.forEach((p) => {
        let player_combination = new Combination([...this.cards, ...p.cards]);
        p.hand = player_combination.best_hand;
      });
    }
    winners() {
      let winners = [];
      this.players.forEach((p) => {
        if (winners.length == 0) {
          winners.push(p);
        } else {
          let cmp = winners[0].hand.compare_to(p.hand);
          if (cmp == 0)
            winners.push(p);
          else if (cmp == -1) {
            winners = [];
            winners.push(p);
          }
        }
      });
      return winners;
    }
    copy() {
      let new_table = new _Table(this.players.length);
      new_table.cards = [null, null, null, null, null];
      for (let i = 0; i < 5; i++) {
        if (this.cards[i] != null)
          new_table.cards[i] = this.cards[i].copy();
      }
      new_table.deck = this.deck.copy();
      new_table.deck.shuffle();
      new_table.players = [];
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i] != null)
          new_table.players.push(this.players[i].copy());
      }
      return new_table;
    }
    show() {
      let table_cards = " Table: ";
      for (let i = 0; i < 5; i++) {
        if (this.cards[i] != null)
          table_cards += this.cards[i].toString() + " ";
      }
      console.log(table_cards);
      for (let i = 0; i < this.players.length; i++) {
        let player_cards = `    p${i}: `;
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

  // src/proker.js
  var Proker = class {
    constructor(table) {
      this.table = table;
    }
    compute(times) {
      if (times < 1) throw new Error("times must be greater than 0");
      this.reset_stats();
      let aux_table = null;
      for (let i = 0; i < times; i++) {
        aux_table = this.table.copy();
        aux_table.full_deal_random();
        aux_table.player_hands();
        let winners = aux_table.winners();
        this.table.players.forEach((p) => {
          let is_winner = false;
          for (let i2 = 0; i2 < winners.length; i2++) {
            if (p.toString() == winners[i2].toString())
              is_winner = true;
          }
          if (is_winner) {
            if (winners.length == 1) p.wins++;
            else p.draws++;
          } else p.loses++;
        });
      }
    }
    reset_stats() {
      this.table.players.forEach((p) => {
        p.wins = 0;
        p.draws = 0;
        p.loses = 0;
      });
    }
    tableToString() {
      let ret_str = "";
      ret_str += "Table\n	";
      this.table.cards.forEach((c) => {
        if (c != null)
          ret_str += c.toString() + " ";
        else
          ret_str += "XX ";
      });
      ret_str += "\n";
      return ret_str;
    }
    playerToString(player) {
      let ret_str = "";
      ret_str += `${player.name} |`;
      player.cards.forEach((c) => {
        if (c != null)
          ret_str += ` ${c.toString()}`;
        else
          ret_str += " XX";
      });
      return ret_str;
    }
    playersToString() {
      let ret_str = "";
      this.table.show();
      this.table.players.forEach((p) => {
        let total = p.wins + p.draws + p.loses;
        let pcent_wins = p.wins / total * 100;
        let pcent_draws = p.draws / total * 100;
        let pcent_loses = p.loses / total * 100;
        let wins_str = String(p.wins).padStart(total.toString().length, " ");
        let draws_str = String(p.draws).padStart(total.toString().length, " ");
        let loses_str = String(p.loses).padStart(total.toString().length, " ");
        ret_str += this.playerToString(p) + "\n";
        ret_str += `	Wins: 	${wins_str}	${pcent_wins.toFixed(2).padStart(6, " ")}%
`;
        ret_str += `	Draws:	${draws_str}	${pcent_draws.toFixed(2).padStart(6, " ")}%
`;
        ret_str += `	Loses:	${loses_str}	${pcent_loses.toFixed(2).padStart(6, " ")}%
`;
      });
      return ret_str;
    }
    toString() {
      let ret_str = "";
      ret_str += this.tableToString();
      ret_str += this.playersToString();
      return ret_str;
    }
    show() {
      console.log(this.toString());
    }
  };

  // src/index.js
  window.Card = Card2;
  window.Combination = Combination;
  window.Deck = Deck;
  window.Game = Game;
  window.Hand = Hand;
  window.Player = Player;
  window.Table = Table;
  window.Proker = Proker;
})();
