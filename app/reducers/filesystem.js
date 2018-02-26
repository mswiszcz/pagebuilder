// @flow
import { DELETE_FILE } from '../actions/file';
import { LOAD_PROJECT, CLOSE_PROJECT } from '../actions/project';
import { EXPAND_DIRECTORY, CLOSE_DIRECTORY, UPDATE_FILE_TREE } from '../actions/tree';
import { File } from '../model/file';
import { Directory } from '../model/directory';
import fs from 'fs';

export function treeFiles(files = [], action: Object) {
  let result, directoryFiles;

  switch (action.type) {
    case UPDATE_FILE_TREE:
      result = action.treeFiles;
      return result;
    case LOAD_PROJECT:
      result = loadFilesFromDirectory(action.project, action.project.getDirectory());
      return result;
    case EXPAND_DIRECTORY:
      directoryFiles = loadFilesFromDirectory(action.project, action.directory);
      action.directory.files = directoryFiles;
      action.directory.expanded = true;

      return Object.assign([], files);
    case CLOSE_DIRECTORY:
      action.directory.files = [];
      action.directory.expanded = false;

      return Object.assign([], files);
    case CLOSE_PROJECT:
      return [];
    default:
      return files;
  }

  return files;
}

function loadFilesFromDirectory(project, directory) {
  return fs.readdirSync(directory.path).map((fileName, i) => {
    let path = `${directory.path}/${fileName}`;

    if (fs.lstatSync(path).isDirectory()) {
      return new Directory({ name: fileName, path, project });
    } else {
      return new File({
        name: fileName,
        content: '', project, directory
      });
    }
  });
}
