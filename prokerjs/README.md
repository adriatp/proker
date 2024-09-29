# ProkerJS - Poker Hand Probability Calculator Library

A library to calculate the probabilities of a Texas Hold'em Poker hand using a Monte Carlo algorithm.

## Development

- Run `npm run start` to automatically compile the program into `dist/bundle.js` as you save new files.
- Test the program by opening the `examples/index.html` file in a browser.
- If you create new classes, include them in `src/index.js`.

## TODO

- [x] Project structure
- [x] Class relationships
- [ ] Poker logic
  - [x] Set ranks
  - [x] Compare hands
  - [x] Deal specific/random cards
  - [ ] Probabilities
  - [ ] Concurrency
- [ ] API
- [ ] Documentation
- [ ] Tests

## Logic to calculate the best hand

1. Class: Hand
2. Receives 7 cards: 5 from the table and 2 from the player
3. Generates all combinations
4. Evaluates the rank of each hand
5. Breaks ties between hands of the same rank

## Tests

### Automatic tests

- TO-DO // Mocha (?)

### Manual tests

- Test dealing cards // player best hands

```js
t = new Table(6);
cards = [new Card('A','s')];
t.deal_to_player(t.players[0],cards);
t.full_deal_random();
t.player_hands();
t.players[0].hand.show();
```

- Testing sort method

```js
h=new Hand([new Card('A','D'),new Card('K','D'),new Card('Q','D'),new Card('J','D'),new Card('T','D')]);
h.show()
h.cards.sort(Hand.compare)
h.show()
```

- Test sorting straights 

```js
h=new Hand([new Card('A','D'),new Card('K','D'),new Card('Q','D'),new Card('J','D'),new Card('T','D')]);
h=new Hand([new Card('5','D'),new Card('A','D'),new Card('3','D'),new Card('2','D'),new Card('4','D')]);
```

- Compare combinations

```js
c = new Combination([new Card('7','S'),new Card('J','H'),new Card('6','C'),new Card('4','C'),new Card('2','D'),new Card('8','S'),new Card('6','')])
```

- Test winner

```js
t = new Table(6);
cards = [new Card('A','s'), new Card('a','c')];
t.deal_to_player(t.players[0],cards);
t.full_deal_random();
t.player_hands();
t.show();
for (let i=0; i<6; i++) {
  t.players[i].hand.show();
}
```

- Test compare_to (Hand)

```js
h1 = new Hand([new Card('J','H'),new Card('8','S'),new Card('7','S'),new Card('6','D'),new Card('6','S')]);
h2 = new Hand([new Card('J','H'),new Card('8','S'),new Card('7','S'),new Card('6','D'),new Card('4','D')]);
h1.compare_to(h2);
h2.compare_to(h1);
```

- Test deck

```js
d = new Deck()
d.is_free_card(new Card('a','s'))
d.remove_card(new Card('a','s'))
d.is_free_card(new Card('a','s'))
```

- Test probabilities

```js
t = new Table(6);
// Opcional to set 
  cards = [new Card('A','s'), new Card('a','c')];
  t.deal_to_player(t.players[0],cards);
  cards = [new Card('K','s'), new Card('t','h')];
  t.deal_to_player(t.players[1],cards);
  cards = [new Card('k','c'), new Card('q','d'), new Card('j','d'), new Card('t','d')];
  t.deal_to_table(cards);
//
p = new Proker(t);
p.compute(10000);
```

- Test deep copies

  - Deck

```js
d = new Deck()
d2 = d.copy()
d.shuffle()
d.show()
d2.show()
```

  - Table

```js
t = new Table(6)
t2 = t.copy()
```

  - Player

```js
p = new Player('p1')
p2 = p.copy()
p.cards = [new Card('a','c'), new Card('a','s')]
```

  - Proker

```js
t = new Table(6);
// Opcional to set 
  cards = [new Card('A','s'), new Card('a','c')];
  t.deal_to_player(t.players[0],cards);
  cards = [new Card('K','s'), new Card('t','h')];
  t.deal_to_player(t.players[1],cards);
  cards = [new Card('k','c'), new Card('q','d'), new Card('j','d')];
  t.deal_to_table(cards);
//
p = new Proker(t);
p.compute(10000);
// p.table.players[5].cards
```