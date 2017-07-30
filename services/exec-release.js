const shell = require('shelljs')
const getPath = require('./utils').getPath

const execRelease = ({ repository, ref } = message) => {
  if (!repository && !ref) {
    return
  }
  let path = getPath(repository)
  shell.cd(path)
  shell.exec('npm run release')
}

module.exports = {
  execRelease
}