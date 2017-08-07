/* global browser */

(async () => {
  'use strict';

  const syntaxTheme = await browser.storage.local.get('syntaxTheme')
    .then(result => result.syntaxTheme || 'default');

  const extname = path => {
    const dot = path.lastIndexOf('.') + 1;
    return dot === 0 ? '' : path.substr(dot).toLowerCase();
  };

  const lang = extname(location.pathname);
  const isHtml = document.contentType === 'text/html';
  const pre = document.querySelector('body > pre:first-child');
  if (!isHtml && pre) {
    if (lang !== '') {
      pre.classList.add(`lang-${lang}`);
    }

    const fragment = document.createDocumentFragment();
    // Append css
    [
      browser.extension.getURL(`resources/lib/highlightjs/styles/${syntaxTheme}.css`),
      browser.extension.getURL('resources/css/style.css')
    ].forEach(path => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = path;
      fragment.appendChild(css);
    });
    // Append js
    [
      browser.extension.getURL('resources/lib/highlightjs/highlight.pack.min.js'),
      browser.extension.getURL('resources/js/script.js')
    ].forEach(path => {
      const js = document.createElement('script');
      js.type = 'text/javascript';
      js.charset = 'utf-8';
      js.src = path;
      js.async = true;
      fragment.appendChild(js);
    });

    // Append to head
    document.head.appendChild(fragment);
  }
})();
