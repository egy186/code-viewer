/* global browser */

(() => {
  'use strict';

  const saveOptions = e => {
    e.preventDefault();
    const syntaxTheme = document.querySelector('#syntax-theme').value;
    browser.storage.sync.set({ syntaxTheme });
  };

  const restoreOptions = async () => {
    const { syntaxTheme = 'default' } = await browser.storage.sync.get('syntaxTheme');
    document.querySelector('#syntax-theme').value = syntaxTheme;
  };

  document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    document.querySelector('#settings').addEventListener('submit', saveOptions);
  });
})();
