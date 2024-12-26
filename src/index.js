// eslint-disable-next-line max-statements
(async () => {
  const isHtml = document.contentType === 'text/html';
  const pre = document.querySelector('body > pre:first-child');

  if (!isHtml && pre) {
    const { syntaxTheme = 'default' } = await browser.storage.sync.get('syntaxTheme');

    const fragment = document.createDocumentFragment();
    // Append css
    [
      browser.runtime.getURL(`resources/lib/highlight.js/styles/${syntaxTheme}.min.css`),
      browser.runtime.getURL('resources/css/style.css')
    ].forEach(path => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = path;
      fragment.appendChild(css);
    });
    // Append js
    const js = document.createElement('script');
    js.src = browser.runtime.getURL('resources/js/script.js');
    js.async = true;
    fragment.appendChild(js);

    // Append to head
    document.head.appendChild(fragment);
  }
})();
