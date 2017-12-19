// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { updateProjects, openProject } from './project';
import { updateServers } from './server';
import { openFile, manageFiles } from './file';
import { readProjectDirectory } from './filesystem';

const rootReducer = combineReducers({
  projects: updateProjects,
  currentProject: openProject,
  servers: updateServers,
  treeFiles: readProjectDirectory,
  files: manageFiles,
  currentFile: openFile,
  routing
});

export default rootReducer;
