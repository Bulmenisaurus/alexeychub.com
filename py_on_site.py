from pygments import highlight
from pygments.lexers import PythonLexer
from pygments.formatters import HtmlFormatter

print('\033[0m')
#print(f"\033[35m{'happy b-day {your name here}'.capitalize()}\033[90m\n{chr(60)+(l_1 := '------~~~~~~**') + l_1[::-1]+chr(62)}\033[0m\n\n{'Your message here'}")
#print(f"\n\n{(message := ' '+f'Happy Valetine{chr(39)}s day, Hobbert!')}\n{(line := (hrt := '💕')+'—'*len(message)+hrt)}\nLorizzle ipsizzle you son of a bizzle shizzlin dizzle gangster,\nthe bizzle adipiscing elit. Nullam stuff its fo rizzle, fo\nshizzle volutpizzle,suscipit ghetto, gravida crunk, crazy.\n\n{line}\n— \033[1mEnt0_3301\033[0m, with love")
code = "'Happy B-day {your name here}!'.capitalize()"
print(highlight(code, PythonLexer(), HtmlFormatter()))
