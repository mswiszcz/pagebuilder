export const PROJECT_DATE_FORMAT = 'YYYYMMDDHHmmss';

import moment from 'moment';
import fs from 'fs';

import { Directory } from '.';
import { getProjectRootPath } from '../consts'

export class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.setupInProgress = false;
    this.updatedAt = moment().format(PROJECT_DATE_FORMAT);
  }

  getDirectory = () => {
    if (!this.directory)
      this.directory = new Directory({ id: this.id,
                                       name: null,
                                       path: `${getProjectRootPath()}/${this.name}`,
                                       project: this })

    return this.directory;
  }

  getDirectoryPath = () => {
    return getDirectory().path;
  }
}
