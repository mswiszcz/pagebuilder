// @flow
export const SAVE_FILE = 'SAVE_FILE';
export const DELETE_FILE = 'DELETE_FILE';

export const OPEN_FILE = 'OPEN_FILE';
export const UPDATE_FILE = 'UPDATE_FILE';
export const RENAME_FILE = 'RENAME_FILE';
export const CLOSE_FILE = 'CLOSE_FILE';

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
  return { type: DELETE_FILE, file };
}

export function renameFile(file) {
  return { type: RENAME_FILE, file };
}
