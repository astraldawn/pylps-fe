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

false_if(
    paint(X, C),
    adjacent(X, Y),
    adjacent(Y, X),
    paint(Y, C)
)

execute()

show_kb_log()`,

ACTION_DEFER:
`# ACTION DEFER
from pylps.core import *

initialise(max_time=2)

create_facts('f(_)', 'g(_)')
create_actions('p1(_)', 'p2(_)')
create_variables('X', 'Y')

f(1)
f(2)
g(1)

reactive_rule(f(X)).then(
    p1(X).frm(T1, T2)
)

reactive_rule(g(X)).then(
    p2(X).frm(T1, T2)
)

false_if(p1(X), p2(Y), X != Y)

execute()

show_kb_log()`

});