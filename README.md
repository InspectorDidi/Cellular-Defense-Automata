


# Cellular Defense Automata
![Cellular Defense Automata](https://videoapi-muybridge.vimeocdn.com/animated-thumbnails/image/f9f4c335-4399-4afb-bc5e-c7b181cfe1c4.gif?ClientID=vimeo-core-prod&Date=1613775833&Signature=d8c63c17a33efa46f716a1510b8498b01c25744a)

On the left is a population of 1 million simulated over about 5 years with a defense rate of 80% at random in the population. The right is the same simulation but with a defense rate of only 60%. The contagion itself is modeled after SARS-COV-2. Low defense rates lead to potential endemics. ([Full video](https://vimeo.com/514490979))

### Corona vs Ebola

![Cellular Defense Automata](https://videoapi-muybridge.vimeocdn.com/animated-thumbnails/image/a3500cff-a00c-4bed-9b67-3297d6579f4b.gif?ClientID=vimeo-core-prod&Date=1613780686&Signature=7cbeef64d18176a5bac00af39cb12dfd5697b118)

An identical simulation comparing a Coronavirus variant to Ebola. The structure in the middle is made out of two layers of dead cells, this structure does appear to be helpful in containing Ebola but not Corona. Two layer walls are needed because [Corona can move through walls.](https://www.cbc.ca/news/canada/calgary/alberta-senior-citizens-wall-defence-1.5832611) ([Full video](https://vimeo.com/514514010))
![Mask Defense Stats](https://github.com/TheMemeticist/Cellular-Defense-Automata/blob/main/Images/Examples/NearestNeighbors.gif?raw=true?raw=true)
Cellular Defense Automata is a simulation similar to other discrete models of computation like [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) 💀[[R.I.P.](https://www.nytimes.com/2020/04/15/technology/john-horton-conway-dead-coronavirus.html)]💀.

For modeling contagion dissemination in networks, CDA models memes like viruses. As a result, it is a good model for how critical source control defenses can actually be [(such as with face masks and virus  spread)](https://www.ucsf.edu/news/2020/06/417906/still-confused-about-masks-heres-science-behind-how-face-masks-prevent) but also in other network and complex scenarios such as communication networks.
## How It Works
Cellular Defense Automata are represented on each cell of the board and remain static. These cells can represent individual cells in an organism, people in a social network, or a network of cities, countries, or even [planets](https://en.wikipedia.org/wiki/Panspermia). They can send and receive memes but also have some defenses.

Cruise ships, airplanes, trains, buses, gyms, [places of worship](https://edmonton.ctvnews.ca/alta-pastor-charged-with-violating-public-health-act-still-in-custody-for-refusing-conditions-rcmp-1.5313426), or nearly any enclosed environment can be modelled in a similar way as a social network can be. You might not think you are connected to the people you are around, but we breathe the same air, and because of reasons like that we are connected not only to all living beings.

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

For Cellular Defense Automata we will just use the default values from common memes that have circulated about mask effectiveness, but these variables can be updated to your liking of course. 

![Mask Defense Stats](https://github.com/TheMemeticist/Cellular-Defense-Automata/blob/main/Images/Examples/MaskDefenseStats.png?raw=true)
>Dr. Shelley Payne, director of the [La Montagne Center for Infectious Disease](https://icmb.utexas.edu/research/organized-research-units/lamontagne-center) at the University of Texas at Austin, explained that while the relative order of risk shown in the graphic is correct, “the actual numbers will depend on a number of factors, including amount of virus shed by the case or carrier, distance between the two individuals, type of mask material, fit of the mask.” - ([source](https://factcheck.afp.com/misleading-mask-graphic-claims-show-exact-chance-covid-19-spread))


## Viral Contagions
A viral contagion operates on top of a substrate such as computer or living organism. Therefore the dynamics of the spread of viruses in biological networks as well information networks ([i.e. memes](https://en.wikipedia.org/wiki/Memetics)) can be modeled similarly.


Due to [The Principle of Computational Equivalence](https://www.wolframscience.com/nks/p715--basic-framework/) an idea can act like a viral contagion or computer virus among a population. We are not only in a pandemic with biological viruses, but also with misinformation that correlates with threat responses of a society and culture.

Misinformation is a very natural phenomena, just like viruses, even children who play [Chinese whispers](https://en.wikipedia.org/wiki/Chinese_whispers) understand that information can become corrupted as it passes through a network even if most agents act in good faith! That said, memes can also be weaponized just like a virus can be, and do a lot of "real world" harm or good.

See also [Dawkins Viruses of the Mind](https://en.wikipedia.org/wiki/Viruses_of_the_Mind)

