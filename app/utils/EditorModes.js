const MODE_MAP = {
  html: 'htmlmixed',
  js: 'javascript',
  jsx: 'jsx',
  css: 'css',
  md: 'markdown'
}

export function determineMode(filetype) {
  switch(filetype) {
    case 'html':
    case 'htm':
      return MODE_MAP.html;
    case 'css':
      return MODE_MAP.css;
    case 'jsx':
      return MODE_MAP.jsx;
    case 'js':
    case 'json':
      return MODE_MAP.js;
    case 'md':
      return MODE_MAP.md;
    default:
      return null;
  }
}
