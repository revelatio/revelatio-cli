const pm2 = require('pm2')
const Promise = require('bluebird')

const failIfErr = err => {
  if (err) {
    console.log(err.toString())
    process.exit(1)
  }
}

const connect = () => new Promise((resolve, reject) => {
  pm2.connect(err => {
    if (err) reject(err)

    resolve()
  })
})
const list = () => new Promise((resolve, reject) => {
  pm2.list((err, list) => {
    if (err) reject(err)

    resolve(list)
  })
})
const start = options => new Promise((resolve, reject) => {
  pm2.start(options, err => {
    if (err) {
      reject(err)
    }

    resolve()
  })
})
const disconnect = () => pm2.disconnect()

const apiToPM2 = (name, local) => ({
  cwd: `./${name}`,
  script: local.script || './src/run-local.js',
  name: name,
  watch: local.watch || true,
  env: {
    TZ: 'UTC',
    NODE_ENV: 'dev',
    PORT: local.port
  }
})

module.exports = {
  connect,
  list,
  start,
  disconnect,
  apiToPM2
}