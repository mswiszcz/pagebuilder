export class File {
  constructor({ name, content, project, directory }) {
    this.name = name;
    this.savedName = name;

    this.content = content;
    this.savedContent = content;

    this.updated = false;
    this.project = project;

    this.directory = directory;
  }

  icon = () => {
    return this.filetype();
  }

  filetype = () => {
    const type = this.name.substring(this.name.lastIndexOf('.') + 1, this.name.length);
    switch (type) {
      case 'js':
        return 'jsx';
      default:
        return type;
    }
  }

  shortenedPath = () => {
    const path = this.fullPath();
    return '...' + path.substring(path.length - 50, path.length);
  }

  fullPath = () => {
    return `${this.directory.path}/${this.savedName}`;
  }
}
