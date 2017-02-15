// @flow
import { WRITE_FILE, OPEN_FILE, SAVE_FILE, DELETE_FILE, UPDATE_FILE } from '../actions/file';
import { OPEN_PROJECT } from '../actions/project';
import { File } from '../model/file';
import fs from 'fs';

export function openFile(state = null, action: Object) {
  let newFile;

  switch (action.type) {
    case OPEN_PROJECT:
      return null;
    case OPEN_FILE:
      return action.file;
    case SAVE_FILE:
      if (!state) { return state }
      newFile = Object.assign(Object.create(state), state);

      newFile.savedContent = state.content;
      newFile.updated = false;

      return newFile;
    case UPDATE_FILE:
      newFile = Object.assign(Object.create(state), state);

      if (action.filetype) { newFile.filetype = action.filetype }
      if (action.mode) { newFile.mode = action.mode }

      newFile.updated = state.savedContent != action.content;
      newFile.content = action.content;

      return newFile;
    default:
      return state
  }
}

export function manageFiles(state: Object = { html: [], css: [], js: [] }, action: Object) {
  let newFiles;
  let file, newFile;

  switch (action.type) {
    case OPEN_PROJECT:
      newFiles = {};

      for (let type of ['html', 'css', 'js']) {
        let files = fs.readdirSync(action.project.directories[type]);
        newFiles[type] = [];

        files.map((file, i) => {
          let name = file.substring(0, file.indexOf('.'));
          let filetype = file.substring(file.indexOf('.') + 1);
          let content = fs.readFileSync(`${action.project.directories[type]}/${file}`, 'utf8');

          newFiles[type][i] = new File(i, name, content, filetype, action.project);
        });
      }

      return newFiles;
    case UPDATE_FILE:
      file = action.file;
      newFiles = Object.assign({}, state);

      newFile = newFiles[file.type].find((element) => { return element.id == file.id });

      if (action.name) { newFile.name = action.name }
      if (action.filetype) { newFile.filetype = action.filetype }
      if (action.mode) { newFile.mode = action.mode }
      if (action.content) {
        newFile.updated = file.savedContent != action.content;
        newFile.content = action.content;
      }

      return newFiles;
    case SAVE_FILE:
      file = action.file;
      newFiles = Object.assign({}, state);

      if (file.id != undefined) {
        newFile = newFiles[file.type].find((element) => { return element.id == file.id });

        newFile.content = file.content;
        newFile.name = file.name;
        newFile.savedContent = file.content;
        newFile.updated = false;
      } else {
        let lastFile = state[file.filetype].slice(-1)[0];
        file.id = lastFile ? lastFile.id + 1 : 0;
        newFiles[file.type].push(file);
        newFile = file;
      }

      if (newFile.savedName != file.name) {
        fs.unlink(`${action.currentProject.directories[newFile.type]}/${newFile.savedName}.${newFile.type}`);
      }

      newFile.savedName = file.name;
      newFile.project = action.currentProject;
      fs.writeFile(`${action.currentProject.directories[newFile.type]}/${newFile.name}.${newFile.type}`, newFile.content);

      return newFiles;
    case DELETE_FILE:
      file = action.file;
      newFiles = Object.assign({}, state);
      newFile = newFiles[file.type].indexOf(file);
      newFiles[file.type].splice(newFile, 1);

      fs.unlink(`${file.project.directories[file.type]}/${file.name}.${file.type}`)
      // TODO: Remove from filesystem

      return newFiles;
    default:
      return state;
  }

  return state;
}
