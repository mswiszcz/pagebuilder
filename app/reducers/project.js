// @flow
import { LOAD_PROJECTS, SAVE_PROJECT, DELETE_PROJECT, LOAD_PROJECT, CLOSE_PROJECT } from '../actions/project';
import { PROJECT_DATE_FORMAT } from '../model/project';

import { File, Project } from '../model';
import moment from 'moment';
import fs from 'fs';

export function openProject(state: Object = {}, action: Object) {
  switch (action.type) {
    case LOAD_PROJECT:
      return action.project;
    case CLOSE_PROJECT:
      return {};
    default:
      return state;
  }
}

export function updateProjectList(state: Object = {}, action: Object) {
  let projects = {};

  switch (action.type) {
    case LOAD_PROJECTS:
      return Object.assign({}, action.projects);
    case SAVE_PROJECT:
      projects = Object.assign({}, state);
      projects[action.id] = action.project;

      return projects;
    case DELETE_PROJECT:
      projects = Object.assign({}, state);
      delete projects[action.id];

      return projects;
    default:
      return state;
  }
}
