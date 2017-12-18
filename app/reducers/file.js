// @flow
import { WRITE_FILE, OPEN_FILE, SAVE_FILE, DELETE_FILE, UPDATE_FILE } from '../actions/file';
import { OPEN_PROJECT } from '../actions/project';
import { File } from '../model/file';
import { Directory } from '../model/directory';
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

export function manageFiles(state = [], action: Object) {
  let newFiles;
  let file, newFile;

  switch (action.type) {
    case OPEN_PROJECT:
      let files = fs.readdirSync(action.project.directory);

      files = files.map((file, i) => {
        let content = 'bb';
        let filetype = 'html';
        let name;

        if (fs.lstatSync(`${action.project.directory}/${file}`).isDirectory()) {
          name = `DIR: ${file}`;

          return new Directory(i, name, action.project);
        } else {
          name = file;
          filetype = file.substring(file.indexOf('.') + 1);
          content = fs.readFileSync(`${action.project.directory}/${file}`, 'utf8');

          return new File(i, name, content, filetype, action.project);
        }
      });

      return files;
    case UPDATE_FILE:
      file = action.file;
      newFiles = Object.assign([], state);

      newFile = newFiles.find((element) => { return element.id == file.id });

      if (action.name) { newFile.name = action.name }
      if (action.filetype) { newFile.filetype = action.filetype }
      if (action.mode) { newFile.mode = action.mode }
      if (action.content) {
        newFile.updated = file.savedContent != action.content;
        newFile.content = action.content;
      }

      return newFiles;
    case SAVE_FILE:
      // FIXME

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
