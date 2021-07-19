
class Cell {
  constructor() {
    this.state = 0;
    this.defense = false;
    this.infectionAge = 0;
    this.neighbors = [];
    this.live = true;
  }
  attack(attackRate, offense, defense) {
    let dice = new Dice();
    let ar = attackRate;
    this.neighbors.forEach((neighbor) => {
      if (neighbor.infectionAge === 0 && neighbor.state !== 3) {
        if (this.defense) {
          ar = ar * offense;
        }
        if (neighbor.defense) {
          ar = ar * defense;
        }
        if (dice.roll(ar)) {
          neighbor.state = 1;
          neighbor.infectionAge = 1;
        }
      }
    })
  }
}
class Dice {
  constructor() {
    this.min = 0.01;
    this.max = 1.0;
  }
  roll (odds) {
    let selectedNumber = Math.random() * (this.max - this.min) + this.min;
    if (selectedNumber < odds) {
      return true;
    }
    return false;
  }
}
class Game {
  constructor(gamestyle) {
    this.styles = {
      'Emoji':  'asssets/CDAThemes/Emoticon/',
      'Forest': 'asssets/CDAThemes/Forest/',
    }
    this.gamestyle = gamestyle;
    let path = this.styles[this.gamestyle];
    this.manhattanDistance = 2;
    this.initialInfectionRate = document.getElementById("ir").value / 100;
    this.defenseRate = 0.6;
    this.attackRate = 0.2;
    this.offense = 0.05;
    this.defense= 0.33;
    this.deathRate = document.getElementById("ripr").value / 100;
    this.sprites = [
      path + "Neutral/0.png",
      path + "Neutral/1.png",
      path + "Neutral/2.png",
      path + "Defense/0.png",
      path + "Defense/1.png",
      path + "Defense/2.png",
      path + "RIP.png"
      ];
    }
    buildBoard() {
      let val = document.getElementById("size").value / 100;
      let minSize = 5;
      let maxSize = 28 - minSize;
      let nCells = Math.round(maxSize * val) + minSize;
      let size = nCells;
      let count = 0;
      let board = []
      do {
        board.push(this.initInfection(new Cell()));
        count += 1;
      } while (count < (size * size));
      // squish into 2D arrays

      let board2D = [];
      while(board.length) board2D.push(board.splice(0, size));



      // Get nearest neighbors
      let rowCount = 0;
      board2D.forEach((row) => {
        let colCount = 0;
        row.forEach((cell) => {
          this.getNeighbors(cell, [rowCount, colCount], board2D);
          colCount += 1;
        });
        rowCount += 1;
      })

      this.size = size;
      this.board2D = board2D;
    }
    getNeighbors(cell, index, board2D){
      let x = index[0];
      let y = index[1];
      let maxD = this.manhattanDistance;
      // get Manhattan distance of each from input cell
      let rowCount = 0;
      board2D.forEach((row) => {
        let colCount = 0;
        row.forEach((neighborCell) => {
          let distance = Math.abs(colCount - x) + Math.abs(rowCount - y);

          if (distance != 0 && distance <= maxD) {
            cell.neighbors.push(neighborCell);
          }
          colCount += 1;
        });
        rowCount += 1;
      })

    }
    initInfection(cell) {
      // random select individuals for initialization of contagion
      let dice = new Dice();
      if (dice.roll(this.initialInfectionRate)) {
        cell.state = 1
        cell.infectionAge = 1;
      }
      if (dice.roll(this.defenseRate)) {
        cell.defense = true;
      }
      return cell;
    }
    render() {
      // clear the current board state
      document.querySelectorAll("[id=cell]").forEach((cell) => {
        cell.remove();
      });
      // place each cell with updated values
      this.board2D.forEach((row) => {
        row.forEach((cell) => {
          let img = document.createElement('img');
          if (cell.defense) {
            img.src = this.sprites[cell.state + 3];
          } else {
            img.src = this.sprites[cell.state];
          }
          if (!cell.live) {
            img.src = this.sprites[6];
          }
          img.setAttribute('id', 'cell');
          let cellSize = ((1 / this.size) * 100).toString();
          let h = 'height: ' + cellSize + '%; '
          let w = 'width: ' + cellSize + '%; '
          img.setAttribute('style', h + w);
          document.getElementById("petriDish").appendChild(img);
        });
      })
    }
    turn() {
      // flatten board first
      let board = this.board2D.flat();
      let dead = 0;
      board.forEach((cell) => {
        if (cell.live) {
          if (cell.state === 1) {
            cell.attack(this.attackRate, this.offense, this.defense);
          }
          if (cell.infectionAge > 0) {
            cell.infectionAge += 1;
            if (cell.infectionAge > 7) {
              cell.state = 2;
            }
            if (cell.infectionAge > 14) {
              let dice = new Dice();
              if (dice.roll(this.deathRate)) {
                cell.state = 3;
                cell.live = false;
                cell.infectionAge = 0;
              } else {
                cell.state = 0;
                cell.infectionAge = 0;
              }
            }
          }
        } else {
          dead += 1;
        }
      });
      //console.log(this.board2D[0][0].infectionAge)
      return dead;


    }
}

