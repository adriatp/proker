class Table {
    constructor() {
        this.cards = [null,null,null,null,null];
    }

    show() {
        for (let i=0; i < this.cards.length; i++) {
            if (this.cards[i] !== null) {
                this.cards[i].show();
                process.stdout.write(' ');
            }
        }
        process.stdout.write('\n');
    }
}

export {Table}