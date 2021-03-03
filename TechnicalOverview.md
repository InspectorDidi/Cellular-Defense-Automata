![Cellular Defense Automata](https://videoapi-muybridge.vimeocdn.com/animated-thumbnails/image/f9f4c335-4399-4afb-bc5e-c7b181cfe1c4.gif?ClientID=vimeo-core-prod&Date=1613775833&Signature=d8c63c17a33efa46f716a1510b8498b01c25744a)

On the left is a population of 1 million simulated over about 5 years with a defense rate of 80% at random in the population. The right is the same simulation but with a defense rate of only 60%. The contagion itself is modeled after SARS-COV-2. Low defense rates lead to potential endemics. ([Full video](https://vimeo.com/514490979))

### Corona vs Ebola

![Cellular Defense Automata](https://videoapi-muybridge.vimeocdn.com/animated-thumbnails/image/a3500cff-a00c-4bed-9b67-3297d6579f4b.gif?ClientID=vimeo-core-prod&Date=1613780686&Signature=7cbeef64d18176a5bac00af39cb12dfd5697b118)

An identical simulation comparing a Coronavirus variant to Ebola. The structure in the middle is made out of two layers of dead cells, this structure does appear to be helpful in containing Ebola but not Corona. Two layer walls are needed because [Corona can move through walls.](https://www.cbc.ca/news/canada/calgary/alberta-senior-citizens-wall-defence-1.5832611) ([Full video](https://vimeo.com/514514010))

Zombies are infected and stay a zombie for [six months afterward.](https://www.the-scientist.com/news-opinion/cold-causing-coronaviruses-dont-seem-to-confer-lasting-immunity-67832) Once the infection is complete there is a mortality evaluation with a [mortality rate of 10%.](https://datos.covid-19.conacyt.mx/#DOView) If the mortality evaluation is successful then the zombie returns to its default state.

Zombies are only contagious for the first [1-6 days](https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19-how-is-it-transmitted) of infection. After that they return to the zombie state and cease interactions.

# Viral networks: connecting digital humanities and medical history

>“Our responses to outbreaks are conditioned by what we know about  past  outbreaks,”  MacPhail  observed,  as  quoted  in  the NIH Record. **“They rely upon institutions and structures put in place as a result of prior outbreaks and are often as much about politics and economic constraints as they are about science.”** She continued: **We have to think about outbreaks, epidemics and pandemics holistically. We have to look at everything—history, politics, economics,  biology,  culture—all  at  once**  in  order  to understand  not  only  what  happened,  but  also  what  is happening and what is likely to happen in the future.”

>"Creating such a platform is a key goal of our new strategic plan  and  commitment  to  growing  infrastructure  and supporting  data-driven  scholarship  and  inquiry  for  the benefit of medical research as well as the disciplines that intersect  with  medical  research,  like  the  humanities  and medical humanities." - ([source](https://collections.nlm.nih.gov/catalog/nlm:nlmuid-101738722-pdf))

Viral spread a [Law of Nature](https://youtu.be/1xJB3phO07U?t=394).

# Rules
## Interactions

It has been estimated that the [average person spends 6.8% of their life socializing. ](https://www.prnewswire.com/news-releases/reebok-survey-humans-spend-less-than-one-percent-of-life-on-physical-fitness-300261752.html#continue-jump) This works out to about 211 minutes a day. 211 minutes divided by 12 nearest neighbors = 17 minutes per interaction. Although these exact numbers vary from country to country it is close enough to the common [15 minute cumulative close contact definition.](https://www.cdc.gov/coronavirus/2019-ncov/php/contact-tracing/contact-tracing-plan/appendix.html) 

### Nearest Neighbors
Twelve nearest neighbors representing the [average number of social interactions in day](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6113687) are selected as they are statistically most likely to be on the receiving end of contagion spread. 

Manhattan distance = 2

An interaction can be visualized as a social interaction in a "network" of people seated in an airplane or other indoor environment like a cruise ship for at least 15 minutes (cumulatively) for example. An interaction with an infectious zombie is considered an "attack".

### Attack
The zombie attacker will indiscriminately attack its nearest neighbors, mostly unintentionally. An attacker has a [42% chance of a successful attack each interaction on each individual nearest neighbor.](https://www.sciencedirect.com/science/article/pii/S0196655320308981)
### Defense
If an attack is successful the neighbor might have some defenses left to stop the spread of contagion.
#### Defense 1
Both zombie and neighbor are unarmored (i.e. no masks in a social interaction). This amounts to zero defense and the attack is a total success infecting the neighbor, turning them into a zombie.
#### Defense 2
If the neighbor is donning armor then the attacker must attack again but this time with 70% chance of success.
#### Defense 3
If only the attacker is donning armor then the attacker must attack again, but this time with 5% chance of success.
#### Defense 4
If both the attacker and neighbor are donning armor then the attacker must attack again but this time with a 1.5% chance of success.