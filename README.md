# Asciimath for Markdown Preview

## Features

Add [asciimath](https://github.com/zmx0142857/asciimathml) support for VSCode's built-in markdown preview.

- tutorial & reference: https://zmx0142857.github.io/note/#math
- original homepage: http://asciimath.org/

## Usage

`example.md`
~~~
- inline formula: ``a/b``
- block formula:
  ```am
  [
    1,0,0;
    0,1,0;
    0,0,1;
  ]
  ```
- use $\LaTeX$:
  $$\frac a b$$
~~~

![feature 01](./images/feature-01.png)

Visit this [tutorial](https://zmx0142857.github.io/note/#math) to explore more about asciimath.

## Settings

- `markdown-asciimath.blockLabel`: Label name for block formula
- `markdown-asciimath.inlineDelimLeft`: Left Delimiter for inline formula (Not supported yet)
- `markdown-asciimath.inlineDelimRight`: Right Delimiter for inline formula (Not supported yet)
