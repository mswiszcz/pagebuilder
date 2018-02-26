export const FETCH_INSTALLED_PACKAGES = 'FETCH_INSTALLED_PACKAGES';
export const FETCH_PACKAGE_INFO = 'FETCH_PACKAGE_INFO';

export const PACKAGE_INSTALLED = 'PACKAGE_INSTALLED';
export const PACKAGE_UNINSTALLED = 'PACKAGE_UNINSTALLED';
export const PACKAGE_UPDATED = 'PACKAGE_UPDATED';

export const UPDATE_PACKAGE_STATUS = 'UPDATE_PACKAGE_STATUS';

import fs from 'fs';

export function fetchInstalledPackages() {
  return (dispatch: Function, getState: Function) => {
    let exec = require('child_process').exec;
    const { currentProject } = getState();

    const packageJson = JSON.parse(fs.readFileSync(`${currentProject.getDirectory().path}/package.json`, 'utf8'));
    const dependencies = packageJson.dependencies;

    Object.keys(dependencies).forEach((key) => {
      dependencies[key] = { version: dependencies[key] }
    });

    dispatch({ type: FETCH_INSTALLED_PACKAGES, packages: dependencies });
  };
}

export function installPackage(name, version, link, afterInstallCallback) {
  return (dispatch: Function, getState: Function) => {
    let exec = require('child_process').exec;
    const { currentProject } = getState();

    exec(`cd ${currentProject.getDirectory().path} && npm i ${name} --save`, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      } else {
        dispatch({ type: PACKAGE_INSTALLED, name, version, link });
        afterInstallCallback();
      }
    });
  };
}

export function uninstallPackage(name) {
  return (dispatch: Function, getState: Function) => {
    let exec = require('child_process').exec;
    const { currentProject } = getState();

    exec(`cd ${currentProject.getDirectory().path} && npm uninstall ${name} --save`, (error, stdout, stderr) => {
      dispatch({ type: PACKAGE_UNINSTALLED, name });
    });
  };
}

export function updatePackage(name, version, afterUpdateCallback) {
  return (dispatch: Function, getState: Function) => {
    let exec = require('child_process').exec;
    const { currentProject } = getState();

    exec(`cd ${currentProject.getDirectory().path} && npm i ${name}@${version} --save`, (error, stdout, stderr) => {
      dispatch({ type: PACKAGE_UPDATED, name, version });
      afterUpdateCallback();
    });
  };
}
