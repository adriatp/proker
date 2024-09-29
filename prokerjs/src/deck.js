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
		if (! (card instanceof Card))
			throw("is_free_card must receive an instance of Card");
		for (let i=0; i<this.cards.length; i++) {
			if (this.cards[i].toString() == card.toString()) return true;
		}
		return false;
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
		if (! (card instanceof Card))
			throw("remove_card must receive only an instance of Card");
		for (let i=0; i<this.cards.length; i++) {
			if (this.cards[i].toString() == card.toString()) {
				this.cards.splice(i,1);
			}
		}
	}

	copy() {
		let new_deck = new Deck();
		new_deck.cards = [];
		this.cards.forEach(c => {
			new_deck.cards.push(c.copy());
		});
		return new_deck;
	}

	toString() {
		let cards_str = '';
		this.cards.forEach(c => {
			cards_str += `${c.toString()} `;
		});
		return cards_str;
	}

	show() {
		console.log(this.toString());
	}
}