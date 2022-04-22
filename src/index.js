(async () => {
  'use strict';

  const { syntaxTheme = 'default' } = await browser.storage.sync.get('syntaxTheme');

  const isHtml = document.contentType === 'text/html';
  const pre = document.querySelector('body > pre:first-child');
  if (!isHtml && pre) {
    const fragment = document.createDocumentFragment();
    // Append css
    [
      browser.runtime.getURL(`resources/lib/highlightjs/styles/${syntaxTheme}.css`),
      browser.runtime.getURL('resources/css/style.css')
    ].forEach(path => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = path;
      fragment.appendChild(css);
    });
    // Append js
    [
      browser.runtime.getURL('resources/lib/highlightjs/highlight.pack.min.js'),
      browser.runtime.getURL('resources/js/script.js')
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
