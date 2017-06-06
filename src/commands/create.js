const fs = require('fs-extra')

function createApp (name) {
  const appSettings = {
    name
  }

  fs.writeFile(`./${name}.json`, JSON.stringify(appSettings, null, 2))
    .then(() => {
      console.log(`created ${name}.json`)
    })
    .catch(err => {
      console.error(err.toString())
    })
}

module.exports = program => {
  program
    .command('create <appName>')
    .description('Create a revelat.io app project')
    .action(createApp)
}
