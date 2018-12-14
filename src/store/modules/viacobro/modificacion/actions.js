/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import axios from 'axios'
import urls from '../../../../_url'

export default {
    callApiGetHistory ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/modificaciones/historicos/{numeroPoliza}'
      url = url.replace('{numeroPoliza}', request.poliza)
      axios.get(url, 
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + request.token //the token is a variable which holds the token
        },
        data: {}
      }).then(res => {
          if (res) {
            commit('setViasCobro', res.data.viasCobro)
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
    callApiGetClients ({ commit, dispatch }, request) {
      return new Promise((resolve, reject) => {
        let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/modificaciones/clientes/{cliente}'
        url = url.replace('{cliente}', request.cliente)
        axios.get(url, 
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + request.token //the token is a variable which holds the token
          }
        }).then(res => {
            if (res) {
              //commit('setClientes', res.data.clientes)
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
    callApiGetInitialize ({ commit, dispatch }, request) {
      return new Promise((resolve, reject) => {
        let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/modificaciones/inicializaciones/{numeroPoliza}/usuario/{usuarioLogin}/aplicacion/{codigoAplicacion}'
        url = url.replace('{numeroPoliza}', request.poliza)
        url = url.replace('{usuarioLogin}', request.usuario)
        url = url.replace('{codigoAplicacion}', 'SIR')
        let comboFormat = {}
        axios.get(url, 
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + request.token
          }
        }).then(res => {
          if (res) {
            commit('setLstViaCobros', res.data.viasCobro)
            commit('setLstOperadores', res.data.operadores)
            commit('setLstMonedas', res.data.monedas)
            commit('setLstBancos', res.data.bancos)
            commit('setLstTiposCuenta', res.data.tiposCuenta)
            commit('setTarjetaBin', res.data.tarjetaBin)
            commit('setTarjetaPatron', res.data.tarjetaPatron)
            commit('setCuentaPatron', res.data.cuentaPatron)
            commit('setDatosPoliza', res.data.datosPoliza)
            
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
    callApiGetRevision({ commit, dispatch }, request) {
      return new Promise((resolve, reject) => {
        let url = urls.data().server + '/sir-admin/api/v1/afiliaciones/modificaciones/revisiones/inicializaciones/{codigoAfiliacion}'
        url = url.replace('{codigoAfiliacion}', request.afiliacion)
        axios.get(url, 
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + request.token
          }
        }).then(res => {
          if (res) {
            commit('setRevision', res.data)
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
