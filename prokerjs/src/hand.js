export default class Hand {
	constructor(cards) {
		if (cards === null || cards === undefined || cards.length != 5)
			throw new Error('Hand must have 5 cards');
		this.cards = cards;
		this.rank = this.get_rank();
		this.cards = this.sort_numbers_by_rank();
	}

	get_rank() {
		this.cards.sort();
		if 			(this.is_straight_flush())	this.rank = 8;
		else if (this.is_quads())						this.rank = 7;
		else if (this.is_full())					 	this.rank = 6;
		else if (this.is_flush())						this.rank = 5;
		else if (this.is_straight())				this.rank = 4;
		else if (this.is_trips())						this.rank = 3;
		else if (this.is_two_pair())				this.rank = 2;
		else if (this.is_one_pair())				this.rank = 1;
		else if (this.is_high_card())				this.rank = 0;
		
	}

	is_straight_flush() {
		return this.is_flush() && this.is_straight();
	}

	is_quads() {
		return this.cards[0].number == this.cards[3].number || this.cards[1].number == this.cards[4].number;
	}

	is_full() {
		return 	this.cards[0].number == this.cards[2].number && this.cards[3].number == this.cards[4].number ||
					 	this.cards[0].number == this.cards[1].number && this.cards[2].number == this.cards[4].number;
	}

	is_flush() {
		for (let i=0; i<4; i++) 
			if (this.cards[i].suite != this.cards[i+1].suite) return false;
		return true;
	}

	is_straight() {
		for (let i=0; i<4; i++) {
			if (this.cards[i].number + 1 != this.cards[i+1].number) return false;
		}
		return true;
	}

	is_trips() {
		for (let i=0; i<3; i++) {
			if (this.cards[i].number == this.cards[i+2].number)
				return true;
		}
	}

	is_two_pair() {
		return	this.cards[0].number == this.cards[1].number && this.cards[2].number == this.cards[3].number ||
						this.cards[0].number == this.cards[1].number && this.cards[3].number == this.cards[4].number ||
						this.cards[1].number == this.cards[2].number && this.cards[3].number == this.cards[4].number;
	}

	is_one_pair() {
		for (let i=0; i<4; i++) {
			if (this.cards[i].number == this.cards[i+1].number)
				return true;
		}
	}

	is_high_card() {
		return true;
	}

	sort_numbers_by_rank() {
		let cards = [...this.cards];
		if (this.rank == 7 && cards[0].number != cards[3].number) 	// quads
			cards = [...cards.slice(1,5), cards[0]];
		else if (this.rank == 6 && cards[0].number != cards[2].number) 	// full
			cards = [...cards.slice(2,5), ...cards.slice(0,2)];
		else if (this.rank == 3) {																			// trips
			if (cards[1].number == cards[3].number)
				cards = [...cards.slice(1,4), cards[0], cards[4]];
			else if (cards[2].number == cards[4].number)
				cards = [...cards.slice(2,5), cards[0], cards[1]];
		}
		else if (this.rank == 2) {																			// two_pair
			if (cards[0].number != cards[1].number)
				cards = [...cards.slice(1,5), cards[0]];
			else if (cards[2].number != cards[1].number && cards[2].number != cards[3].number)
				cards = [...cards.slice(0,2), ...cards.slice(3,5), cards[2]]
		}
		else if (this.rank == 1) {																			// one_pair
			if (cards[1].number == cards[2].number) 
				cards = [...cards.slice(1,3), cards[0], ...cards.slice(3,5)];
			else if (cards[2].number == cards[3].number) 
				cards = [...cards.slice(2,4), ...cards.slice(0,2), cards[4]];
			else if (cards[3].number == cards[4].number) 
				cards = [...cards.slice(3,5), ...cards.slice(0,3)];
		}
		return cards;
	}

  compare_to(other) {
    if (this.rank > other.rank) return 1;
		else if (other.rank < this.rank) return -1;
    else {
			for (let i=0; i<5; i++) {
				if (this.cards[i].number > other.cards[i].number) return 1;
				else if (this.cards[i].number < other.cards[i].number) return -1;
			}
			return 0;
    }
  }
}