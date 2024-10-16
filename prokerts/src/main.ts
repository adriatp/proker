import Card from "./card.ts";
import Table from "./table.ts";
import Proker from "./proker.ts";

import _Combination from "./combination.ts";
import _Deck from "./deck.ts";
import _Hand from "./hand.ts";
import _Player from "./player.ts";

const t = new Table(2);
let cards = [new Card('A','s'), new Card('a','c')];
t.deal_to_player(t.players[0],cards);
cards = [new Card('6','h'), new Card('2','c')];
t.deal_to_player(t.players[1],cards);
const p = new Proker(t);
p.compute(10000);
p.show();