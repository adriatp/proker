import Table from "./table";

export default class Proker {
  constructor(table) {
		this.table = table;
	}

  compute(times) {
    for (let i=0; i<times; i++) {
      let aux_table = this.table.copy();
      debugger;
      aux_table.full_deal_random();
      aux_table.player_hands();
      aux_table.show()
      let winners = aux_table.winners();
      this.table.players.forEach(p => {
        let is_winner = false;
        for (let i=0; i<winners.length; i++) {
          if (p.toString() == winners[i].toString())
            is_winner = true; 
        }
        if (is_winner) {
          if (winners.length == 1)  p.wins++;
          else                      p.draws++;
        } else                      p.loses++;
      });
    }
  }
}