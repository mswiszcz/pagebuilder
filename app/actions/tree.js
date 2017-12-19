// @flow
export const EXPAND_DIRECTORY = 'EXPAND_DIRECTORY';

export function expandDirectory(directory) {
  return { type: EXPAND_DIRECTORY, directory };
}