class SettingsManager {
  constructor(game) {
    this.game = game;

  }
  update (memeLab) {
    // add event listeners
    console.log("Simulation Updated");
    // Update size
    let val = document.getElementById("size").value / 100;
    let minSize = 5;
    let maxSize = 28 - minSize;
    let nCells = Math.round(maxSize * val) + minSize;

    // enter new settings
    this.game.styles = {
      'Emoji':  'asssets/CDAThemes/Emoticon/',
      'Forest': 'asssets/CDAThemes/Forest/',
    }
    this.game.gamestyle = 'Forest';
    let path = this.game.styles[this.game.gamestyle];
    this.game.manhattanDistance = Math.round((document.getElementById("md").value / 100)* 4);
    this.game.initialInfectionRate = document.getElementById("ir").value / 100;
    this.game.defenseRate = document.getElementById("dr").value / 100;
    this.game.deathRate = document.getElementById("ripr").value / 100;
    console.log(this.game.deathRate);
    this.game.sprites = [
      path + "Neutral/0.png",
      path + "Neutral/1.png",
      path + "Neutral/2.png",
      path + "Defense/0.png",
      path + "Defense/1.png",
      path + "Defense/2.png",
      path + "RIP.png"
      ];
    this.game.buildBoard(nCells);
    console.log(nCells);
  }
}
function updateSliderValues() {
  console.log("hello world");
  let size = Math.pow(document.getElementById("size").value, 2).toString();
  document.getElementById("sizetext").innerHTML = size;
  let md = Math.round((document.getElementById("md").value / 100) * 4).toString();
  document.getElementById("mdtext").innerHTML = md;
  let ir = document.getElementById("ir").value.toString() + '%';
  document.getElementById("irtext").innerHTML = ir;
  let dr = document.getElementById("dr").value.toString() + '%';
  document.getElementById("drtext").innerHTML = dr;
  let kr = document.getElementById("ripr").value.toString() + '%';
  document.getElementById("krtext").innerHTML = kr;

}

// set defaults

document.getElementById("size").value = 100;
document.getElementById("ir").value = 4;
document.getElementById("dr").value = 20;
document.getElementById("ripr").value = 10;
var memeLab = new Game('Emoji');
memeLab.buildBoard(10);
var MGMT = new SettingsManager(memeLab);
let day = 0;

setInterval(() => {
  memeLab.render();
  let dead = Math.round((memeLab.turn() / (memeLab.size * memeLab.size)) * 100).toString();
  day += 1;
  document.getElementById("days").innerHTML = "Day " + day.toString();
  document.getElementById("deaths").innerHTML = "💀 = " + dead + '%';
  //console.log(day);
}, 100);
