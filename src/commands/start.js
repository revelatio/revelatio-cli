const fs = require('fs-extra')
const { getKong, postKong } = require('../kong')
const Promise = require('bluebird')
const myIP = require('my-ip')
const R = require('ramda')
const { apiToPM2, start, list, connect, disconnect } = require('../pm2-api')
const { addKongApi } = require('./add')

const startService = (api, project, runningProcesses, kongApis) => {
  // Check is already on kong
  const kongApi = kongApis.find(kongApi => kongApi.name === api.name)

  // Already on Kong, skip
  if (kongApi) {
    return true
  }

  // If upstream_url just link to kong
  if (api.upstream_url) {
    return addKongApi(api.name, project.hosts, api.upstream_url, api.uris.join(','))
  }

  // If not, start local node service
  return startPM2Service(api, project, runningProcesses, kongApis)
}

const startPM2Service = (api, project, runningProcesses, kongApis) => {
  return fs.readJson(`./${api.name}/package.json`)
    .then(package => {
      const local = package.local
      const pm2RunSettings = apiToPM2(api.name, local)

      if (runningProcesses.some(process => process.name === api.name)) {
        console.log(`Already running ${api.name}`)
        return true
      }

      console.log(`Starting ${api.name}`)
      return start(pm2RunSettings)
        .then(() => package)
    })
    .then(package => addKongApi(api.name, project.hosts, `http://${myIP()}:${package.local.port}`, api.uris.join(',')))
}

function startProject (name) {
  const settingsFileName = name.endsWith('.json')
    ? name
    : `./${name}.json`
  const localIP = myIP()

  return connect()
    .then(() => Promise.all([
        list(),
        fs.readJson(settingsFileName),
        getKong('/apis')
      ])
    )
    .then(([runningProcesses, project, response]) => ({
      runningProcesses,
      project,
      kongApis: response.data
    }))
    .then(({runningProcesses, project, kongApis}) => Promise.all(project.apis.map(api => startService(api, project, runningProcesses, kongApis))))
    .then(disconnect)
}

module.exports = program => {
  program
    .command('start <config_file>')
    .description('Starts project')
    .action(startProject)
}
