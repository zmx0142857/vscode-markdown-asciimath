import * as vscode from 'vscode';

const md = require('markdown-it')();
const { am2tex } = require('asciimath-js');

const asciimathName = 'asciimath';
const errName = 'error';
const configSection = 'markdown-asciimath';
let config: vscode.WorkspaceConfiguration;

const inlineFormula = (md: any) => {
  const leftDelim = config.get('inlineDelimLeft');
  const codeInline = md.renderer.rules.code_inline;
  md.renderer.rules.code_inline = (tokens: any[], i: number, ...args: any[]) => {
    const token = tokens[i];
    if (token.markup === leftDelim) {
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
  const blockLabel = config.get('blockLabel');
  const { fence } = md.renderer.rules;
  md.renderer.rules.fence = (tokens: any[], i: number, ...args: any[]) => {
    const token = tokens[i];
    if (token.info === blockLabel) {
      let tex;
      try {
        tex = am2tex(token.content);
        return `<center class="${asciimathName}-block">${tex}</center>`;
      } catch (err: any) {
        console.error(err);
        return `<center class="${errName}" style="color:#f00">[parse error: ${err.message}]</center>`;
      }
    }
    return fence(tokens, i, ...args);
  };
};

// https://code.visualstudio.com/api/extension-guides/markdown-extension
const extendMarkdownIt = (md: any) => {
  md.use(inlineFormula);
  md.use(blockFormula);
  return md;
};

export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration(configSection) || e.affectsConfiguration('workbench.colorTheme')) {
      vscode.commands.executeCommand('markdown.preview.refresh');
    }
  }));
  config = vscode.workspace.getConfiguration(configSection);
  return { extendMarkdownIt };
}

export function deactivate() { }
