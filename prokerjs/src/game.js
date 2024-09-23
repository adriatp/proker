import Deck from "./deck.js";
import Player from "./player.js";
import Table from "./table.js";

export default class Game {
	constructor(n_players) {
		//  Initialize attributes
		this.deck = new Deck();
		this.table = new Table();
		this.players = [];
		//  Shuffle Deck
		this.deck.shuffle();
		//  Initialize players
		for (let i=0; i<n_players; i++) {
			this.players.push(new Player());
		}
		//  Deal players hands
		for (let i=0; i<n_players; i++) {
			this.players[i].cards[0] = this.deck.deal_cards(1)[0]; 
		}
		for (let i=0; i<n_players; i++) {
			this.players[i].cards[1] = this.deck.deal_cards(1)[0]; 
		}
		//  Burn card
		this.deck.deal_cards(1);
		//  Deal flop
		this.table.cards.splice(0,3,...this.deck.deal_cards(3));
		//  Burn card
		this.deck.deal_cards(1);
		//  Deal turn
		this.table.cards.splice(3,1,...this.deck.deal_cards(1));
		//  Burn card
		this.deck.deal_cards(1);
		//  Deal river
		this.table.cards.splice(4,1,...this.deck.deal_cards(1));
	}

	show() {
		console.log(this.players);
		console.log(this.players.length);
		this.players.forEach( (p,i) => {
			console.log('Player ' + (i+1) + ':');
			p.show();
		});
		console.log('   Table:');
		this.table.show();
	}
}