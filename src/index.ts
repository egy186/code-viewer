import type { CodeViewerOptions } from './options.js';

const isHtml = document.contentType === 'text/html';
const pre = document.querySelector('body > pre:first-child');

if (!isHtml && pre) {
  const inject = async (): Promise<void> => {
    const { syntaxTheme = 'default' } = await browser.storage.sync.get('syntaxTheme') as CodeViewerOptions;

    const fragment = document.createDocumentFragment();
    // Append css
    [
      // eslint-disable-next-line @stylistic/array-element-newline
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
  };

  // eslint-disable-next-line no-void
  void inject();
}
