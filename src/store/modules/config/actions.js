/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import axios from 'axios'
import urls from '../../../_url'

export default {
  callApiGetInicializaBin ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/bines/inicializaciones'
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
      axios.post(urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/bines', item,
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + item.token 
        },
        data: {}
      })
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
      axios.post(urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/bines/emisores', item)
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
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/cuentas/inicializaciones'
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
      axios.post(urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/cuenta/banco', item)
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
      axios.post(urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/cuenta/tarjeta', item)
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
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/frecuencia/inicializaciones'
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
      axios.post(urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/frecuencia', item)
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
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/codigoError/inicializaciones'
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
      axios.post(urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/codigoError', item)
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
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/correo/inicializaciones'
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
      axios.post(urls.data().server + '/sir-admin/api/v1/afiliaciones/configuraciones/correo', item)
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
