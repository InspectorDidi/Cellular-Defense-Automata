(lambda __g, __y, __print: [(lambda __mod: [[[[[[[[None for __g['Dice'] in [((lambda b, d: d.get('__metaclass__', getattr(b[0], '__class__', type(b[0])))('Dice', b, d))((object,), (lambda __l: ('docstring for Dice', [[__l for __l['Roll'], __l['Roll'].__name__ in [(lambda self, Odds: (lambda __l: [[(lambda __after: True if (__l['Rolled'] < __l['Odds']) else False)(lambda: None) for __l['Rolled'] in [(random.uniform(0.0, 1.0))]][0] for __l['self'], __l['Odds'] in [(self, Odds)]][0])({}), 'Roll')]][0] for __l['__init__'], __l['__init__'].__name__ in [(lambda self: (lambda __l: [None for __l['self'] in [(self)]][0])({}), '__init__')]][0])[1])({'__module__': __name__, '__doc__': 'docstring for Dice'})))]][0] for __g['Meme'] in [((lambda b, d: d.get('__metaclass__', getattr(b[0], '__class__', type(b[0])))('Meme', b, d))((object,), (lambda __l: [[__l for __l['Mutate'], __l['Mutate'].__name__ in [(lambda self: (lambda __l: [None for __l['self'] in [(self)]][0])({}), 'Mutate')]][0] for __l['__init__'], __l['__init__'].__name__ in [(lambda self: (lambda __l: [[[[[[[None for __l['self'].Hash in [('#Virus')]][0] for __l['self'].Lethality in [(0.04)]][0] for __l['self'].DecayRate in [(0.01)]][0] for __l['self'].ContagiousPeriod in [(6)]][0] for __l['self'].IncubationPeriod in [(2)]][0] for __l['self'].AttackRate in [(0.42)]][0] for __l['self'] in [(self)]][0])({}), '__init__')]][0])({'__module__': __name__})))]][0] for __g['Armor'] in [((lambda b, d: d.get('__metaclass__', getattr(b[0], '__class__', type(b[0])))('Armor', b, d))((object,), (lambda __l: [__l for __l['__init__'], __l['__init__'].__name__ in [(lambda self: (lambda __l: [[[None for __l['self'].Defense in [(0.7)]][0] for __l['self'].Attack in [(0.05)]][0] for __l['self'] in [(self)]][0])({}), '__init__')]][0])({'__module__': __name__})))]][0] for __g['Cell'] in [((lambda b, d: d.get('__metaclass__', getattr(b[0], '__class__', type(b[0])))('Cell', b, d))((object,), (lambda __l: [[[[[__l for __l['HasDefense'], __l['HasDefense'].__name__ in [(lambda self: (lambda __l: [(lambda __after: True if (len(__l['self'].Defenses) > 0) else False)(lambda: None) for __l['self'] in [(self)]][0])({}), 'HasDefense')]][0] for __l['Update'], __l['Update'].__name__ in [(lambda self: (lambda __l: [None for __l['self'] in [(self)]][0])({}), 'Update')]][0] for __l['Defend'], __l['Defend'].__name__ in [(lambda self: (lambda __l: [None for __l['self'] in [(self)]][0])({}), 'Defend')]][0] for __l['Attack'], __l['Attack'].__name__ in [(lambda self: (lambda __l: [[(lambda __items, __sentinel, __after: __y(lambda __this: lambda: (lambda __i: [(lambda __after: [(lambda __after: (lambda __items, __sentinel, __after: __y(lambda __this: lambda: (lambda __i: [[__this() for __l['SuccessOdds'] in [((__l['SuccessOdds'] * __l['Armor'].Defense))]][0] for __l['Armor'] in [(__i)]][0] if __i is not __sentinel else __after())(next(__items, __sentinel)))())(iter(__l['self'].Defenses), [], lambda: __after()) if __l['self'].HasDefense() else __after())(lambda: (lambda __after: (lambda __after: __after() if __l['Neighbor'].HasDefense() else [(__l['Neighbor'].Biome.Append(__l['Meme']), __after())[1] for __l['Neighbor'].State in [(1)]][0])(lambda: __after()) if Dice.Roll(__l['SuccessOdds']) else __after())(lambda: __after())) for __l['SuccessOdds'] in [(__l['Meme'].AttackRate)]][0] if (__l['Neighbor'].State == 0) else __after())(lambda: __this()) for __l['Neighbor'] in [(__i)]][0] if __i is not __sentinel else __after())(next(__items, __sentinel)))())(iter(__l['self'].Neighbors), [], lambda: None) for __l['Meme'] in [(__l['self'].Biome[0])]][0] for __l['self'] in [(self)]][0])({}), 'Attack')]][0] for __l['__init__'], __l['__init__'].__name__ in [(lambda self: (lambda __l: [[[[[[None for __l['self'].Biome in [([])]][0] for __l['self'].Defenses in [([])]][0] for __l['self'].Neighbors in [([])]][0] for __l['self'].InfectionAge in [(0)]][0] for __l['self'].State in [(0)]][0] for __l['self'] in [(self)]][0])({}), '__init__')]][0])({'__module__': __name__})))]][0] for __g['GameBoard'] in [((lambda b, d: d.get('__metaclass__', getattr(b[0], '__class__', type(b[0])))('GameBoard', b, d))((object,), (lambda __l: [[[[[__l for __l['Play'], __l['Play'].__name__ in [(lambda self, Days: (lambda __l: [[(lambda __after: __y(lambda __this: lambda: (lambda __items, __sentinel, __after: __y(lambda __this: lambda: (lambda __i: [(lambda __after: (__l['Cell'].Attack(), __after())[1] if (__l['Cell'].State == 1) else __after())(lambda: __this()) for __l['Cell'] in [(__i)]][0] if __i is not __sentinel else __after())(next(__items, __sentinel)))())(iter(__l['self'].FlatBoard), [], lambda: __this()) if (__l['Date'] < __l['Days']) else __after())())(lambda: None) for __l['Date'] in [(0)]][0] for __l['self'], __l['Days'] in [(self, Days)]][0])({}), 'Play')]][0] for __l['GetNeighbors'], __l['GetNeighbors'].__name__ in [(lambda self: (lambda __l: [(lambda __items, __sentinel, __after: __y(lambda __this: lambda: (lambda __i: [(lambda __items, __sentinel, __after: __y(lambda __this: lambda: (lambda __i: [[(__l['knn'].fit(__l['self'].Board), [[(__print(__l['neighbors']), __this())[1] for __l['Cell'].Neighbors in [(__l['neighbors'])]][0] for __l['neighbors'] in [(__l['knn'].kneighbors(__l['Cell'], return_distance=False))]][0])[1] for __l['knn'] in [(NearestNeighbors(n_neighbors=5))]][0] for __l['Cell'] in [(__i)]][0] if __i is not __sentinel else __after())(next(__items, __sentinel)))())(iter(__l['Row']), [], lambda: __this()) for __l['Row'] in [(__i)]][0] if __i is not __sentinel else __after())(next(__items, __sentinel)))())(iter(__l['self'].Board), [], lambda: None) for __l['self'] in [(self)]][0])({}), 'GetNeighbors')]][0] for __l['MountDefense'], __l['MountDefense'].__name__ in [(lambda self, Rate, Defense: (lambda __l: [(lambda __items, __sentinel, __after: __y(lambda __this: lambda: (lambda __i: [(lambda __after: (__l['Cell'].Defenses.Append(__l['Defense']), __after())[1] if Dice.Roll(__l['Rate']) else __after())(lambda: __this()) for __l['Cell'] in [(__i)]][0] if __i is not __sentinel else __after())(next(__items, __sentinel)))())(iter(__l['self'].FlatBoard), [], lambda: None) for __l['self'], __l['Rate'], __l['Defense'] in [(self, Rate, Defense)]][0])({}), 'MountDefense')]][0] for __l['Build'], __l['Build'].__name__ in [(lambda self, InfectionRate, Memes: (lambda __l: [[(lambda __after: __y(lambda __this: lambda: [(lambda __after: __y(lambda __this: lambda: [(lambda __after: (__l['C'].Biome.append(random.choice(__l['Memes'])), [__after() for __l['C'].State in [(1)]][0])[1] if Dice.Roll(__l['InfectionRate']) else __after())(lambda: (__l['Row'].append(__l['C']), __this())[1]) for __l['C'] in [(Cell())]][0] if (len(__l['Row']) < __l['self'].Size) else __after())())(lambda: (__l['self'].Board.append(__l['Row']), __this())[1]) for __l['Row'] in [([])]][0] if (len(__l['self'].Board) < __l['self'].Size) else __after())())(lambda: [[None for __l['self'].FlatBoard in [(__l['self'].Board.flatten())]][0] for __l['self'].Board in [(np.array(__l['self'].Board))]][0]) for __l['self'].Board in [([])]][0] for __l['self'], __l['InfectionRate'], __l['Memes'] in [(self, InfectionRate, Memes)]][0])({}), 'Build')]][0] for __l['__init__'], __l['__init__'].__name__ in [(lambda self, size: (lambda __l: [[(__l['self'].Build(), None)[1] for __l['self'].Size in [(__l['size'])]][0] for __l['self'], __l['size'] in [(self, size)]][0])({}), '__init__')]][0])({'__module__': __name__})))]][0] for __g['CellularDefenseAutomata'] in [((lambda b, d: d.get('__metaclass__', getattr(b[0], '__class__', type(b[0])))('CellularDefenseAutomata', b, d))((object,), (lambda __l: [[[__l for __l['Render'], __l['Render'].__name__ in [(lambda self, PrintInConsole=(__l['True'] if 'True' in __l else True): (lambda __l: [None for __l['self'], __l['PrintInConsole'] in [(self, PrintInConsole)]][0])({}), 'Render')]][0] for __l['Run'], __l['Run'].__name__ in [(lambda self, cycles=(365 * 3): (lambda __l: [(__l['self'].Board.Play(__l['cycles']), None)[1] for __l['self'], __l['cycles'] in [(self, cycles)]][0])({}), 'Run')]][0] for __l['__init__'], __l['__init__'].__name__ in [(lambda self, size=100: (lambda __l: [[[(__l['self'].Board.MountDefense(0.15, __l['SurgicalMask']), None)[1] for __l['SurgicalMask'] in [(Armor())]][0] for __l['self'].Board in [(GameBoard(0.05, [Meme()]))]][0] for __l['self'], __l['size'] in [(self, size)]][0])({}), '__init__')]][0])({'__module__': __name__})))]][0] for __g['random'] in [(__import__('random', __g, __g))]][0] for __g['NearestNeighbors'] in [(__mod.NearestNeighbors)]][0])(__import__('sklearn.neighbors', __g, __g, ('NearestNeighbors',), 0)) for __g['np'] in [(__import__('numpy', __g, __g))]][0])(globals(), (lambda f: (lambda x: x(x))(lambda y: f(lambda: y(y)()))), __import__('__builtin__', level=0).__dict__['print'])