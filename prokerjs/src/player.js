export default class Player {
	constructor() {
		this.cards = [null,null];
		this.hand = null;
	}

	show() {
		console.log(`${this.cards[0].toString()} ${this.cards[1].toString()}`)
	}

	show_hand() {
		let hand = '';
		for (let i=0; i<this.hand.length; i++) {
			hand += this.hand[i].toString() + ' '
		}
		console.log(hand);
	}
}