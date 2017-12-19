// @flow
export const LOAD_PROJECTS = 'LOAD_PROJECTS';

export const SAVE_PROJECT = 'SAVE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const LOAD_PROJECT = 'LOAD_PROJECT';
export const CLOSE_PROJECT = 'CLOSE_PROJECT';

export function loadProjects() {
  return { type: LOAD_PROJECTS }
}

export function saveProject(name, directory, id) {
  return { type: SAVE_PROJECT, name, directory, id }
}

export function deleteProject(id) {
  return { type: DELETE_PROJECT, id };
}

export function openProject(id) {
  return (dispatch: Function, getState: Function) => {
    const { projects } = getState();
    const project = projects[id];

    if (!project) { return; }

    dispatch({ type: LOAD_PROJECT, project: project });
  };
}

export function closeProject() {
  return { type: CLOSE_PROJECT }
}
