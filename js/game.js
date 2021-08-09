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

    if (this.age > incubationPeriod) {
      this.infectious = true;
      let infectiousPeriod = this.genes["Infectious"];
      if (this.age > (incubationPeriod + infectiousPeriod)) {
        this.infectious = false;
        let decayRate = this.genes["Decay Rate"] / 100;
        if (new Dice().roll(decayRate)) {
          this.dead = true;
        }

      }
    }
    this.age += 1;
  }
  mutate() {
    // step forward life cyclec

    let mutated = false;
    let mutateRate = 0.002;
    if (new Dice().roll(mutateRate)) {
      this.genes["Kill Rate"] = Math.round((Math.random() * 35) + 3);
      mutated = true;
    }
    if (new Dice().roll(mutateRate)) {
      this.genes["Decay Rate"] = Math.round(Math.random() * 15);
      mutated = true;
    }
    if (new Dice().roll(mutateRate)) {
      this.genes["Incubation"] = Math.round(Math.random() * 28);
      mutated = true;
    }
    if (new Dice().roll(mutateRate)) {
      this.genes["Infectious"] = Math.round(Math.random() * 28);
      mutated = true;
    }
    if (new Dice().roll(mutateRate)) {
      this.genes["Attack Rate"] = Math.round(Math.random() * 100);
      mutated = true;
    }

    // if (mutated) {
    //   console.log(this.genes["Kill Rate"]);
    //   console.log(this.genes["Decay Rate"]);
    //   console.log(this.genes["Incubation"]);
    //   console.log(this.genes["Infectious"]);
    //   console.log(this.genes["Attack Rate"]);
    //   console.log('---------------------------');
    // }
  }
  copy(mutate) {
    let child = new Meme(JSON.parse(JSON.stringify(this.genes)));
    if (mutate) {
      child.mutate();
    }
    return child;
  }
}
class Cell {
  constructor() {
    this.age = 0;

    // SEIR states
    this.alive = true;
    this.susceptible = true;
    this.exposed = false;
    this.infectious = false;
    this.recovery = false;

    this.DNA = 'ABCD';
    this.defense = false;
    this.vaxxed = false;
    this.defenses = [];
    this.neighbors = [];
    this.body = [];
  }
  live(mutate) {
    // Handles cells interactions with neighbors  (i.e. viral attacks!)
    let body = [];
    this.body.forEach((virus) => {
      if (virus.infectious) {
        let attackRate = this.getAttackRate(virus);
        this.neighbors.forEach((neighborCell) => {
          // attack the neighbors!
          if (neighborCell.susceptible) {
              if (new Dice().roll(attackRate * neighborCell.protection)) {
                neighborCell.body.push(virus.copy(mutate));
                neighborCell.exposed = true;
                neighborCell.susceptible = false;
              }
          }
        });
      } else {
        if (virus.age > virus.genes['Incubation']) {
          this.infectious = true;
          if (virus.age > virus.genes['Infectious']) {
            this.infectious = false;
            this.recovery = true;
          }
        }
      }
      virus.cycle();
      body.push(virus);
    });
    this.body = body;
    if (this.alive && (this.body.length === 0)) {
      this.susceptible = true;
      this.exposed = false;
      this.infectious = false;
      this.recovery = false;
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
      return virus.infectious;
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
    this.min = 0.0001;
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
    this.mutation = false;
    this.isRangeFinder = false;
    this.dice = new Dice();
    this.styles = {
      'Emoji':  'assets/CellSprites/',
      'Forest': 'assets/CDAThemes/Forest/',
    }
    this.stats = {};
    this.gamestyle = gamestyle;
    let path = this.styles[this.gamestyle];
    this.sprites = [
      path + "baby.svg",
      path + "person.svg",
      path + "personExposed.svg",
      path + "personInfectious.svg",
      path + "zombie.svg",
      path + "headstone.svg",
      ];
    }
  buildBoard(settings) {
    if (this.isRangeFinder) {
      let path = this.styles[this.gamestyle];
      this.sprites = [
        "assets/CellSprites/personExposed.svg",
        "assets/CellSprites/personInfectious.svg",
        "assets/CellSprites/personInfectious.svg",
        "assets/virus.svg",
        "assets/CellSprites/personInfectious.svg",
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
      cell.exposed = true;
      cell.susceptible = false;
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
    function normalCell(cell, size) {
      let cellSize = ((1 / size) * 100).toString();
      let h = 'height: ' + cellSize + '%; '
      let w = 'width: ' + cellSize + '%; '
      let cellElement = document.createElement('div');
      cellElement.setAttribute('id', 'cell');
      cellElement.setAttribute('style', h + w);
      return cellElement;
    }
    function pixelCell(cell, cellElement) {
      // renders cell as pixel
      let pixel = document.createElement('div');
      pixel.setAttribute('id', 'pixel');
      if (cell.alive) {
        pixel.setAttribute('style', 'background-color:#a6d400;');
        if (cell.defense) {
          pixel.setAttribute('style', 'background-color:#8BE3D9;');
        }
        if (cell.infectious || cell.exposed) {
          pixel.setAttribute('style', 'background-color:#ea5a47;');
        }
        if (cell.recovery) {
          pixel.setAttribute('style', 'background-color:#a6d400;');
        }
      }
      else {
        pixel.setAttribute('style', 'background-color:black;');
      }
      cellElement.appendChild(pixel);
      return cellElement;
    }
    function emojiCell(cell, cellElement, sprites, rangeFind) {
      // renders cell as pixel

      let img = document.createElement('img');
      img.setAttribute('id', 'cellState');
      if (cell.alive) {
        if (cell.age < 3) {
          img.src = sprites[0];
        } else {
          img.src = sprites[1];
          if (cell.exposed) {
            img.src = sprites[2];
          }
          if (cell.infectious) {
            img.src = sprites[3];
          }
          if (cell.recovery) {
            if (rangeFind) {
              img.setAttribute('style', 'height:0%;width:0%;');
            }
            img.src = sprites[4];
          }
          if (cell.defense) {
            let mask = document.createElement('img');
            mask.src = 'assets/CellSprites/defenses/maskSurgical.svg'
            mask.setAttribute('id', 'mask');
            cellElement.appendChild(mask);
          }
          if (cell.vaxxed) {
            let vaccine = document.createElement('img');
            vaccine.src = 'assets/CellSprites/defenses/syringe.svg'
            vaccine.setAttribute('id', 'vax');
            cellElement.appendChild(vaccine);
          }
        }
      } else {
        img.src = sprites[5];
      }
      cellElement.appendChild(img);
      return cellElement;
    }
    // clear the current board state
    let canvas = document.getElementById(canvasId);
    canvas.querySelectorAll("[id=cell]").forEach((cell) => {
      cell.remove();
    });
    canvas.querySelectorAll("[id=vax]").forEach((cell) => {
      cell.remove();
    });
    // place each cell with updated values
    this.board2D.forEach((row) => {
      row.forEach((cell) => {
        let cellElement = normalCell(cell, this.size);
        if (this.pixelRender) {
          cellElement = pixelCell(cell, cellElement);
        } else {
          let cellWall = document.createElement('div');
          cellWall.setAttribute('id', 'cellWall');
          cellWall = emojiCell(cell, cellWall, this.sprites, this.isRangeFinder);
          cellElement.appendChild(cellWall);
        }
        document.getElementById(canvasId).appendChild(cellElement);
      });
    })
  }
  mortalityEval(cell) {
    // New ! and refractored
    let body = [];
    cell.body.forEach((virus) => {
      if (virus.dead) {
          let killRate = virus.genes['Kill Rate'] / 100;
          if (cell.defenses.length > 0) {
            cell.defenses.forEach((shield) => {
              killRate = killRate * shield.mortalityReduction;
            });
          }
          if (this.dice.roll(killRate)) {
            cell.alive = false;
            cell.exposed = false;
            cell.susceptible = false;
            cell.recovery = false;
          } else {
            cell.alive = true;
            cell.susceptible = true;
            cell.exposed = false;
            cell.infectious = false;
          }
        } else {
          body.push(virus);
          if (virus.infectious) {
            cell.infectious = true;
          } else {
            if (virus.age > (virus.genes['Incubation'] + virus.genes['Infectious'])) {
              cell.recovery = true;
              cell.infectious = false;
            }
          }
        }
    });
    cell.body = body;
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
        cell.alive = true;
        cell.age = 0;
        cell.exposed = false;
      }
    }
    return cell;
  }
  turn() {

    let board = this.board2D.flat();
    let dead = 0;
    let infectious = 0;
    let zombie = 0;
    let birthRate = this.settings[0]['Birth Rate'] / 100;

    board.forEach((cell) => {
      if (cell.alive) {
        cell.age += 1;
        cell.live(this.mutation);
        if (cell.exposed) {
          infectious += 1;
          if (cell.recovery) {
            zombie += 1;
            this.mortalityEval(cell);
          }
        }
      } else {
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

  }
  update() {
    let settings = {};
    this.settings.forEach((i) => {
      settings[i.id] = i.update();
    });

    if (this.location === 'maskSettings') {
      let protection = this.settings[0].value;
      let maskSet = document.getElementById('maskSettings');
      let children = maskSet.children[1]
      let cell = children.children[0].children[1];
      console.log(children);
      cell.src = 'assets/CellSprites/person.svg';

      let margin = (100 - protection) * 0.20;
      margin = margin.toString();
      let style = 'margin-top:' + margin + '%';
      let mask = children.children[0].children[0];
      mask.setAttribute('style', style);
      if (protection > 69) {
        if (protection > 94) {
          mask.setAttribute('style', 'width:0%;height:0%;');
          //mask.src = '';
          cell.src = 'assets/CellSprites/nuclear protection.svg';
        } else {
          mask.src = 'assets/CellSprites/defenses/maskN95.svg';
        }
      } else {
        mask.src = 'assets/CellSprites/defenses/maskSurgical.svg';
      }

    }
    return settings;
  }
  build(newSettings) {
    defualtSettings.forEach((i) => {
      i = new Slider(i[0], i[1], i[2], i[3], i[4]);
      i.build(location);
      this.settings.push(i);
    });

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
    let parent = document.getElementById(parentElement);
    if (this.id === 'Rate') {
      let firstBorn = parent.children[0];
      parent.insertBefore(div, parent.firstChild);
    } else {
      parent.appendChild(div);
    }

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
class NaturalSelector {
  constructor() {
    this.on = false;
  }
  toggle () {
    if (this.on) {
      this.on = false;
    } else {
      this.on = true;
    }
    this.update();
  }
  update () {
    let sign = document.getElementById('nosign');
    let select = document.getElementById('select');
    if (this.on) {
      sign.setAttribute('style', 'display:none;');
      select.setAttribute('style', '');
      select.src ='assets/cursor.svg';
    } else {
      sign.setAttribute('style', '');
      select.setAttribute('style', 'display:none;');
    }
  }
}
class MemeSelector {
  constructor() {
    this.memes = {'SARS-1':[
      ['Kill Rate', 0, 100, 11, true], // id, min, max, defualt/current, displayPercent,
      ['Decay Rate', 0, 100, 1, true],
      ['Incubation', 1, 100, 7, false],
      ['Infectious', 1, 100, 4, false],
      ['Attack Rate', 0, 100, 18, true],
      ['Range', 1, 6, 1, false],
    ],'SARS-2: Wild-Type':[
      ['Kill Rate', 0, 100, 3, true],
      ['Decay Rate', 0, 100, 1, true],
      ['Incubation', 1, 100, 6, false],
      ['Infectious', 1, 100, 4, false],
      ['Attack Rate', 0, 100, 12, true],
      ['Range', 1, 6, 1, false],
    ],'SARS-2: Delta':[
      ['Kill Rate', 0, 100, 3, true],
      ['Decay Rate', 0, 100, 1, true],
      ['Incubation', 1, 100, 2, false],
      ['Infectious', 1, 100, 4, false],
      ['Attack Rate', 0, 100, 10, true],
      ['Range', 1, 6, 20, false],
    ],'Syphilis':[
      ['Kill Rate', 0, 100, 8, true],
      ['Decay Rate', 0, 100, 1, true],
      ['Incubation', 1, 100, 20, false],
      ['Infectious', 1, 100, 13, false],
      ['Attack Rate', 0, 100, 16, true],
      ['Range', 1, 6, 2, false],
    ],'Tuberculosis':[
      ['Kill Rate', 0, 100, 8, true],
      ['Decay Rate', 0, 100, 1, true],
      ['Incubation', 1, 100, 100, false],
      ['Infectious', 1, 100, 14, false],
      ['Attack Rate', 0, 100, 47, true],
      ['Range', 1, 6, 2, false],
    ],'Measles':[
      ['Kill Rate', 0, 100, 1, true],
      ['Decay Rate', 0, 100, 1, true],
      ['Incubation', 1, 100, 14, false],
      ['Infectious', 1, 100, 5, false],
      ['Attack Rate', 0, 100, 13, true],
      ['Range', 1, 6, 40, false],
    ],
    };
    this.build();
    this.update('SARS-2: Delta');
    //this.build();
  }
  update (variantName) {
    this.variant = this.memes[variantName];
    let selectedText = document.getElementsByClassName('dropdown')[0].children[0];
    selectedText.innerHTML = variantName;
    let contagionSettings = document.getElementById('contagionSettings');
    let sliders = contagionSettings.getElementsByClassName('sliderInput');
    let index = 0;
    while (index < this.variant.length) {
      if (typeof(sliders[index]) !== "undefined") {
        sliders[index].value = this.variant[index][3];
      }
      index += 1;
    }
  }
  build() {
    let dropdown = document.getElementsByClassName('dropdown-content')[0];
    for (let variant in this.memes) {
      let div = document.createElement('div');
      div.setAttribute('class', 'MemeSettings');
      let f = 'env.memeSelector.update("' + variant + '");env.update();'
      div.setAttribute('onclick', f);
      let p = document.createElement('p');
      p.innerHTML = variant;
      div.appendChild(p);
      dropdown.appendChild(div);
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
class Enviroment {
  constructor(game) {
    // init defualt game enviroment
    this.naturalSelector = new NaturalSelector();
    this.memeSelector = new MemeSelector();
    this.game = game;
    this.isRunning = false;
    let neighborhoodSettings = [
      // id, min, max, defualt, displayPercent,
      ['Population Size', 5, 100, 5, false],
      ['Seed Infections', 1, 100, 4, true],
      ['Birth Rate', 1, 100, 0, true],
    ];
    let maskSettings = [
      // These are the defualt settings for surgical masks.
      // Face masks can reduce mortality, see:
      // https://consultqd.clevelandclinic.org/face-masks-reduce-risk-of-covid-19-infection-but-should-be-used-with-other-interventions/
      ['Protection', 0, 100, 20, true],
      ['Dampening', 0, 100, 81, true],
      ['Mortality Reduction', 0, 100, 0, true],
      ['Rate', 0, 100, 50, true],
    ];
    let inoculationSettings = [
      // These are the defualt settings for surgical masks.
      // id, min, max, defualt, displayPercent,
      ['Protection', 0, 25, 80, true],
      ['Dampening', 0, 25, 0, true],
      ['Mortality Reduction', 0, 100, 80, true],
      ['Rate', 0, 100, 12, true],
    ];

    this.settings = [
      new SimulationController(neighborhoodSettings, 'neighborhoodSettings'),
      new SimulationController(maskSettings, 'maskSettings'),
      new SimulationController(inoculationSettings, 'inoculationSettings'),
      new SimulationController(this.memeSelector.variant, 'contagionSettings'),
    ];

    let div = document.createElement('div');
    div.setAttribute('id', 'rangeViewer');
    document.getElementById('contagionSettings').appendChild(div);

    this.rangeFinder = new Game('Emoji');
    this.rangeFinder.isRangeFinder = true;


  }
  update() {
    console.clear();
  //  this.settings[3] = new SimulationController(this.memeSelector.variant, 'contagionSettings');
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
        cell.susceptible = true;
        cell.recovery = true;
        cell.age = 10;
      });
    });
    centerCell.recovery = false;
    centerCell.susceptible = false;
    centerCell.neighbors.forEach((neighborCell) => {
      neighborCell.susceptible = false;
      neighborCell.recovery = false;
      neighborCell.infectious = true;
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
    let selection = this.naturalSelector.on;
    this.isRunning = true;
    this.game.mutation = selection;
    let lastBoard = this.game.board;
    let delay = 100;
    let mu = 21;

    this.interval = setInterval(() => {
       let start = Date.now();
       this.game.render("petriDish");
       let stats = this.game.turn();
       day += 1;
       let time = "Day: " + day.toString();
       if (day > 365) {
         time = "Year: " + (day / 365).toString().substring(0, 4);
       }
       document.getElementById("deaths").innerHTML = "💀 = " + stats['dead'].toString() + '%';
       document.getElementById("days").innerHTML = time;
       if (stats['infectious'] <= 1 ) {
         this.stopGame()
         let foo = new Statistics(this.game.longStats);
       }
       if (day % mu == 0) {
         let foo = new Statistics(this.game.longStats);
         let delta = Date.now() - start; // currently around 140-250 seconds for population of 1225
         //console.log(delta);
       }
     }, delay);
  }
  stopGame() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
    }
  }
}

let env = new Enviroment(new Game('Emoji'));
env.update();
