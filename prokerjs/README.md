# ProkerJS

Llibreria per calcular les probabilitats d'una mà de Poker Holdem Texas utilitzant un algoritme de Montecarlo.

## Development

- Executa `npm run start` per que es vagi compilant el programa a `dist/bundle.js` a mesura que guardes nous fitxers 
- Testeja el programa obrint en un navegador el fitxer `examples/index.html`
- En cas que creïs noves classes, inclueix-les a `src/index.js`

## TODO

- [x] Estructura del projecte
- [x] Relacions de les classes
- [ ] API

## Lògica per calcular millor mà

1. Class: Mà
2. Rep 7 cartes: 5 de la taula i 2 del jugador
3. Genera totes les combinacions 
4. Avalua rank de la ma
5. Desempata mans del mateix rank
6. Reparteix cartes


t = new Table(6);
cards = [new Card(''),new Card('')];
t.deal_to(t.players[0],cards);
t.get_ranks();

t.test(1);