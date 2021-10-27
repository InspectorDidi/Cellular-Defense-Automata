# Meme Lab [Live Demo](https://thememeticist.github.io/Cellular-Defense-Automata/)
## Institute Of Armchair Epidemiology

![](/assets/MemeLabIOAE.svg)

Are you an armchair epidemiologist tired of waiting for your herds 🐑🐑🐑🐑 to reach immunity? Now you can simulate [serial passaging](https://en.wikipedia.org/wiki/Serial_passage) 🧫🧫🧫🧫 in your web browser instead of serial passaging IRL! MemeLab is a toy model and Javascript contagion simulator. Use it to see the effect of masks and vaccines against [pathogens.](https://en.wikipedia.org/wiki/Memetics)

[See Python branch for larger scale simulations.](https://github.com/TheMemeticist/Cellular-Defense-Automata)

## Model

![](/assets/seirbasic.svg)

### Cell Dynamics

The  [SEIR model is a standard compartmental model](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SEIR_model) in which the population is divided into **susceptible (S)**, **exposed (E)**, **infectious (I)**, and **recovered (R)[zombie]** individuals. 

A susceptible member of the population becomes infected (exposed) when making a transmissive contact with an infectious individual and then progresses to the infectious, then the recovery state (zombie), and finally RIP.

#### Defenses

![](/assets/HowMasksWork.svg)

All defenses have the same types of variables and can influence the odds of transmission occuring after the attack rate is calculated, such as the level of protection of a mask. Masks and vaccines can be combined together as they provide different types of benefits for the cells.

## Natural Selection
![](/assets/naturalSelect.svg)

If the Natural Selection button is enabled, the memes mutate their phenotypes and will be allowed the oppurtunity to evolve each transmission event.

