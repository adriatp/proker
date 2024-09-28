import Card from "./card.js"

export default class Deck {
	constructor() {
		this.cards = new Array();
		Card.numbers.forEach(n => {
			Card.suits.forEach(s => {
				this.cards.push(new Card(n,s));
			});
		});
	}

	is_free_card(card) {
		this.cards.forEach(c => {
			if (c == card) return false;
		});
		return true;
	}

	show() {
		this.cards.forEach(c => {
			c.show();
		});
	}

	shuffle() {
		this.cards.sort( () => .5 - Math.random() );
	}

	deal_random() {
		if (this.cards <= 0) 
			throw("Trying to deal from an empty deck");
		this.shuffle();
		let ret_card = this.cards[0];
		this.cards = this.cards.slice(1);
		return ret_card;
	}

	remove_cards(cards) {
		cards.forEach(c => {
			this.remove_card(c);
		});
	}

	remove_card(card) {
		for (let i=0; i<this.cards.length; i++) {
			if (this.cards[i] == card) {
				this.cards.splice(i,1);
			}
		}
	}
}