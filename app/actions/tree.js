// @flow
export const EXPAND_DIRECTORY = 'EXPAND_DIRECTORY';
export const CLOSE_DIRECTORY = 'CLOSE_DIRECTORY';

export function closeDirectory(directory) {
  return (dispatch: Function, getState: Function) => {
    const { currentProject } = getState();

    dispatch({ type: CLOSE_DIRECTORY, project: currentProject, directory: directory });
  };
}

export function expandDirectory(directory) {
  return (dispatch: Function, getState: Function) => {
    const { currentProject } = getState();

    dispatch({ type: EXPAND_DIRECTORY, project: currentProject, directory: directory });
  };
}
