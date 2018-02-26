// @flow
import {
  GATSBY_DEVELOP_STATUS_UPDATE,
  GATSBY_BUILD_STARTED,
  GATSBY_BUILD_FINISHED,
  GATSBY_DEVELOP_START,
  GATSBY_DEVELOP_STOP } from '../actions/gatsby';

export const STATUS = Object.freeze({
  IDLE: '0',
  RUNNING: '1',
  ERROR: '2',
  WORKING: '3'
})

const defaultStatus = {
  develop: STATUS.IDLE,
  developMessage: '',
  serve: STATUS.IDLE,
  serveMessage: '',
  build: STATUS.IDLE
}

export function gatsbyDevelopProcess(proc = null, action: Object) {
  let result = proc;

  switch (action.type) {
    case GATSBY_DEVELOP_START:
      result = action.proc;
      return result
    case GATSBY_DEVELOP_STOP:
      result = null;
      return result;
    default:
      return result;
  }
}

export function gatsbyStatus(status = defaultStatus, action: Object) {
  let result = Object.assign({}, status);

  switch (action.type) {
    case GATSBY_DEVELOP_STATUS_UPDATE:
      result.develop = action.status;
      if (!!action.message && !!action.message.trim())
        result.developMessage = action.message;

      return result;
    default:
      return result;
  }
}
