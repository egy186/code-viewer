// eslint-disable-next-line n/no-unpublished-import
import hljs from 'highlight.js';

const extname = path => {
  const dot = path.lastIndexOf('.') + 1;
  return dot === 0 ? '' : path.substr(dot).toLowerCase();
};

const languages = hljs.listLanguages().reduce((arr, language) => {
  const { aliases = [] } = hljs.getLanguage(language);
  return arr.concat(language, aliases);
}, []);

const org = document.querySelector('pre');
const pre = org.cloneNode(true);
const ext = extname(location.pathname);
if (languages.includes(ext)) {
  pre.classList.add(`lang-${ext}`);
}

hljs.highlightElement(pre);
org.parentNode.replaceChild(pre, org);
// Background color
document.body.style.backgroundColor = getComputedStyle(pre).backgroundColor;
