# Regexes suck, but they're occaisonally useful:


## Find all mentions of un-minified CSS:
    ^\s*\<link rel="stylesheet"[^\.]*?((?!\.min).)*$