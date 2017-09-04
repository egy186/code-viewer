/* global browser */

(() => {
  'use strict';

  const saveOptions = e => {
    e.preventDefault();
    const syntaxTheme = document.querySelector('#syntax-theme').value;
    browser.storage.local.set({ syntaxTheme })
      .catch(err => console.error(err));
  };

  const restoreOptions = () => {
    browser.storage.local.get('syntaxTheme')
      .then(result => {
        const syntaxTheme = result.syntaxTheme || 'default';
        document.querySelector('#syntax-theme').value = syntaxTheme;
      })
      .catch(err => console.error(err));
  };

  document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    document.querySelector('#settings').addEventListener('submit', saveOptions);
  });
})();
