// @flow
import { getProjectRootPath } from '../consts'
import { Project, Directory } from './../model';
import { PROJECT_DATE_FORMAT } from './../model/project';

import moment from 'moment';
import fs from 'fs';
import rmdir from 'rimraf';

export const LOAD_PROJECTS = 'LOAD_PROJECTS';

export const SAVE_PROJECT = 'SAVE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const LOAD_PROJECT = 'LOAD_PROJECT';
export const CLOSE_PROJECT = 'CLOSE_PROJECT';

export function loadProjects() {
  return (dispatch: Function) => {
    let project = null;
    let projects = {};

    fs.readdirSync(getProjectRootPath()).forEach((file, i) => {
      const path = `${getProjectRootPath()}/${file}`;
      const lstatSync = fs.lstatSync(path);

      if (lstatSync.isDirectory()) {
        const id = new Buffer(path).toString('base64');
        project = new Project(id, file);
        project.updatedAt = moment(lstatSync.mtime).format(PROJECT_DATE_FORMAT);

        projects[id] = project;;
      }
    });

    dispatch({ type: LOAD_PROJECTS, projects: projects });
  };
}

export function createProject(name, templateUrl) {
  return (dispatch: Function, getState: Function) => {
    const id = new Buffer(getProjectRootPath() + '/' + name).toString('base64');
    const project = new Project(id, name);

    project.setupInProgress = true;
    project.updatedAt = moment().format(PROJECT_DATE_FORMAT);

    dispatch({ type: SAVE_PROJECT, id, project });

    require('child_process').exec(`cd ${getProjectRootPath()} && gatsby new ${project.name} ${templateUrl}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      project.setupInProgress = false;
      dispatch({ type: SAVE_PROJECT, id, project });
    });
  };
}

export function deleteProject(project) {
  return (dispatch: Function, getState: Function) => {
    project.setupInProgress = true;
    dispatch({ type: SAVE_PROJECT, id: project.id, project });

    rmdir(project.getDirectory().path, (err) => {
      dispatch({ type: DELETE_PROJECT, id: project.id });
    });
  };
}

export function openProject(project) {
  return (dispatch: Function, getState: Function) => {
    if (!project) { return; }

    dispatch({ type: LOAD_PROJECT, project: project });
  };
}

export function closeProject() {
  return { type: CLOSE_PROJECT };
}
