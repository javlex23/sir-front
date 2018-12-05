/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import axios from 'axios'

export default {
  callApiGetInicializaBin ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/bines/inicializaciones'
      axios.get(url, 
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + request.token 
        },
        data: {}
      }).then(res => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  callApiSaveBin ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      axios.post('http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/bines', item)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  callApiSaveEmisor ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      axios.post('http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/bines/emisores', item)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  callApiGetInicializaCuenta ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/cuenta/inicializaciones'
      axios.get(url, 
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + request.token 
        },
        data: {}
      }).then(res => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  callApiSaveCuenta ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      axios.post('http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/cuenta/banco', item)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  callApiSaveTarjeta ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      axios.post('http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/cuenta/tarjeta', item)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  callApiGetInicializaFrecuencia ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/frecuencia/inicializaciones'
      axios.get(url, 
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + request.token 
        },
        data: {}
      }).then(res => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  callApiSaveFrecuencia ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      axios.post('http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/frecuencia', item)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  callApiGetInicializaCodigoError ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/codigoError/inicializaciones'
      axios.get(url, 
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + request.token 
        },
        data: {}
      }).then(res => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  callApiSaveCodigoError ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      axios.post('http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/codigoError', item)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  callApiGetInicializaCorreo ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/correo/inicializaciones'
      axios.get(url, 
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + request.token 
        },
        data: {}
      }).then(res => {
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  callApiSaveCorreo ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      axios.post('http://xmax-sgd.getsandbox.com/sir-admin/api/v1/afiliaciones/configuracion/correo', item)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}
