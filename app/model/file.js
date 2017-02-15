export const AVAILABLE_MODES = {
  html: {
    html: 'htmlmixed',
    slm: 'slim',
    haml: 'haml',
    pug: 'pug'
  },
  css: {
    css: 'css',
    sass: 'sass',
    scss: 'scss',
    less: 'less'
  },
  js: {
    js: 'javascript',
    coffeescript: 'coffeescript',
    livescript: 'livescript'
  }
}

export class File {
  constructor(id, name, content, type, project) {
    this.id = id;
    this.name = name;
    this.savedName = name;

    this.content = content;
    this.savedContent = content;

    this.type = type;
    this.filetype = type;
    this.mode = AVAILABLE_MODES[type][type];
    this.updated = false;
    this.project = project;
  }
}
