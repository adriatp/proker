class Player {
    constructor() {
        this.cards = [null,null];
    }

    show() {
        this.cards.forEach(c => {
            c.show();
            process.stdout.write(' ');
        });
    }
}

export {Player};