import * as vscode from 'vscode';

const md = require('markdown-it')();
const { am2tex } = require('asciimath-js');

const asciimathName = 'asciimath';
const amName = 'am';
const errName = 'error';

const inlineFormula = (md: any) => {
  const codeInline = md.renderer.rules.code_inline;
  md.renderer.rules.code_inline = (tokens: any[], i: number, ...args: any[]) => {
    const token = tokens[i];
    if (token.markup === '``') {
      let tex;
      try {
        tex = am2tex(token.content, false);
        return `<span class="${asciimathName}">${tex}</span>`;
      } catch (err: any) {
        console.error(err);
        return `<span class="${errName}" style="color:#f00">[parse error: ${err.message}]</span>`;
      }
    }
    return codeInline(tokens, i, ...args);
  };
};

const blockFormula = (md: any) => {
  const { fence } = md.renderer.rules;
  md.renderer.rules.fence = (tokens: any[], i: number, ...args: any[]) => {
    const token = tokens[i];
    console.log(token);
    if (token.info === 'am' || token.info === 'asciimath') {
      let tex;
      try {
        tex = am2tex(token.content);
        return `<div class="${asciimathName}-block">${tex}</div>`;
      } catch (err: any) {
        console.error(err);
        return `<div class="${errName}" style="color:#f00">[parse error: ${err.message}]</div>`;
      }
    }
    return fence(tokens, i, ...args);
  };
};

const configSection = 'markdown-asciimath';
const pluginKeyword = 'asciimath';
const pluginKeywordReg = /\b(asciimath|am)\b/i;

const preProcess = (source: string) => source.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');

// https://code.visualstudio.com/api/extension-guides/markdown-extension
const extendMarkdownIt = (md: any) => {
  md.use(inlineFormula);
  md.use(blockFormula);

  const highlight = md.options.highlight;
  md.options.highlight = (code: string, lang: string) => {
    if (pluginKeywordReg.test(lang)) {
      return `<pre style="all:unset;"><div class="${pluginKeyword}">${preProcess(code)}</div></pre>`;
    }
    return highlight(code, lang);
  };
  return md;
};

export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration(configSection) || e.affectsConfiguration('workbench.colorTheme')) {
      vscode.commands.executeCommand('markdown.preview.refresh');
    }
  }));
  return { extendMarkdownIt };
}

export function deactivate() { }
