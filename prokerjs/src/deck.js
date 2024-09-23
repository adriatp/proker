import { Card } from "./card.js"

class Deck {
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
			process.stdout.write(' ');
		});
		process.stdout.write('\n');
	}

	shuffle() {
		this.cards.sort( () => .5 - Math.random() );
	}

	deal_cards(n_cards) {
		let ret_cards = this.cards.slice(0, n_cards);
		this.cards = this.cards.slice(n_cards, this.cards.length);
		return ret_cards;
	}
}

export { Deck };