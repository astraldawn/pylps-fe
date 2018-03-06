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


});