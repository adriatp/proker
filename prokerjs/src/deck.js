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

	show() {
		this.cards.forEach(c => {
			c.show();
		});
	}

	shuffle() {
		this.cards.sort( () => .5 - Math.random() );
	}

	deal_n_cards(n_cards) {
		let ret_cards = this.cards.slice(0, n_cards);
		this.cards = this.cards.slice(n_cards, this.cards.length);
		return ret_cards;
	}

	deal_card(card) {
		for (let i=0; i<this.cards.length; i++) {
			if (this.cards[i] == card) {
				let ret_card = this.cards[i];
				this.cards.splice(i,1);
				return ret_card;
			}
		}
		return null;
	}
}