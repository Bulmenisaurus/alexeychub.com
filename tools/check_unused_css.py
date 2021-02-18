"""
When you are not sure if all your css is used, use this overcomplicated
and buggy solution!

Simply do:
    python tools/check_unused_css.py

And it will tell you which files you are not using! Make sure to use
the regex in regexes.md to find where you are linking un-minified css!
"""

import glob
import re


def difference_between_lists(arr1, arr2) -> set:
    return set(arr1) ^ set(arr2)


def used_css_in_html(html_file_contents: str) -> list:
    return re.findall(r'href=\"(stylesheets/.*\.min\.css)\"', html_file_contents)[0]


HTML_files = glob.glob('*.html')
CSS_files = glob.glob('stylesheets/*.min.css')

UNUSED_CSS = CSS_files[:]


for html in HTML_files:
    with open(html, 'r') as html_file:
        css_href = used_css_in_html(html_file.read())
        if css_href in UNUSED_CSS:
            UNUSED_CSS.remove(css_href)

print(UNUSED_CSS)
