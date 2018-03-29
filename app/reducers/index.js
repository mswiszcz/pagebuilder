// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { updateProjectList, openProject } from './project';
import { currentFile, files } from './file';
import { treeFiles } from './filesystem';
import { fetchInstalledPackages } from './package'
import { gatsbyStatus, gatsbyDevelopProcess } from './gatsby'

export default combineReducers({
  projects: updateProjectList,
  currentProject: openProject,
  treeFiles: treeFiles,
  files: files,
  currentFile: currentFile,
  installedPackages: fetchInstalledPackages,
  gatsbyStatus: gatsbyStatus,
  gatsbyDevelopProcess: gatsbyDevelopProcess,
  routing
});
