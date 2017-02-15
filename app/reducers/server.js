// @flow
import { LOAD_SERVERS, SAVE_SERVER, DELETE_SERVER } from '../actions/server';

export function updateServers(state: Object = {}, action: Object) {
  let newServers;

  switch (action.type) {
    case LOAD_SERVERS:
      if (Object.keys(state).length > 0) { return state }
      newServers = localStorage.getItem('servers');
      if (!newServers) { return state; }

      return JSON.parse(newServers);
    case SAVE_SERVER:
      const id = action.id || (parseInt(Object.keys(state).pop() || 0) + 1);

      newServers = Object.assign({}, state, {
        ...state
      });

      newServers[id] = {
        id: id,
        name: action.name,
        host: action.host,
        port: action.port,
        username: action.username,
        folder: action.folder
      }

      localStorage.setItem('servers', JSON.stringify(newServers));

      return newServers;
    case DELETE_SERVER:
      delete state[action.id];
      newServers = Object.assign({}, state);

      localStorage.setItem('servers', JSON.stringify(newServers));
      return newServers;
    default:
      return state;
  }
}
