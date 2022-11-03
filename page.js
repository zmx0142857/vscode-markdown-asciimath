import katex from 'katex';

function render() {
  ;[
    ...document.querySelectorAll('.asciimath'),
    ...document.querySelectorAll('.asciimath-block'),
  ].forEach(el => {
    katex.render(el.textContent, el);
  });
}

window.addEventListener('vscode.markdown.updateContent', render);

render();