// @flow
import { LOAD_PROJECTS, SAVE_PROJECT, DELETE_PROJECT, OPEN_PROJECT } from '../actions/project';
import { PROJECT_DATE_FORMAT, randomColorIcon } from '../model/project';

import { Project } from '../model/project';
import { File } from '../model/file';
import moment from 'moment';
import fs from 'fs';

export function openProject(state: Object = {}, action: Object) {
  switch (action.type) {
    case OPEN_PROJECT:
      return action.project;
    default:
      return state;
  }
}

export function updateProjects(state: Object = {}, action: Object) {
  let result, project, id;

  switch (action.type) {
    case LOAD_PROJECTS:
      result = Project.loadAll();

      return result || state;
    case SAVE_PROJECT:
      result = Object.assign({}, state);

      if (action.id) {
        project = Object.assign(Project.prototype, result[action.id]);
        console.log(project);
        project.update({ name: action.name, directory: action.directory })
      } else {
        id = (parseInt(Object.keys(state).pop() || 0) + 1);
        project = new Project(id, action.name, action.directory);
        project.setup();
      }

      result[action.id || id] = project;

      Project.saveAll(result);
      return result;
    case DELETE_PROJECT:
      delete state[action.id];
      result = Object.assign({}, state);

      Project.saveAll(result);
      return result;
    default:
      return state;
  }

  return result || state;
}
