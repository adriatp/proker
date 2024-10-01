export default class Player {
	constructor(name) {
		this.name = name;
		this.cards = [null,null];
		this.hand = null;
		this.wins = 0;
		this.loses = 0;
		this.draws = 0;
	}

	copy() {
		let new_player = new Player(this.name);
		new_player.wins = this.wins;
		new_player.loses = this.loses;
		new_player.draws = this.draws;
		new_player.cards = [null,null];
		for (let i=0; i<2; i++) {
			if (this.cards[i] != null)
				new_player.cards[i] = this.cards[i].copy();
		}
		if (this.hand != null) 
			new_player.hand = this.hand.copy();
		return new_player;
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

	toString() {
		return this.name;
	}
}