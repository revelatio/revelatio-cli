
function createApp (name) {
  console.log(`creating ${name}`)
}

module.exports = program => {
  program
    .command('create <appName>')
    .description('Create a revelat.io app project')
    .action(createApp)
}
