export default class Card {
  static numbers: string[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
  ];
  static suits: string[] = ["S", "H", "C", "D"];
  static _rep_suits: string[] = ["\u2660", "\u2665", "\u2663", "\u2666"];

  suite: number;
  number: number;

  constructor(number: string, suite: string) {
    const _tmpNumber = number.toUpperCase();
    if (!Card.numbers.includes(_tmpNumber)) {
      throw new Error(
        "Number is not correct (must be in ['2','3','4','5','6','7','8','9','T','J','Q','K','A'])",
      );
    }
    const _tmpSuite = suite.toUpperCase();
    if (!Card.suits.includes(_tmpSuite)) {
      throw new Error(
        "Suite must be 'S' (Spades), 'H' (Hearts), 'C' (Clubs) or 'D' (Diamonds)",
      );
    }
    this.suite = Card.suits.indexOf(_tmpSuite);
    this.number = Card.numbers.indexOf(_tmpNumber);
  }

  copy(): Card {
    return new Card(Card.numbers[this.number], Card.suits[this.suite]);
  }

  static compare(
    c1: Card | null,
    c2: Card | null,
    asc: boolean = true,
  ): number {
    if (c1 === null && c2 === null) return 0;
    if (c1 === null) return 1;
    if (c2 === null) return -1;
    const factor = asc ? 1 : -1;
    return (c1.number - c2.number) * factor;
  }

  show(): void {
    console.log(Card.numbers[this.number] + Card._rep_suits[this.suite]);
  }

  toString(): string {
    return Card.numbers[this.number] + Card._rep_suits[this.suite];
  }
}
