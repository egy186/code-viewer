'use strict';

const pageMod = require('sdk/page-mod').PageMod;
const simplePrefs = require('sdk/simple-prefs');

pageMod({
  attachTo: ['existing', 'top'],
  contentScriptFile: './code-viewer.js',
  contentScriptOptions: { syntaxTheme: simplePrefs.prefs.syntaxTheme },
  contentScriptWhen: 'ready',
  include: /.*/
});
