// eslint-disable-next-line n/no-missing-import
import hljs from 'highlight.js';

const extname = (path: string): string => {
  const dot = path.lastIndexOf('.') + 1;
  return dot === 0 ? '' : path.slice(dot).toLowerCase();
};

const orig = document.querySelector('pre');

if (orig instanceof HTMLPreElement) {
  const pre = orig.cloneNode(true) as HTMLPreElement;
  const ext = extname(location.pathname);

  const languages = hljs.listLanguages()
    .flatMap(language => hljs.getLanguage(language)?.aliases ?? []);

  if (languages.includes(ext)) {
    pre.classList.add(`lang-${ext}`);
  }

  hljs.highlightElement(pre);

  orig.parentNode?.replaceChild(pre, orig);
  // Update background color
  document.body.style.backgroundColor = getComputedStyle(pre).backgroundColor;
}
