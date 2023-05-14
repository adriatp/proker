import { Deck } from './deck.js';
import { Game } from './game.js';
import { Table } from './table.js';

let myDeck = new Deck();
myDeck.shuffle();
myDeck.show();

myDeck = new Deck();

let myGame = new Game(5);
myGame.show();

