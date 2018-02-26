// @flow
import { FETCH_INSTALLED_PACKAGES, PACKAGE_INSTALLED, PACKAGE_UPDATED, PACKAGE_UNINSTALLED } from '../actions/package';
import { CLOSE_PROJECT } from '../actions/project';

export function fetchInstalledPackages(packages = {}, action: Object) {
  let result;

  switch (action.type) {
    case FETCH_INSTALLED_PACKAGES:
      return action.packages;
    case PACKAGE_INSTALLED:
      result = Object.assign({}, packages);
      result[action.name] = {
        version: action.version,
        link: action.link
      }

      return result;
    case PACKAGE_UPDATED:
      result = Object.assign({}, packages);
      result[action.name]['version'] = action.version;

      return result;
    case PACKAGE_UNINSTALLED:
      result = Object.assign({}, packages);
      delete result[action.name];

      return result;
    case CLOSE_PROJECT:
      return {};
    default:
      return packages;
  }
}
