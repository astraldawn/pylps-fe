export const PROGRAMS = Object.freeze({

SIMPLE_FIRE:
`# SIMPLE FIRE

from pylps.core import *

initialise(max_time=5)  # Assume all time variables created here

create_fluents('fire')
create_actions('eliminate', 'escape')
create_events('deal_with_fire')

initially(fire)

reactive_rule(fire.at(T1)).then(
    deal_with_fire.frm(T1, T2))

goal(deal_with_fire.frm(T1, T2)).requires(
    eliminate.frm(T1, T2))

goal(deal_with_fire.frm(T1, T2)).requires(
    escape.frm(T1, T2))

eliminate.terminates(fire)

execute()

show_kb_log()`,

RECURRENT_FIRE:
`# RECURRENT FIRE

from pylps.core import *


initialise(max_time=10)  # Assume all time variables created here

create_fluents('fire', 'water')
create_actions('eliminate', 'escape', 'refill', 'ignite(_)')
create_events('deal_with_fire')
create_variables('X')
create_facts('flammable(_)')

observe(ignite('sofa').frm(1, 2))
observe(ignite('bed').frm(4, 5))
observe(refill.frm(7, 8))

initially(water)

flammable('sofa')
flammable('bed')

reactive_rule(fire.at(T1)).then(
    deal_with_fire.frm(T2, T3))

goal(deal_with_fire.frm(T1, T2)).requires(
    eliminate.frm(T1, T2))

goal(deal_with_fire.frm(T1, T2)).requires(
    escape.frm(T1, T2))

ignite(X).initiates(fire).iff(flammable(X))

eliminate.terminates(fire)
eliminate.terminates(water)
refill.initiates(water)

false_if(eliminate, fire, ~water)

execute(single_clause=False)

show_kb_log()`,

MAP_COLOURING:
`# MAP COLOURING

from pylps.core import *

initialise(max_time=10)

create_facts('country(_)', 'colour(_)', 'adjacent(_, _)')
create_fluents('painted(_,_)')
create_actions('paint(_, _)')
create_variables('X', 'Y', 'C')

country('A')
country('B')
country('C')
country('D')

colour('red')
colour('yellow')
colour('blue')

adjacent('C', 'A')
adjacent('C', 'B')
adjacent('A', 'B')
adjacent('A', 'D')
adjacent('B', 'D')

reactive_rule(country(X)).then(
    colour(C),
    paint(X, C).frm(T1, T2)
)

paint(X, C).initiates(painted(X, C))

false_if(paint(X, C), adjacent(X, Y), paint(Y, C))

# uncomment the lines below to solve the problem stepwise
# false_if(paint(X, _), paint(Y, _), X != Y)
# false_if(painted(X, C), adjacent(X, Y), painted(Y, C))

execute()

show_kb_log()`,

ACTION_DEFER:
`# ACTION DEFER
from pylps.core import *

initialise(max_time=5)

create_fluents('a')
create_facts('f(_)', 'g(_)')
create_events('p1(_)', 'p2(_)')
create_actions('p1a(_)', 'p2a(_)')
create_variables('X', 'Y')

f(1)
f(2)
g(1)

initially(a)

reactive_rule(a.at(T1)).then(
    p1(X).frm(T1, T2)
)

reactive_rule(a.at(T1)).then(
    p2(X).frm(T1, T2)
)

goal(p1(X).frm(T1, T2)).requires(
    f(X),
    p1a(X).frm(T1, T2)
)

goal(p2(X).frm(T1, T2)).requires(
    g(X),
    p2a(X).frm(T1, T2)
)

false_if(p1a(1), p2a(1))

execute(solution_preference='maximum')

# uncomment this line for a different solution
# execute(solution_preference='first')

show_kb_log()`,

MULTI_PATH:
`# MULTI_PATH
from pylps.core import *

initialise(max_time=5)

create_actions('say(_, _)')
create_events('respond(_, _)')
create_facts('arc(_, _)', 'ask(_, _)')
create_variables('X', 'Y', 'Z')

arc('a', 'b')
arc('b', 'c')
arc('a', 'd')
arc('d', 'e')
arc('e', 'c')

ask('a', 'c')

reactive_rule(ask(X, Y)).then(
    respond(X, Y).frm(T1, T2))

goal(respond(X, Y).frm(T1, T2)).requires(
    arc(X, Y), say(X, Y).frm(T1, T2))

goal(respond(X, Y).frm(T1, T3)).requires(
    arc(X, Z),
    respond(Z, Y).frm(T1, T2),
    say(X, Z).frm(T2, T3))

execute(single_clause=False, n_solutions=-1)

show_kb_log()`,

LIST_TUPLE:
`# LIST_TUPLE
from pylps.core import *
from pylps.lps_data_structures import LPSTuple

initialise(max_time=5)

create_actions('show(_)', 'show_tuple(_, _)')
create_events('handle_list(_)')
create_variables('X', 'Y', 'XS')

reactive_rule(True).then(
    handle_list([
        ('a', 1),
        ('b', 2),
        ('c', 3),
        ('d', 4),
    ]).frm(T1, T2)
)

goal(handle_list([LPSTuple((X, Y))]).frm(T1, T2)).requires(
    show(X).frm(T1, T2),
    show(Y).frm(T1, T2)
)

goal(handle_list([LPSTuple((X, Y)) | XS]).frm(T1, T2)).requires(
    show_tuple(X, Y).frm(T1, T2),
    handle_list(XS).frm(T1, T2)
)

execute(single_clause=False)

show_kb_log()`,

BLOCKS_WORLD:
`from pylps.core import *
from pylps.lps_data_structures import LPSConstant

initialise(max_time=10)

create_fluents('location(_, _)')
create_actions('move(_, _)', 'say(_)')
create_events(
    'clear(_)', 'make_tower(_)',
    'make_on(_, _)', 'make_clear(_)',
)
create_variables('Block', 'Block1', 'Place', 'Places', 'A', 'B', 'C')

initially(
    location('f', 'floor'), location('b', 'f'), location('e', 'b'),
    location('a', 'floor'), location('d', 'a'), location('c', 'd'),
)

reactive_rule(True).then(
    make_tower(['a', 'b', 'c', 'floor']).frm(T1, T2),
)

reactive_rule(True).then(
    make_tower(['f', 'e', 'd', 'floor']).frm(T1, T2),
)


goal(clear(Block).at(T)).requires(
    Block != 'floor',
    ~location(_, Block).at(T),
)

goal(clear('floor').at(_))

goal(
    make_tower([Block | LPSConstant('floor')]).frm(T1, T2)
).requires(
    make_on(Block, 'floor').frm(T1, T2),
)

goal(
    make_tower([Block | [Place | Places]]).frm(T1, T3)
).requires(
    Place != 'floor',
    make_tower([Place | Places]).frm(T1, T2),
    make_on(Block, Place).frm(T2, T3),
)

goal(make_on(Block, Place).frm(T1, T4)).requires(
    ~location(Block, Place).at(T1),
    make_clear(Place).frm(T1, T2),
    make_clear(Block).frm(T2, T3),
    move(Block, Place).frm(T3, T4),
)

goal(make_on(Block, Place).frm(T, T)).requires(
    location(Block, Place).at(T),
)

goal(make_clear(Place).frm(T, T)).requires(
    clear(Place).at(T),
)

goal(make_clear(Block).frm(T1, T2)).requires(
    location(Block1, Block).at(T1),
    make_on(Block1, 'floor').frm(T1, T2),
)

move(Block, Place).initiates(location(Block, Place))
move(Block, _).terminates(location(Block, Place))

execute(strategy=STRATEGY_GREEDY, debug=False)

show_kb_log()
`,

BUBBLE_SORT:
`from pylps.core import *

initialise(max_time=10)

create_fluents('location(_, _)')
create_actions('swap(_, _, _, _)')
create_events('swapped(_, _, _, _)')
create_variables('X', 'Y', 'Z', 'N1', 'N2', 'N3')

initially(
    location('d', 1), location('c', 2), location('b', 3), location('a', 4),
)

reactive_rule(
    location(X, N1).at(T1),
    N2.is_(N1 + 1),
    location(Y, N2).at(T1),
    Y < X,
).then(
    swapped(X, N1, Y, N2),
)

goal(swapped(X, N1, Y, N2)).requires(
    location(X, N1).at(T1),
    location(Y, N2).at(T1),
    Y < X,
    swap(X, N1, Y, N2),
)

goal(swapped(X, N1, Y, N2)).requires(
    location(X, N1).at(T1),
    location(Y, N2).at(T1),
    X < Y,
)

swap(X, N1, Y, N2).initiates(location(X, N2))
swap(X, N1, Y, N2).terminates(location(X, N1))
swap(X, N1, Y, N2).initiates(location(Y, N1))
swap(X, N1, Y, N2).terminates(location(Y, N2))

false_if(swap(X, N1, Y, N2), swap(Y, N2, Z, N3),)

execute()

show_kb_log()

'''
maxTime(5).
fluents location(_, _).
actions swap(_,_,_,_).

initially   location(d, 1), location(c, 2), location(b, 3),  location(a,4).

if  location(X, N1) at T1, N2 is N1 +1,  location(Y, N2) at T1,  Y@<X
then    swapped(X, N1, Y, N2) from T2 to T3.

% swapped does not work if the order of the two clauses below is
% reversed. Perhaps for good reasons,
% namely in the hope that positions will become swapped in the future
% without the need to swap them explicitly.

swapped(X, N1, Y, N2) from T1 to T2
if  location(X, N1) at T1, location(Y, N2) at T1,
    Y@<X, swap(X, N1, Y, N2) from T1 to T2.

swapped(X, N1, Y, N2) from T to T
if  location(X, N1) at T, location(Y, N2) at T, X@<Y.

swap(X, N1, Y, N2)      initiates   location(X, N2).
swap(X, N1, Y, N2)      initiates   location(Y, N1).

swap(X, N1, Y, N2)      terminates  location(X, N1).
swap(X, N1, Y, N2)      terminates  location(Y, N2).

false   swap(X, N1, Y, N2), swap(Y, N2, Z, N3).
'''
`,


RIVER_CROSSING: `from pylps.core import *

initialise(max_time=10)

create_actions('show(_)', 'valid(_, _)', 'say(_, _)')
create_events('river(_, _, _, _)', 'member(_, _)')
create_facts('inp(_, _)', 'crossing(_, _, _)')
create_variables(
    'A', 'B', 'C', 'P', 'V', 'X', 'Y', 'Z', 'Tail', 'D',
    'Action', 'Start', 'End', 'Plan',
)

inp(['l', 'l', 'l', 'l'], ['r', 'r', 'r', 'r'])

crossing(['l', X, Y, Z], ['r', X, Y, Z], 'farmer_cross')
crossing(['r', X, Y, Z], ['l', X, Y, Z], 'farmer_back')

crossing(['l', 'l', Y, Z], ['r', 'r', Y, Z], 'fox_cross')
crossing(['r', 'r', Y, Z], ['l', 'l', Y, Z], 'fox_back')

crossing(['l', X, 'l', Z], ['r', X, 'r', Z], 'goose_cross')
crossing(['r', X, 'r', Z], ['l', X, 'l', Z], 'goose_back')

crossing(['l', X, Y, 'l'], ['r', X, Y, 'r'], 'beans_cross')
crossing(['r', X, Y, 'r'], ['l', X, Y, 'l'], 'beans_back')

reactive_rule(inp(Start, End)).then(
    river(Start, End, [Start], P).frm(T1, T2),
    show(P).frm(T2, T3),
)

goal(river(A, A, _, []).frm(T, T))

goal(river(A, B, V, P).frm(T1, T3)).requires(
    crossing(A, C, Action),
    C.not_in(V),
    valid(C, Action).frm(T1, T2),
    river(C, B, [C | V], Plan).frm(T2, T3),
    P.is_([Action | Plan]),
)

false_if(valid([A, B, B, C], D), A != B)
false_if(valid([A, C, B, B], D), A != B)

execute(debug=False, strategy=STRATEGY_GREEDY)

show_kb_log()
`,

DEMO_CODE: `from pylps.core import *


initialise(max_time=5)

create_fluents('fire', 'water')
create_actions('eliminate', 'escape', 'ignite(_)')
create_events('deal_with_fire')
create_variables('X')
create_facts('flammable(_)')


# FILL IN HERE

execute()
show_kb_log()


































'''
observe(ignite('bed').frm(1, 2))
observe(ignite('sofa').frm(3, 4))

initially(water)

flammable('bed')
flammable('sofa')

reactive_rule(fire.at(T1)).then(
    deal_with_fire.frm(T1, T2))

goal(deal_with_fire.frm(T1, T2)).requires(
    eliminate.frm(T1, T2))

goal(deal_with_fire.frm(T1, T2)).requires(
    escape.frm(T1, T2))

ignite(X).initiates(fire).iff(flammable(X))

eliminate.terminates(fire)
eliminate.terminates(water)

false_if(eliminate, fire, ~water)

execute()
show_kb_log()
'''
`,

});