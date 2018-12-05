/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import axios from 'axios'

export default {
  callApiGetPolizaEnvioTrama ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:9002/sir-admin/api/v1/afiliaciones/tramas/{tipoProducto}/{codigoProducto}'
      url = url.replace('{tipoProducto}', request.tipoProducto)
      url = url.replace('{codigoProducto}', request.codigoProducto)
      axios.get(url, 
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + request.token 
        }
      }).then(res => {
        if (res) {
          //commit('setViasCobro', res.data.viasCobro)
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
  callApiGetIncializaRecepcionTrama ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://sir-afiliaciones-2.getsandbox.com/sir-admin/api/v1/afiliaciones/recepciones/inicializaciones'
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
  callApiGetListaRecepcionTrama ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://xmax-sgd.getsandbox.com/sir-admin/api/v1/procesos/{tipoMedioPago}/{codigoMedioPago}/{fechaInicio}/{fechaFin}'
      url = url.replace('{tipoMedioPago}', request.tipoMedioPago)
      url = url.replace('{codigoMedioPago}', request.codigoMedioPago)
      url = url.replace('{fechaInicio}', request.fechaInicio)
      url = url.replace('{fechaFin}', request.fechaFin)
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
  callApiGetDetalleTramaRecepcion ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://sir-afiliaciones-2.getsandbox.com/sir-admin/api/v1/afiliaciones/procesos/{codigoProceso}/tramas'
      url = url.replace('{codigoProceso}', request.codigoProceso)
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
}
