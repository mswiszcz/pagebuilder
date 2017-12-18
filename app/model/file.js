export class File {
  constructor(id, name, content, type, project) {
    this.id = id;
    this.name = name;
    this.savedName = name;

    this.content = content;
    this.savedContent = content;

    this.type = type;
    this.filetype = type;
    this.updated = false;
    this.project = project;
  }
}
