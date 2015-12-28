/* global self */

'use strict';

(global => {

  const extname = path => {
    const dot = path.lastIndexOf('.') + 1;
    return dot === 0 ? '' : path.substr(dot).toLowerCase();
  };

  const isSupported = lang => {
    // [].concat(...hljs.listLanguages().map(lang => {
    //   const aliases = hljs.getLanguage(lang).aliases;
    //   return Array.isArray(aliases) ? aliases.concat(lang) : lang;
    // }))
    // .map(lang => lang.toLowerCase())
    // .filter((val, index, arr) => arr.lastIndexOf(val) === index)
    // .sort()
    // https://github.com/components/highlightjs/releases/tag/9.0.0
    const langs = [
      '1c', 'accesslog', 'actionscript', 'ado', 'adoc', 'apache', 'apacheconf',
      'applescript', 'arm', 'armasm', 'as', 'asciidoc', 'aspectj', 'atom',
      'autohotkey', 'autoit', 'avrasm', 'axapta', 'bash', 'bat', 'bf', 'bind',
      'brainfuck', 'c', 'c++', 'cal', 'capnp', 'capnproto', 'cc', 'ceylon',
      'clj', 'clojure', 'clojure-repl', 'cls', 'cmake', 'cmake.in', 'cmd',
      'coffee', 'coffeescript', 'cos', 'cpp', 'cr', 'craftcms', 'crm', 'crmsh',
      'crystal', 'cs', 'csharp', 'cson', 'css', 'd', 'dart', 'delphi', 'diff',
      'django', 'dns', 'do', 'docker', 'dockerfile', 'dos', 'dst', 'dust',
      'elixir', 'elm', 'erb', 'erl', 'erlang', 'erlang-repl', 'f90', 'f95',
      'feature', 'fix', 'fortran', 'fs', 'fsharp', 'gams', 'gcode', 'gemspec',
      'gherkin', 'glsl', 'gms', 'go', 'golang', 'golo', 'gradle', 'graph',
      'groovy', 'gyp', 'h', 'h++', 'haml', 'handlebars', 'haskell', 'haxe',
      'hbs', 'hpp', 'hs', 'hsp', 'html', 'html.handlebars', 'html.hbs',
      'http', 'https', 'hx', 'i7', 'iced', 'inform7', 'ini', 'instances', 'irb',
      'irpf90', 'java', 'javascript', 'jinja', 'js', 'json', 'jsp', 'julia',
      'k', 'kdb', 'kotlin', 'lasso', 'lassoscript', 'less', 'lisp',
      'livecodeserver', 'livescript', 'ls', 'lua', 'm', 'mak', 'makefile',
      'markdown', 'mathematica', 'matlab', 'md', 'mel', 'mercury', 'mips',
      'mipsasm', 'mizar', 'mk', 'mkd', 'mkdown', 'ml', 'mm', 'mma',
      'mojolicious', 'monkey', 'moo', 'nc', 'nginx', 'nginxconf', 'nim',
      'nimrod', 'nix', 'nixos', 'nsis', 'obj-c', 'objc', 'objectivec', 'ocaml',
      'openscad', 'osascript', 'oxygene', 'p21', 'parser3', 'patch', 'pcmk',
      'perl', 'pf', 'pf.conf', 'php', 'php3', 'php4', 'php5', 'php6', 'pl',
      'plist', 'podspec', 'powershell', 'pp', 'processing', 'profile', 'prolog',
      'protobuf', 'ps', 'puppet', 'py', 'python', 'q', 'r', 'rb', 'rib',
      'roboconf', 'rs', 'rsl', 'rss', 'ruby', 'ruleslanguage', 'rust', 'scad',
      'scala', 'scheme', 'sci', 'scilab', 'scss', 'sh', 'smali', 'smalltalk',
      'sml', 'sqf', 'sql', 'st', 'stata', 'step', 'step21', 'stp', 'styl',
      'stylus', 'swift', 'tao', 'tcl', 'tex', 'thor', 'thrift', 'tk', 'toml',
      'tp', 'ts', 'twig', 'typescript', 'v', 'vala', 'vb', 'vbnet', 'vbs',
      'vbscript', 'vbscript-html', 'verilog', 'vhdl', 'vim', 'x86asm', 'xhtml',
      'xl', 'xml', 'xpath', 'xq', 'xquery', 'xsl', 'yaml', 'yml', 'zep',
      'zephir', 'zone', 'zsh'
    ];
    return langs.indexOf(lang) !== -1;
  };

  const lang = extname(global.location.pathname);
  const ishtmlSource = lang.includes('htm')
    || global.location.plotocol === 'view-source:';
  const pre = global.document.querySelector('body > pre:first-child');
  if (pre && !ishtmlSource && (isSupported(lang) || lang === '')) {
    pre.classList.add('lang-' + lang);

    const frag = global.document.createDocumentFragment();
    // append css
    [
      'chrome://code-viewer/content/lib/highlightjs/styles/'
        + (self.options.syntaxTheme || 'default') + '.css',
      'chrome://code-viewer/content/css/style.css'
    ].forEach(path => {
      const css = global.document.createElement('link');
      css.rel = 'stylesheet';
      css.href = path;
      frag.appendChild(css);
    });
    // append js
    [
      'chrome://code-viewer/content/lib/highlightjs/highlight.pack.min.js',
      'chrome://code-viewer/content/js/script.js'
    ].forEach(path => {
      const js = global.document.createElement('script');
      js.src = path;
      js.defer = true;
      frag.appendChild(js);
    });

    // append to head
    global.document.head.appendChild(frag);
  }
})(window);
