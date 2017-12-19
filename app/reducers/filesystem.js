// @flow
import { RENAME_FILE, DELETE_FILE } from '../actions/file';
import { LOAD_PROJECT } from '../actions/project';
import { EXPAND_DIRECTORY } from '../actions/tree';
import { File } from '../model/file';
import { Directory } from '../model/directory';
import fs from 'fs';

export function readProjectDirectory(files = [], action: Object) {
  switch (action.type) {
    case LOAD_PROJECT:
    case RENAME_FILE:
    case DELETE_FILE:
      let newFiles = loadFilesFromDirectory(action.project);

      return newFiles;
    case EXPAND_DIRECTORY:
      // TODO Read selected directory

      return files;
    default:
      return files;
  }

  return files;
}

function loadFilesFromDirectory(project) {
  let files = fs.readdirSync(project.directory);

  files = files.map((file, i) => {
    let path = `${project.directory}/${file}`;

    if (fs.lstatSync(path).isDirectory()) {
      return new Directory(`tree-dir-${i}`, file, path, project);
    } else {
      return new File(`tree-file-${i}`, file, '', path, project);
    }
  });

  return files;
}
