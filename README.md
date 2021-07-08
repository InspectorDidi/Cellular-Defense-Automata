# MemeLab
Simulate contagions moving through a population in your browser.


[Click here to play the game](https://thememeticist.github.io/Cellular-Defense-Automata/)

This is a fork and javascript implementation of [Cellular Defense Automata](https://github.com/TheMemeticist/Cellular-Defense-Automata)


## Cellular Defense Automata
![Cellular Defense Automata](https://videoapi-muybridge.vimeocdn.com/animated-thumbnails/image/f9f4c335-4399-4afb-bc5e-c7b181cfe1c4.gif?ClientID=vimeo-core-prod&Date=1613775833&Signature=d8c63c17a33efa46f716a1510b8498b01c25744a)


On the left is a population of 1 million simulated over about 5 years with a defense rate of 80% at random in the population. The right is the same simulation but with a defense rate of only 60%. The contagion itself is modeled after SARS-COV-2. Low defense rates lead to potential endemics. ([Full video](https://vimeo.com/514490979))

## Cell States
### Healthy
![Mask Defense Stats](https://github.com/TheMemeticist/Cellular-Defense-Automata/blob/main/Images/CDAThemes/Emoticon/Neutral/0.png?raw=true)
0 - This is the default state of all cells. It is susceptible to contagious memes in this state.
### Contagious
![Mask Defense Stats](https://github.com/TheMemeticist/Cellular-Defense-Automata/blob/main/Images/CDAThemes/Emoticon/Neutral/1.png?raw=true)
1 - In this state the cell can spread memes to its neighbors. 
### Zombie
![Mask Defense Stats](https://github.com/TheMemeticist/Cellular-Defense-Automata/blob/main/Images/CDAThemes/Emoticon/Neutral/2.png?raw=true)
2 - In this state the cell is immune and inactive in the game, until it either recovers and returns to the healthy state or dies going to the next state...
### RIP
![Mask Defense Stats](https://github.com/TheMemeticist/Cellular-Defense-Automata/blob/main/Images/CDAThemes/Emoticon/RIP.png?raw=true)
3 - In this state the cell is inactive and out of the game. 
## Defenses
 ![Mask Defense Stats](https://github.com/TheMemeticist/Cellular-Defense-Automata/blob/main/Images/CDAThemes/Emoticon/Defense/0.png?raw=true) ![Mask Defense Stats](https://github.com/TheMemeticist/Cellular-Defense-Automata/blob/main/Images/CDAThemes/Emoticon/syringe.png?raw=true)
Cells can mount several defenses against contagion spread.

In our default example we use medical-masks as a way to visualize a defense, but mathematically, all defenses are the same in this game and can be visualized any way we want.

