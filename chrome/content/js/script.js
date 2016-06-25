/* global hljs */

(() => {
  'use strict';

  addEventListener('load', () => {
    const org = document.querySelector('pre');
    const pre = org.cloneNode(true);
    // https://github.com/components/highlightjs
    hljs.highlightBlock(pre);
    org.parentNode.replaceChild(pre, org);
    // background color
    document.body.style.backgroundColor = getComputedStyle(pre).backgroundColor;
  });
})();
