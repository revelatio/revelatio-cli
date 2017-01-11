import fs from 'fs-extra'
import Promise from 'bluebird'

const mkdirs = Promise.promisify(fs.mkdirs)

function createApp (name) {
  return mkdirs(name)
    .then(() => {
      console.log(`Created app ${name}`)
    })
}

export {createApp}

export default function (program) {
  program
    .command('create <appName>')
    .description('Create a revelat.io app project')
    .action(createApp)
}
