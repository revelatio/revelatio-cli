import fs from 'fs-extra'
import Promise from 'bluebird'

const mkdirs = Promise.promisify(fs.mkdirs)
const writeJson = Promise.promisify(fs.writeJson)

function revelatioJson(name) {
  return {
    "name": name,

    "stages": [
      {
        "name": "dev",
        "domain": `*.${name}-dev.com`,
        "local": true,
        "live": false
      },
      {
        "name": "staging",
        "domain": `*.${name}-staging.com`,
        "local": false,
        "live": false
      },
      {
        "name": "prod",
        "domain": `*.${name}.com`,
        "local": false,
        "live": true
      }
    ]
  }
}

function createApp (name) {
  return mkdirs(name)
    .then(() => {
      console.log(`Created app ${name}`)

      writeJson(`${name}/.revelatio.json`, revelatioJson(name))
        .then(() => {
          console.log(`Created .revelatio.json`)
        })
    })
}

export {createApp}

export default function (program) {
  program
    .command('create <appName>')
    .description('Create a revelat.io app project')
    .action(createApp)
}
