const config = require('../config')

const getPath = projectName => {
  let projects = config.projects
  for(let project of projects) {
    if(project.name === projectName) {
      return project.path
    }
  }
}

module.exports = {
  getPath
}