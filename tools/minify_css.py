# -*- coding: utf-8 -*-
# from https://cssminifier.com/python
"""
Minify all css files:
=====================

for file in stylesheets/*; do python tools/python-min_cli.py "$file"; done

Delete all minified files:
==========================

rm stylesheets/*'.min'*
"""
import sys
import requests

try:
    css_file = sys.argv[1]
except:
    print("Missing input file")
    sys.exit()

# Grab the file contents
with open(css_file, 'r') as c:
    css = c.read()

# Pack it, ship it
payload = {'input': css}
url = 'https://cssminifier.com/raw'
print("Requesting mini-me of {}. . .".format(c.name))
r = requests.post(url, payload)

# Write out minified version
with open(css_file, 'w') as m:
    m.write(r.text)

print("Minification complete. See {}".format(m.name))
