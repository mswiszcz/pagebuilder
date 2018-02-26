import os from 'os';

export function getProjectRootPath() {
  const rootPath = `${os.homedir()}/siva`;
  return rootPath;
}
