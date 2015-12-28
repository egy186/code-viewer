/* global hljs */

'use strict';

(global => {

  global.addEventListener('load', () => {
    const org = global.document.querySelector('pre');
    const pre = org.cloneNode(true);
    // https://github.com/components/highlightjs
    hljs.highlightBlock(pre);
    org.parentNode.replaceChild(pre, org);
    // background color
    global.document.body.style.backgroundColor
      = global.getComputedStyle(pre).backgroundColor;
  });
})(window);
