// @flow
export const GATSBY_BUILD_STARTED = 'GATSBY_BUILD_STARTED';
export const GATSBY_BUILD_FINISHED = 'GATSBY_BUILD_FINISHED';

export const GATSBY_DEVELOP_STATUS_UPDATE = 'GATSBY_DEVELOP_STATUS_UPDATE';
export const GATSBY_DEVELOP_START = 'GATSBY_DEVELOP_START';
export const GATSBY_DEVELOP_STOP = 'GATSBY_DEVELOP_STOP';

import childProcess from 'child_process';

import { STATUS } from '../reducers/gatsby';

export function gatsbyDevelopStart() {
  return (dispatch: Function, getState: Function) => {
    const { currentProject } = getState();

    const process = childProcess.spawn('gatsby', ['develop'], { cwd: currentProject.getDirectory().path });

    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      let dataString = data.toString();

      let status = STATUS.RUNNING;
      let message = dataString.substring(dataString.length - 50, dataString.length);
      dispatch({ type: GATSBY_DEVELOP_STATUS_UPDATE, status: status, message: `...${message}` });
    });

    process.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);

      dispatch({ type: GATSBY_DEVELOP_STATUS_UPDATE, status: STATUS.ERROR });
    });

    dispatch({ type: GATSBY_DEVELOP_STATUS_UPDATE, status: STATUS.WORKING });
    dispatch({ type: GATSBY_DEVELOP_START, proc: process });
  };
}

export function gatsbyDevelopStop() {
  return (dispatch: Function, getState: Function) => {
    const { currentProject, gatsbyDevelopProcess } = getState();
    gatsbyDevelopProcess.kill();

    dispatch({ type: GATSBY_DEVELOP_STOP });
    dispatch({ type: GATSBY_DEVELOP_STATUS_UPDATE, status: STATUS.IDLE, message: `Stopped` });
  };
}
