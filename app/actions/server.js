// @flow
export const LOAD_SERVERS = 'LOAD_SERVERS';

export const SAVE_SERVER = 'SAVE_SERVER';
export const DELETE_SERVER = 'DELETE_SERVER';

export function loadServers() {
  return { type: LOAD_SERVERS }
}

export function saveServer(name, host, port, username, folder, id) {
  return { type: SAVE_SERVER, name, host, port, username, folder, id }
}

export function deleteServer(id) {
  return { type: DELETE_SERVER, id };
}
