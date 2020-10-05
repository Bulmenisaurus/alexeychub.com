from pygments import highlight
from pygments.lexers import PythonLexer
from pygments.formatters import HtmlFormatter

code = 'from lmao import lm\ner = \'0xe12e212\'\ndef func()\n\tprint(\'lol\')'
print(highlight(code, PythonLexer(), HtmlFormatter()))
#print(HtmlFormatter().get_style_defs('.highlight'))