import * as vscode from 'vscode';

const configSection = 'markdown-asciimath';
let config: vscode.WorkspaceConfiguration;
let markdownIt: any;
let customMarkdownIt: any;

const clone = (obj: any) => {
  return Object.assign(Object.create(obj.constructor.prototype), obj);
};

const customize = (md: any) => {
  const amIt = require('@widcardw/markdown-it-asciimath').default; // lazy load
  return md.use(amIt, {
    block: config.get('blockLabel'),
    inline: {
      open: config.get('inlineDelimLeft'),
      close: config.get('inlineDelimRight'),
    },
    enableOriginalKatex: true
  });
};

// https://code.visualstudio.com/api/extension-guides/markdown-extension
const extendMarkdownIt = (md: any) => {
  markdownIt = clone(md);
  customMarkdownIt = customize(markdownIt);
  return new Proxy(customMarkdownIt, {
    get (obj, key) {
      return customMarkdownIt[key];
    },
    set (obj, key, value) {
      customMarkdownIt[key] = value;
      return true;
    }
  });
};

export function activate(ctx: vscode.ExtensionContext) {
  ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration(configSection) || e.affectsConfiguration('workbench.colorTheme')) {
      config = vscode.workspace.getConfiguration(configSection);
      customMarkdownIt = customize(clone(markdownIt));
      vscode.commands.executeCommand('markdown.preview.refresh');
    }
  }));
  config = vscode.workspace.getConfiguration(configSection);
  return { extendMarkdownIt };
}

export function deactivate() { }
