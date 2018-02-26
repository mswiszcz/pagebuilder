// @flow
import { OPEN_FILE, SAVE_FILE, DELETE_FILE, UPDATE_FILE, CLOSE_FILE, RENAME_FILE } from '../actions/file';
import { CLOSE_PROJECT } from '../actions/project';
import { File } from '../model/file';
import { Directory } from '../model/directory';
import fs from 'fs';

export function currentFile(file = null, action: Object) {
  let result = null;

  switch (action.type) {
    case OPEN_FILE:
      if (!action.file) { return null; }

      result = Object.assign(Object.create(action.file), action.file);
      if (action.file.updated) { return result; }

      result.content = fs.readFileSync(action.file.fullPath(), 'utf8');
      result.savedContent = result.content;
      return result;
    case UPDATE_FILE:
      result = Object.assign(Object.create(action.file), action.file);

      result.content = action.content;
      result.updated = result.savedContent != action.content;

      return result;
    case SAVE_FILE:
      result = Object.assign(Object.create(action.file), action.file);

      result.savedContent = result.content;
      result.updated = false;
      fs.writeFileSync(result.fullPath(), result.content, 'utf8');
      return result;
    case CLOSE_PROJECT:
      return null;
    default:
      return file;
  }
}

export function files(state = [], action: Object) {
  let newFiles;
  let file, newFile;

  switch (action.type) {
    case OPEN_FILE:
      if (!action.file) { return state; }

      const fileIndex = state.findIndex((element) => element.fullPath() == action.file.fullPath())
      if (fileIndex >= 0) { return state; }

      newFiles = Object.assign([], state);
      newFiles.push(action.file);
      return newFiles;
    case CLOSE_FILE:
      newFiles = Object.assign([], state.filter((file) => file.fullPath() != action.file.fullPath()));

      return newFiles;
    case UPDATE_FILE:
      newFiles = Object.assign([], state);

      newFile = newFiles.find((element) => element.fullPath() == action.file.fullPath());
      newFile.updated = newFile.savedContent != action.content;
      newFile.content = action.content;

      return newFiles;
    case SAVE_FILE:
      newFiles = Object.assign([], state);

      newFile = newFiles.find((element) => element.fullPath() == action.file.fullPath());
      newFile.savedName = action.file.name;
      newFile.savedContent = action.file.content;
      newFile.updated = false;

      return newFiles;
    case DELETE_FILE:
      newFiles = Object.assign([], state);
      const removedFileIndex = newFiles.findIndex((element) => element.fullPath() == action.file.fullPath());
      if (removedFileIndex < 0) { return newFiles; }
      newFiles.splice(removedFileIndex, 1);

      return newFiles;
    case CLOSE_PROJECT:
      return [];
    default:
      return state;
  }

  return state;
}
