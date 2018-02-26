export class Directory {
  constructor({ id, name, path, project }) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.project = project;
    this.files = [];
    this.expanded = false;
  }

  fullPath() {
    return this.path;
  }
}
