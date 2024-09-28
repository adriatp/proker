import Combination from "./combination";
import Deck from "./deck";
import Player from "./player";

export default class Table {
	constructor(n_players) {
		this.cards = [null,null,null,null,null];
		this.deck = new Deck();
		this.deck.shuffle();
		this.players = [];
		for (let i=0; i<n_players; i++)
			this.players.push(new Player());
	}

	deal_to_player(player,cards) {
		if (cards.length > 2) 
			throw("Players can only take 2 cards");
		if (cards.length < 1) 
			throw("Must deal at least 1 card");
		cards.forEach(c => {
			if (!this.is_free_card(c))
				throw("Trying to deal a taken card");
		});
		this.deck.remove_cards(cards);
		if (cards.length == 1)
			cards = [cards[0], null];
		player.cards = cards;
	}

	deal_to_table(cards) {
		if (cards.length > 5)
			throw("Table can only take 5 cards");
		if (cards.length < 1) 
			throw("Must deal at least 1 card");
		cards.forEach(c => {
			if (!this.is_free_card(c))
				throw("Trying to deal a taken card");
		});
		this.deck.remove_cards(cards);
		for (let i=cards.length; i<5; i++) {
			cards.push(null);
		}
		this.cards = [...cards];
	}

	full_deal_random() {
		// deal players
		this.players.forEach(p => {
			for (let i=0; i<2; i++) {
				if (p.cards[i] == null) {
					p.cards[i] = this.deck.deal_random();
				}
			}
		});
		// deal table
		for (let i=0; i<5; i++) {
			if (this.cards[i] == null) {
				this.cards[i] = this.deck.deal_random();
			}
		}
	}

	is_free_card(card) {
		return this.deck.is_free_card(card);
	}

	player_hands() {
		this.players.forEach(p => {
			let player_combination = new Combination([...this.cards, ...p.cards]);
			p.hand = player_combination.best_hand;
		});
	}

	show() {
		let table_cards = 'Table: ';
		for (let i=0; i<5; i++) {
			if (this.cards[i] != null)
				table_cards += this.cards[i].toString() + ' ';
		}
		console.log(table_cards);
		for (let i=0; i<this.players.length; i++) {
			let player_cards = `   p${ i }: `;
			for (let j=0; j<2; j++) {
				if (this.players[i].cards[j] != null)
					player_cards += this.players[i].cards[j].toString() + ' ';
			}
			console.log(player_cards);
		}
	}
}