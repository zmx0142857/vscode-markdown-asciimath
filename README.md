# Asciimath for Markdown Preview

## Features

Add [asciimath](https://github.com/zmx0142857/asciimathml) support for VSCode's built-in markdown preview.

- tutorial & reference: https://asciimath.widcard.win
- tutorial for old version (<= 0.0.3): https://zmx0142857.github.io/note/#math
- original asciimath homepage: http://asciimath.org/

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

Try this [live demo](https://asciimath.widcard.win) to explore more about asciimath.

## Settings

- `markdown-asciimath.blockLabel`: Label name for block formula (default: `["asciimath", "am"]`)
- `markdown-asciimath.inlineDelimLeft`: Left Delimiter for inline formula (default: \`\`)
- `markdown-asciimath.inlineDelimRight`: Right Delimiter for inline formula (default: \`\`)

## Special Thanks

Thanks to [@widcardw](https://github.com/widcardw)'s help and his well-crafted [markdown-it plugin](https://github.com/widcardw/markdown-it-asciimath).

<!--
## Publish

```
$ pnpm i -g @vscode/vsce
$ vsce package
$ vsce publish
```
-->
