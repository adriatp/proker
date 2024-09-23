(() => {
  // src/table.js
  var Table = class {
    constructor() {
      this.cards = [null, null, null, null, null];
    }
    show() {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i] !== null) {
          this.cards[i].show();
          process.stdout.write(" ");
        }
      }
      process.stdout.write("\n");
    }
  };

  // src/index.js
  window.Table = Table;
})();
