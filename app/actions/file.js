// @flow
export const SAVE_FILE = 'SAVE_FILE';
export const DELETE_FILE = 'DELETE_FILE';

export const CREATE_FILE = 'CREATE_FILE';
export const OPEN_FILE = 'OPEN_FILE';
export const UPDATE_FILE = 'UPDATE_FILE';
export const RENAME_FILE = 'RENAME_FILE';
export const CLOSE_FILE = 'CLOSE_FILE';

export const UPDATE_FILE_TREE = 'UPDATE_FILE_TREE';

import { Directory } from '../model/directory';
import { File } from '../model/file';
import fs from 'fs';

export function createFile(name, directory) {
  return (dispatch: Function, getState: Function) => {
    const { treeFiles, currentProject } = getState();
    const dir = directory.path;
    const path = `${dir}/${name}`;

    console.log(path);

    fs.writeFile(path, '', (err) => {
      const file = new File({
        name: name,
        content: '',
        project: currentProject, directory
      });

      const newTreeFiles = addFileToCollection(treeFiles, directory, file)
      dispatch({ type: UPDATE_FILE_TREE, treeFiles: newTreeFiles });
    });
  }
}

function addFileToCollection(collection, directory, file) {
  let result, item = null;

  if (directory.fullPath() == file.project.getDirectory().fullPath()) {
    collection.push(file);
    collection.sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
    return collection;
  }

  for (let item of collection) {
    if (item instanceof Directory) {
      if (item.fullPath() == directory.fullPath()) {
        item.files.push(file);
        item.files.sort((a, b) => {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
        break;
      }

      item.files = addFileToCollection(item.files, directory, file);
    }
  }

  return collection;
}

export function openFile(file) {
  return { type: OPEN_FILE, file };
}

export function updateFile(file, content, filetype, mode) {
  return { type: UPDATE_FILE, file, content, filetype, mode }
}

export function saveFile(file) {
  return (dispatch: Function, getState: Function) => {
    const { files, currentProject } = getState();

    dispatch({ type: SAVE_FILE, file, currentProject });
  }
}

export function deleteFile(file) {
  return (dispatch: Function, getState: Function) => {
    const { files, currentFile, treeFiles } = getState();

    if (!!currentFile && file.fullPath() == currentFile.fullPath()) {
      dispatch({ type: CLOSE_FILE, file });

      if (files.length > 1) {
        dispatch({ type: OPEN_FILE, file: files[nextFileIndex] });
      } else {
        dispatch({ type: OPEN_FILE, file: null });
      };
    }

    let newTreeFiles = removeFileFromCollection(treeFiles, file.fullPath());

    dispatch({ type: DELETE_FILE, file });
    dispatch({ type: UPDATE_FILE_TREE, treeFiles: newTreeFiles });

    fs.unlink(file.fullPath(), (err) => {
      if (err) throw err;
      console.log(`${file.fullPath()} was deleted`);
    });
  }
}

export function renameFile(file, newName) {
  return (dispatch: Function, getState: Function) => {
    const { treeFiles } = getState();

    let newPath = file.fullPath().substring(0, file.fullPath().lastIndexOf('/') + 1) + newName;

    fs.rename(file.fullPath(), newPath, (err) => {
      if (err) throw err;

      let newTreeFiles = renameFileInCollection(treeFiles, file.fullPath(), newName);
      dispatch({ type: UPDATE_FILE_TREE, treeFiles: newTreeFiles });
    });

    // dispatch({ type: RENAME_FILE, file, newName, newPath });
  }
}

export function closeFile(file) {
  return (dispatch: Function, getState: Function) => {
    const { files, currentFile } = getState();

    const closingCurrentFile = currentFile.fullPath() == file.fullPath();
    let nextFileIndex = files.findIndex((currentFile) => (currentFile.fullPath() == file.fullPath())) - 1;
    if (nextFileIndex < 0) { nextFileIndex = 1 };

    dispatch({ type: CLOSE_FILE, file });

    if (closingCurrentFile) {
      if (files.length > 1) {
        dispatch({ type: OPEN_FILE, file: files[nextFileIndex] });
      } else {
        dispatch({ type: OPEN_FILE, file: null });
      };
    }
  }
};

function removeFileFromCollection(collection, path) {
  let result, item = null;

  for (let itemPos in collection) {
    item = collection[itemPos];

    if (item instanceof Directory) {
      item.files = removeFileFromCollection(item.files, path);
    }

    if (!!item && item.fullPath() == path) {
      collection.splice(itemPos, 1);
      break;
    }
  }

  return collection;
}

function renameFileInCollection(collection, path, newName) {
  let result, item = null;

  for (let item of collection) {
    if (item instanceof Directory) {
      item.files = renameFileInCollection(item.files, path, newName);
    }

    if (!!item && item.fullPath() == path) {
      item.name = newName;
      item.savedName = newName;
      break;
    }
  }

  return collection;
}
