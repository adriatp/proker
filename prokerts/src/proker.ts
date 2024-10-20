import Table from "./table.ts";
import Player from "./player.ts";

export default class Proker {
  table: Table;

  constructor(n_players: number);
  constructor(table: Table);
  constructor(param1: number | Table) {
    if (typeof param1 === "number") {
      this.table = new Table(param1);
    } else if (typeof param1 === Table) {
      this.table = param1;
    } else {
      throw new Error("Parámetro no válido");
    }
  }

  compute(times: number): void {
    if (times < 1) throw new Error("times must be greater than 0");
    this.reset_stats();
    let aux_table: Table | null = null;
    for (let i = 0; i < times; i++) {
      aux_table = this.table.copy();
      aux_table.full_deal_random();
      aux_table.player_hands();
      const winners = aux_table.winners();
      this.table.players.forEach((p) => {
        let is_winner = false;
        for (let i = 0; i < winners.length; i++) {
          if (p.toString() === winners[i].toString()) {
            is_winner = true;
          }
        }
        if (is_winner) {
          if (winners.length === 1) {
            p.wins++;
          } else {
            p.draws++;
          }
        } else {
          p.loses++;
        }
      });
    }
  }

  reset_stats(): void {
    this.table.players.forEach((p) => {
      p.wins = 0;
      p.draws = 0;
      p.loses = 0;
    });
  }

  tableToString(): string {
    let ret_str = "Table\n\t";
    this.table.cards.forEach((c) => {
      if (c != null) {
        ret_str += c.toString() + " ";
      } else {
        ret_str += "XX ";
      }
    });
    ret_str += "\n";
    return ret_str;
  }

  playerToString(player: Player): string {
    let ret_str = `${player.name} |`;
    player.cards.forEach((c) => {
      if (c != null) {
        ret_str += ` ${c.toString()}`;
      } else {
        ret_str += " XX";
      }
    });
    return ret_str;
  }

  playersToString(): string {
    let ret_str = "";
    this.table.show();
    this.table.players.forEach((p) => {
      const total = p.wins + p.draws + p.loses;
      const pcent_wins = (p.wins / total) * 100;
      const pcent_draws = (p.draws / total) * 100;
      const pcent_loses = (p.loses / total) * 100;
      const wins_str = String(p.wins).padStart(total.toString().length, " ");
      const draws_str = String(p.draws).padStart(total.toString().length, " ");
      const loses_str = String(p.loses).padStart(total.toString().length, " ");
      ret_str += this.playerToString(p) + "\n";
      ret_str += `\tWins: \t${wins_str}\t${
        pcent_wins.toFixed(2).padStart(6, " ")
      }%\n`;
      ret_str += `\tDraws:\t${draws_str}\t${
        pcent_draws.toFixed(2).padStart(6, " ")
      }%\n`;
      ret_str += `\tLoses:\t${loses_str}\t${
        pcent_loses.toFixed(2).padStart(6, " ")
      }%\n`;
    });
    return ret_str;
  }

  dealToPlayer(player: number, cards: [([string, string])?, ([string, string])?]): void {
    let cards = [];
    for (let i=0; i<2; i++) {
      const card = new Card(cards[i][0], cards[i][1]);
      cards.push
      this.table.deal_to_player(players[player], cards);
    }
  }

  toString(): string {
    let ret_str = this.tableToString();
    ret_str += this.playersToString();
    return ret_str;
  }

  show(): void {
    console.log(this.toString());
  }
}
