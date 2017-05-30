const axios = require('axios')

const kongFn = (method, url, data) => {
  if (method in ['get', 'options', 'delete', 'head']) {
    return axios[method](url)
  }

  return axios[method](url, data)
}

const kongRequest = method => (path, data) => {
  return kongFn(method, `http://localhost:8001${path}`, data)
    .then(response => {
      if (response.status >= 400) {
        throw Error('Failing kong server')
      }

      return response.data
    })
}

module.exports = {
  getKong: kongRequest('get'),
  postKong: kongRequest('post'),
  deleteKong: kongRequest('delete')
}
