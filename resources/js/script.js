/* global hljs */

(() => {
  'use strict';

  const highlight = () => {
    const org = document.querySelector('pre');
    const pre = org.cloneNode(true);
    // https://github.com/components/highlightjs
    hljs.highlightBlock(pre);
    org.parentNode.replaceChild(pre, org);
    // Background color
    document.body.style.backgroundColor = getComputedStyle(pre).backgroundColor;
  };

  if (typeof hljs === 'undefined') {
    // Wait hljs
    document.querySelector('script').onload = () => {
      highlight();
    };
  } else {
    highlight();
  }
})();
