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
  callApiGetInicializaEnvioTrama ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/tramas/inicializaciones'
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
  callApiGetPolizaEnvioTrama ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/tramas/{tipoProducto}/{codigoProducto}'
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
  callApiProcessEnvioTrama ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      axios.post(urls.data().server + '/sir-admin/api/v1/afiliaciones/tramas/generaciones/demanda', item, 
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
  callApiGetIncializaRecepcionTrama ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/recepciones/inicializaciones'
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
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/procesos/{tipoMedioPago}/{codigoMedioPago}/{fechaInicio}/{fechaFin}?numero-Pagina=1&numero-Registros=50&tamanho-Pagina=10'
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
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/procesos/{codigoProceso}/tramas'
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
  callApiGetDownloadPlantillaRecepcion ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/plantillas/download/rechazos.xls'
      axios.get(url, 
      {
        headers: {
          Accept: 'application/vnd.ms-excel',
          Authorization: 'Bearer ' + request.token 
        },
        data: {},
        responseType: 'blob'
      }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'rechazos.xls')
        document.body.appendChild(link)
        link.click()
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
