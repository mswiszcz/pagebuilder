// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { updateProjectList, openProject } from './project';
import { updateServers } from './server';
import { currentFile, files } from './file';
import { treeFiles } from './filesystem';
import { fetchInstalledPackages } from './package'
import { gatsbyStatus, gatsbyDevelopProcess } from './gatsby'

const rootReducer = combineReducers({
  projects: updateProjectList,
  currentProject: openProject,
  servers: updateServers,
  treeFiles: treeFiles,
  files: files,
  currentFile: currentFile,
  installedPackages: fetchInstalledPackages,
  gatsbyStatus: gatsbyStatus,
  gatsbyDevelopProcess: gatsbyDevelopProcess,
  routing
});

export default rootReducer;
