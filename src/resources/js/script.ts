// eslint-disable-next-line n/no-missing-import, n/no-unpublished-import
import hljs from 'highlight.js';

const extname = (path: string): string => {
  const dot = path.lastIndexOf('.') + 1;
  return dot === 0 ? '' : path.slice(dot).toLowerCase();
};

const languages = hljs.listLanguages().reduce((arr: readonly string[], language) => {
  const { aliases = [] } = hljs.getLanguage(language) ?? {};
  return arr.concat(language, aliases);
}, []);

// Existence of a pre element is already checked in the content script
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const orig = document.querySelector('pre')!;
const pre = orig.cloneNode(true) as HTMLPreElement;
const ext = extname(location.pathname);
if (languages.includes(ext)) {
  pre.classList.add(`lang-${ext}`);
}

hljs.highlightElement(pre);

orig.parentNode?.replaceChild(pre, orig);
// Background color
document.body.style.backgroundColor = getComputedStyle(pre).backgroundColor;
