const fs = require('fs-extra')
const { getKong } = require('../kong')
const Promise = require('bluebird')
const myIP = require('my-ip')
const R = require('ramda')

const replaceIP = ip => apiConfig => Object.assign({}, apiConfig, {upstream_url: apiConfig.upstream_url.replace(ip, 'LOCAL_IP')})
const cleanConfig = R.pick(['uris', 'upstream_url', 'name', 'hosts'])
const transformConfig = R.evolve({
  hosts: R.join(','),
  uris: R.join(',')
})

function saveApi (name, api) {
  const settingsFileName = `./${name}.json`
  const localIP = myIP()

  return Promise.all([
    getKong(`/apis/${api}`),
    fs.readJson(settingsFileName)
  ])
    .then(([apiConfig, appSettings]) => {
      const apis = appSettings.apis || []
      const apiIndex = apis.findIndex(apiDef => apiDef.name === api)
      const apiConfigToStore = R.compose(
        transformConfig,
        cleanConfig,
        replaceIP(localIP)
      )(apiConfig)

      if (apiIndex >= 0) {
        apis[apiIndex] = apiConfigToStore
      } else {
        apis.push(apiConfigToStore)
      }

      return Object.assign({}, appSettings, {apis})
    })
    .then(
      modifiedSettings => fs.writeFile(settingsFileName, JSON.stringify(modifiedSettings, null, 2))
    )
    .then(() => {
      console.log(`saved ${api} on ${name}`)
    })
    .catch(err => {
      console.error(err.toString())
    })
}

module.exports = program => {
  program
    .command('save <appName> <apiName>')
    .description('Save API to app project')
    .action(saveApi)
}
