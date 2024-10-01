import Table from "./table";

export default class Proker {
  constructor(table) {
		this.table = table;
	}

  compute(times) {
    if (times < 1) throw new Error('times must be greater than 0');
    this.reset_stats();
    let aux_table = null;
    for (let i=0; i<times; i++) {
      aux_table = this.table.copy();
      aux_table.full_deal_random();
      aux_table.player_hands();
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

  reset_stats() {
    this.table.players.forEach(p => {
      p.wins = 0;
      p.draws = 0;
      p.loses = 0;
    });
  }

  tableToString() {
    let ret_str = "";
    ret_str += "Table\n\t";
    this.table.cards.forEach(c => {
      if (c != null) 
        ret_str += c.toString() + " ";
      else
        ret_str += "XX ";
    });
    ret_str += "\n";
    return ret_str;
  }

  playerToString(player) {
    let ret_str = "";
    ret_str += `${ player.name } |`;
    player.cards.forEach(c => {
      if (c != null) 
        ret_str += ` ${ c.toString() }`;
      else
        ret_str += " XX";
    });
    return ret_str;
  }

  playersToString() {
    let ret_str = "";
    this.table.show();
    this.table.players.forEach(p => {
      let total = p.wins + p.draws + p.loses;
      let pcent_wins  = (p.wins / total) * 100;
      let pcent_draws = (p.draws / total) * 100;
      let pcent_loses = (p.loses / total) * 100;
      let wins_str = String(p.wins).padStart(total.toString().length, ' ');
      let draws_str = String(p.draws).padStart(total.toString().length, ' ');
      let loses_str = String(p.loses).padStart(total.toString().length, ' ');
      ret_str += this.playerToString(p) + "\n";
      ret_str += `\tWins: \t${ wins_str  }\t${ pcent_wins.toFixed(2).padStart(6, ' ') }%\n`;
      ret_str += `\tDraws:\t${ draws_str }\t${ pcent_draws.toFixed(2).padStart(6, ' ') }%\n`;
      ret_str += `\tLoses:\t${ loses_str }\t${ pcent_loses.toFixed(2).padStart(6, ' ') }%\n`;
    });
    return ret_str;
  }


  toString() {
    let ret_str = "";
    ret_str += this.tableToString();
    ret_str += this.playersToString();
    return ret_str;
  }

  show() {
    console.log(this.toString());
  }
}