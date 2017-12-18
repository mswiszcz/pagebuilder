export const PROJECT_DATE_FORMAT = 'YYYYMMDDHHmmss';
export const AVAILABLE_ICONS = ['Bear', 'Beaver', 'Bird', 'Cat', 'Cow', 'Deer', 'Dolphin', 'Elephant'];
export const AVAILABLE_COLORS = ['#36363e', '#3e3736', '#2a2a2a', '#3e3e36', '#363e3e'];

import moment from 'moment';
import fs from 'fs';

export function randomColorIcon() {
  const icon = AVAILABLE_ICONS[Math.floor(Math.random()*AVAILABLE_ICONS.length)]
  const color = AVAILABLE_COLORS[Math.floor(Math.random()*AVAILABLE_COLORS.length)]

  return {
    color: color,
    icon: icon
  }
}

export class Project {
  constructor(id, name, directory) {
    this.id = id;
    this.name = name;
    this.directory = directory;
  }

  setup = () => {
    this.icon = AVAILABLE_ICONS[Math.floor(Math.random()*AVAILABLE_ICONS.length)];
    this.color = AVAILABLE_COLORS[Math.floor(Math.random()*AVAILABLE_COLORS.length)];
    this.updatedAt = moment().format(PROJECT_DATE_FORMAT);

    this.gatsbyGenerate();
  }

  update(params = {}) {
    // TODO: Allow renaming/moving project
    this.name = params.name || this.name;
    this.updatedAt = moment().format(PROJECT_DATE_FORMAT);
  }

  gatsbyGenerate() {
    const { exec } = require('child_process');

    let directory = this.directory.substring(0, this.directory.lastIndexOf('/'));

    // TODO: Catch errors
    exec(`cd ${directory} && gatsby new ${this.name}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }

  static saveAll(newProjects) {
    localStorage.setItem('projects', JSON.stringify(newProjects));
  }

  static loadAll() {
    let result = localStorage.getItem('projects');

    if (result) {
      result = JSON.parse(result);

      for (let key of Object.keys(result)) {
        let project = result[key];
        project = new Project(project.id, project.name, project.directory);
      }

      return result;
    }
  }
}
