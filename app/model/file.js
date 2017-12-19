export class File {
  constructor(id, name, content, path, project) {
    this.id = id;
    this.name = name;

    this.content = content;
    this.savedContent = content;

    this.updated = false;
    this.path = path;
    this.project = project;
  }

  shortenedPath = () => {
    const path = this.fullPath();
    return '...' + path.substring(path.length - 50, path.length);
  }

  fullPath = () => {
    return `${this.project.directory}/${this.savedName}`;
  }
}
