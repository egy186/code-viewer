/* eslint-env commonjs */

'use strict';

const pageMod = require('sdk/page-mod').PageMod;
const simplePrefs = require('sdk/simple-prefs');

pageMod({
  include: /.*/,
  contentScriptFile: './code-viewer.js',
  contentScriptOptions: {
    syntaxTheme: simplePrefs.prefs.syntaxTheme
  },
  contentScriptWhen: 'ready',
  attachTo: ['existing', 'top']
});
