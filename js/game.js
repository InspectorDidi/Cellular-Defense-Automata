class Meme {
  constructor(settings) {
    this.genes = settings;
    this.age = 0;
    this.infectious = false;
    this.dead = false;
  }
  cycle() {
    // step forward life cycle
    let incubationPeriod = this.genes["Incubation"];

    if (this.age >= incubationPeriod) {
      this.infectious = true;
      let infectiousPeriod = this.genes["Infectious"];
      if (this.age > (incubationPeriod + infectiousPeriod)) {
        this.infectious = false;
        let recoveryOdds = this.genes["Decay Rate"] / 100;
        if (new Dice().roll(recoveryOdds)) {
          this.dead = true;
        }
      }
    }
    this.age += 1;
  }
  copy() {
    let child = new Meme(JSON.parse(JSON.stringify(this.genes)));
    return child;
  }
}
class Cell {
  constructor() {
    this.alive = true; // A cell is born!
    this.state = 0;
    this.receptor = 'ABCD';
    this.defense = false;
    this.vaxxed = false;
    this.defenses = [];
    this.neighbors = [];
    this.body = [];
  }
  live() {
    // Handles cells interactions with neighbors  (i.e. viral attacks!)
    let body = [];
    this.body.forEach((virus) => {
      if (virus.infectious) {
        this.state = 1
        let attackRate = this.getAttackRate(virus);
        this.neighbors.forEach((neighborCell) => {
          // attack the neighbors!
          if (neighborCell.state === 0) {
            if (!neighborCell.isSick()) { // Please lord have mercy!
              if (new Dice().roll(attackRate * neighborCell.protection)) {
                neighborCell.body.push(virus.copy());
              }
            }
          }
        });
      }
      virus.cycle();
      if (!virus.dead) {
        body.push(virus);
        if (this.state === 1) {
          if (virus.age > (virus.genes['Incubation'] + virus.genes['Infectious'])) {
            this.state = 2;
          }
        }
      } else {
        this.mortalityEval(virus);
      }
    });
    this.body = body;
    if (this.alive && (this.body.length === 0)) {
      this.state = 0;
    }
  }
  mortalityEval(virus) {
    let dice = new Dice();
    let killRate = virus.genes['Kill Rate'] / 100;
    if (this.defenses.length > 0) {
      this.defenses.forEach((shield) => {
        killRate = killRate * shield.mortalityReduction;
      });
    }
    if (dice.roll(killRate)) {
      this.state = 3;
      this.body = [];
      this.alive = false;
    } else {
      this.state = 0;
    }
  }
  getAttackRate(virus) {
    // Calculate the attack rate for this cell with X defense(s) and Y Virus
    let attackRate = virus.genes['Attack Rate'] / 100;
    this.defenses.forEach((shield) => {
      attackRate = attackRate * shield.dampening;
    });
    return attackRate;
  }
  getProtection() {
    let protection = 1.0;
    this.defenses.forEach((shield) => {
      protection = protection * shield.protection;
    });
    this.protection = protection;
  }
  isInfectious() {
    this.body.forEach((virus) => {
      if (virus.age >= virus.genes["Incubation"] && virus.age <= virus.genes["Infectious"]) {
        if (virus.infectious) {
          return virus.infectious;
        }
      }
    });
    return false;
  }
  isSick() {
    if (this.body.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
class Defense {
  constructor(settings) {
    this.settings = settings;
    this.rate = settings['Rate'] / 100;
    this.protection = (1.0 - settings['Protection'] / 100);
    this.dampening = (1.0 - settings['Dampening'] / 100);
    this.mortalityReduction = (1.0 - settings['Mortality Reduction'] / 100);
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
    this.isRangeFinder = false;
    this.dice = new Dice();
    this.styles = {
      'Emoji':  'asssets/CDAThemes/Emoticon/',
      'Forest': 'asssets/CDAThemes/Forest/',
    }
    this.stats = {};
    this.gamestyle = gamestyle;
    let path = this.styles[this.gamestyle];
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
  buildBoard(settings) {
    if (this.isRangeFinder) {
      let path = this.styles[this.gamestyle];
      this.sprites = [
        path + "Neutral/0.png",
        path + "Meme.svg",
        path + "biohazard.svg",,
        path + "Defense/0.png",
        path + "Defense/1.png",
        path + "Defense/2.png",
        path + "RIP.png"
        ];
    }
    this.settings = settings;
    this.longStats = {'infectious':[], 'zombie':[], 'dead':[]};
    let size = this.settings[0]['Population Size'];

    let surgicalMask = new Defense(this.settings[1]);
    let vaccine = new Defense(this.settings[2]);
    let defenses = [surgicalMask, vaccine];
    let genesisVirus = new Meme(this.settings[3]);

    let count = 0;
    let board = []
    let patientZero = Math.round(Math.pow(size, 2) / 2);
    do {
      let zero = false;
      if (count === patientZero) {
        zero = true;
      }
      board.push(this.initInfection(new Cell(), genesisVirus, defenses, zero));

      count += 1;
    } while (count < Math.pow(size, 2));


    // squish into 2D arrays
    let board2D = [];
    while(board.length) board2D.push(board.splice(0, size));

    this.board = board;
    this.size = size;
    this.population = Math.pow(size,2)
    this.pixelRender = false;
    if (this.population > 1000) {
      this.pixelRender = true;
    }
    this.board2D = board2D;
    this.getNeighbors(this.settings[3]['Range']);

  }
  initInfection(cell, virus, shields, patientZero) {
    // random select individuals for initialization of contagion
    if (this.dice.roll(this.settings[0]['Seed Infections'] / 100)) {
      cell.body.push(virus.copy());
    }

    if (patientZero) {
      cell.body.push(virus.copy());
    }

    let oddsMask = this.settings[1]['Rate'] /  100; // masking rate
    if (this.dice.roll(oddsMask)) {
      cell.defense = true;
      cell.defenses.push(shields[0]);
    }
    let oddsVax = this.settings[2]['Rate'] /  100; // masking rate
    if (this.dice.roll(oddsVax)) {
      cell.vaxxed = true;
      cell.defenses.push(shields[1]);
    }
    cell.getProtection();
    return cell;
  }
  getNeighbors(range) {
    // Get nearest neighbors!
    function getNearest(cell, index, board2D, manhattanDistance) {
      let x = index[0];
      let y = index[1];
      // get Manhattan distance of each from input cell
      let rowCount = 0;
      board2D.forEach((row) => {
        let colCount = 0;
        row.forEach((neighborCell) => {
          let distance = Math.abs(colCount - x) + Math.abs(rowCount - y);
          if (distance != 0 && distance <= manhattanDistance) {
            cell.neighbors.push(neighborCell);
          }
          colCount += 1;
        });
        rowCount += 1;
      })
    }
    let rowCount = 0;
    this.board2D.forEach((row) => {
      let colCount = 0;
      row.forEach((cell) => {
        getNearest(cell, [rowCount, colCount], this.board2D, range);
        colCount += 1;
      });
      rowCount += 1;
    })
  }
  render(canvasId) {
    // clear the current board state
    let canvas = document.getElementById(canvasId);
    canvas.querySelectorAll("[id=cell]").forEach((cell) => {
      cell.remove();
    });
    canvas.querySelectorAll("[id=vax]").forEach((cell) => {
      cell.remove();
    });
    let cssId = 'cell';
    if (this.pixelRender) {
      let cssId = '';
    }
    // place each cell with updated values
    this.board2D.forEach((row) => {
      row.forEach((cell) => {
        let cellSize = ((1 / this.size) * 100).toString();
        let h = 'height: ' + cellSize + '%; '
        let w = 'width: ' + cellSize + '%; '
        let cellElement = document.createElement('div');
        cellElement.setAttribute('id', 'cell');
        cellElement.setAttribute('style', h + w);

        if (this.pixelRender) {
          let pixel = document.createElement('div');
          pixel.setAttribute('id', 'pixel');
          if (cell.alive) {
            pixel.setAttribute('style', 'background-color:#ffe0bd;');
            if (cell.defense) {
              pixel.setAttribute('style', 'background-color:#8BE3D9;');
            }
            if (cell.state === 1) {
              pixel.setAttribute('style', 'background-color:#F72427;');
            }
            if (cell.state === 2) {
              pixel.setAttribute('style', 'background-color:#78C165;');
            }
          }
          else {
            pixel.setAttribute('style', 'background-color:black;');
          }
          cellElement.appendChild(pixel);
        } else {
          let img = document.createElement('img');
          if (cell.defense) {
            img.src = this.sprites[cell.state + 3];
          } else {
            img.src = this.sprites[cell.state];
          }
          if (!cell.alive) {
            img.src = this.sprites[6];
          }
          img.setAttribute('id', 'cellState');
          if (cell.vaxxed) {
            let vaccine = document.createElement('img');
            vaccine.src = 'asssets/CDAThemes/Emoticon/syringe.svg'
            vaccine.setAttribute('id', 'vax');
            cellElement.appendChild(vaccine);
          }
          cellElement.appendChild(img);
        }

        document.getElementById(canvasId).appendChild(cellElement);
      });
    })
  }
  mortalityEval(cell) {
    // New ! and refractored
    cell.body.forEach((virus) => {
      let killRate = virus.genes['Kill Rate'] / 100;
      if (cell.defenses.length > 0) {
        cell.defenses.forEach((shield) => {
          killRate = killRate * shield.mortalityReduction;
        });
      }
      if (cell.dice.roll(killRate)) {
        cell.state = 3;
        cell.body = [];
        cell.alive = false;
      } else {
        cell.state = 2;
      }
    });
  }
  birthEval(cell, birthRate) {

    let aliveNeighbors = 0;
    cell.neighbors.forEach((neighbor) => {
      if (neighbor.alive) {
        aliveNeighbors += 1;
      }
      });
    if ((aliveNeighbors / cell.neighbors.length) > 0.5) {
      if (this.dice.roll(birthRate)) {
        cell.state = 0;
        cell.body = [];
        cell.alive = true;
      }
    }
    return cell;
  }
  turn() {

    let board = this.board2D.flat();
    let dead = 0;
    let infectious = 0;
    let zombie = 0;
    board.forEach((cell) => {
      if (cell.alive) {
        cell.live();
        if (cell.isSick()) {
          infectious += 1;
        }
        if (cell.state === 2) {
          zombie += 1;
        }
      } else {
        //cell.state = 3;
        let birthRate = this.settings[0]['Birth Rate'] / 100;
        if (birthRate > 0) {
          this.birthEval(cell, birthRate);
        }
        dead += 1;
        }
    });

    this.stats['dead'] = Math.round(dead / this.population * 100);
    this.stats['infectious'] = Math.round(infectious / this.population * 100);
    this.stats['zombie'] = Math.round(zombie / this.population * 100);

    this.longStats['infectious'].push(infectious / this.population * 100);
    this.longStats['dead'].push(dead / this.population * 100);
    this.longStats['zombie'].push(zombie / this.population * 100);

    return this.stats;
  }
}
class SimulationController {
  constructor(defualtSettings, location) {
    // Handles user input
    this.settings = [];
    this.location = location;
    defualtSettings.forEach((i) => {
      i = new Slider(i[0], i[1], i[2], i[3], i[4]);
      i.build(location);
      this.settings.push(i);
    });

  } update() {
    let settings = {};
    this.settings.forEach((i) => {
      settings[i.id] = i.update();
    });
    return settings;
  }
}
class Slider {
  constructor(id, min, max, defualt, displayPercent) {
    this.id = id;
    this.min = min;
    this.max = max;
    this.value = defualt;
    this.displayPercent = displayPercent;

  } build(parentElement) {
    let div = document.createElement('div');
    div.setAttribute('id', 'slider');
    document.getElementById(parentElement).appendChild(div);

    let text = document.createElement('p');
    let val = this.value;
    text.textContent = this.id + ' ' + val.toString() + '%';
    div.appendChild(text);

    let i = document.createElement('input');
    i.setAttribute('id', this.id);
    i.setAttribute('type', 'range');
    i.setAttribute('class', 'sliderInput');
    i.value = val;
    div.appendChild(i);
    //document.getElementById(this.id).value = this.value;
    this.div = div;
    this.update();

  } update() {
    this.value = this.div.children[1].value;
    let text = this.div.children[0];
    let val = this.value;
    if (this.displayPercent) {
      text.textContent = this.id + ' ' + val.toString() + '%';
    } else {
      val = Math.round((this.max - this.min) * (val / 100) + this.min);
      if (this.id === 'Population Size') {
        let valpow = Math.pow(val, 2);
        text.textContent = this.id + ' ' + valpow.toString();
      } else {
        text.textContent = this.id + ' ' + val.toString();
      }
      if (this.id === 'Infectious' || this.id === 'Incubation') {
        text.textContent = this.id + ' Period: ' + val.toString() + ' days';
      }
    }
    return val;
  }
}
class Enviroment {
  constructor(game) {
    // init defualt game enviroment
    this.game = game;
    this.isRunning = false;
    let neighborhoodSettings = [
      // id, min, max, defualt, displayPercent,
      ['Population Size', 5, 100, 15, false],
      ['Birth Rate', 1, 100, 3, true],
      ['Seed Infections', 1, 100, 3, true],
    ];
    let maskSettings = [
      // These are the defualt settings for surgical masks.
      // Face masks can reduce mortality, see:
      // https://consultqd.clevelandclinic.org/face-masks-reduce-risk-of-covid-19-infection-but-should-be-used-with-other-interventions/
      ['Rate', 0, 100, 50, true],
      ['Protection', 0, 100, 20, true],
      ['Dampening', 0, 100, 81, true],
      ['Mortality Reduction', 0, 100, 0, true],
    ];
    let inoculationSettings = [
      // These are the defualt settings for surgical masks.
      // id, min, max, defualt, displayPercent,
      ['Rate', 0, 100, 12, true],
      ['Protection', 0, 25, 80, true],
      ['Dampening', 0, 25, 0, true],
      ['Mortality Reduction', 0, 100, 80, true]
    ];
    let contagionSettings = [
      // defualt to Wuhan Strain
      // id, min, max, defualt/current, displayPercent,
      ['Kill Rate', 0, 100, 3, true],
      ['Decay Rate', 0, 100, 3, true],
      ['Incubation', 0, 100, 2, false],
      ['Infectious', 1, 100, 2, false],
      ['Attack Rate', 0, 100, 41, true],
      ['Range', 1, 6, 20, false]
    ];
    this.settings = [
      new SimulationController(neighborhoodSettings, 'neighborhoodSettings'),
      new SimulationController(maskSettings, 'maskSettings'),
      new SimulationController(inoculationSettings, 'inoculationSettings'),
      new SimulationController(contagionSettings, 'contagionSettings'),
    ];

    let div = document.createElement('div');
    div.setAttribute('id', 'rangeViewer');
    document.getElementById('contagionSettings').appendChild(div);

    this.rangeFinder = new Game('Emoji');
    this.rangeFinder.isRangeFinder = true;

  }
  update() {
    this.settingsCurrent = [];
    this.settings.forEach((setting) => {
      this.settingsCurrent.push(setting.update());
    });
    document.getElementById("petriDish").innerHTML = '';
    this.game.buildBoard(this.settingsCurrent);

    // build range finder
    let set = JSON.parse(JSON.stringify(this.settingsCurrent));
    set[0]['Population Size'] = 13;
    set[1]['Rate'] = 0;
    set[2]['Rate'] = 0;
    this.rangeFinder.buildBoard(set);
    let index = Math.round(set[0]['Population Size']/2);
    let centerCell = this.rangeFinder.board2D[index-1][index-1];
    this.rangeFinder.board2D.forEach((row) => {
      row.forEach((cell) => {
        cell.state = 2;
      });
    });
    centerCell.state = 0;
    centerCell.neighbors.forEach((neighborCell) => {
      neighborCell.state = 1;
    });


    let numNeighbors = centerCell.neighbors.length;
    let rNaught = (numNeighbors * (set[3]['Attack Rate']/100)) * set[3]['Infectious'];
    if (rNaught > centerCell.neighbors.length) {
      rNaught = centerCell.neighbors.length;
    }
    //'R0 = ' + rNaught.toString()
    rNaught = 'R-Naught = ' + rNaught.toString();
    let rNaughtDiv = document.createElement('div');
    rNaughtDiv.setAttribute('id', 'rNaught');
    document.getElementById('rNaught').innerHTML = rNaught;
    this.rangeFinder.render('rangeViewer');

    this.stopGame();
    this.playGame(0);
  }
  playGame(day) {
    this.isRunning = true;
    let lastBoard = this.game.board;
    let delay = 10;
    let mu = 21;
    let goldenRation = 1.61803;
    //let graph = new Statistics();
    this.interval = setInterval(() => {
       let start = Date.now();
       this.game.render("petriDish");
       let stats = this.game.turn();
       day += 1;
       let time = "Day: " + day.toString();
       if (day > 365) {
         time = "Year: " + (day / 365).toString().substring(0, 4);
       }
       if (day % mu == 0) {
         let foo = new Statistics(this.game.longStats);
         //mu = mu + Math.round(mu * goldenRation);
         //mu = mu + 4;
       }
       document.getElementById("deaths").innerHTML = "💀 = " + stats['dead'].toString() + '%';
       document.getElementById("days").innerHTML = time;
       if (stats['infectious'] < 1 ) {
         this.stopGame()
         let foo = new Statistics(this.game.longStats);
       }
       let delta = Date.now() - start; // currently around 140-250 seconds for population of 1225
       //console.log(delta);
     }, delay);
  }
  stopGame() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
    }
  }
}
class Statistics {
  constructor(data) {
    // clear the current board state
    document.querySelectorAll("[id=stat]").forEach((element) => {
      element.remove();
    });
    let lineChart = document.createElement('div');
    lineChart.setAttribute('id', 'stat');
    document.getElementById("graph").appendChild(lineChart);

    let trace3 = this.getTrace(data['dead'], '☠️ Dead', '#808080');
    let trace1 = this.getTrace(data['infectious'], '🥵 Infectious', '#ff0000');
    let trace2 = this.getTrace(data['zombie'], '🧟 Zombie', '#24ad00');

    let labels = {
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0,
        xanchor: 'right',
        y: 1,
        yanchor: 'bottom',
        text: '%',
        showarrow: false
      }, {
        xref: 'paper',
        yref: 'paper',
        x: 1,
        xanchor: 'left',
        y: 0,
        yanchor: 'top',
        text: 'Day',
        showarrow: false
      }],
    };
    Plotly.newPlot('stat', [trace1, trace2, trace3], labels);

  }
  getTrace(data, name, color) {
    let x = [];
    let y = [];
    let day = 0;
    data.forEach((i) => {
      x.push(i);
      y.push(day);
      day += 1;
    });

    let trace = {
      x: y,
      y: x,
      name:name,
      mode: 'lines',
      type: 'scatter',
      marker: {
                  color: color
      },
    };
    return trace;
  }

}

let env = new Enviroment(new Game('Emoji'));

env.update();
