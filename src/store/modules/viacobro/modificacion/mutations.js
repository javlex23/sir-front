/* ============
 * Mutations for the user module
 * ============
 *
 * The mutations that are available on the
 * user module.
 */

export default {
  setViasCobro (state, payload) {
    state.viasCobro = payload
  },
  setLstViaCobros (state, payload) {
    state.lstViaCobros = payload
  },
  setLstOperadores (state, payload) {
    state.lstOperadores = payload
  },
  setLstMonedas (state, payload) {
    state.lstMonedas = payload
  },
  setLstBancos (state, payload) {
    state.lstBancos = payload
  },
  setLstTiposCuenta (state, payload) {
    state.lstTiposCuenta = payload
  },
  setTarjetaBin (state, payload) {
    state.lstTarjetaBin = payload
  },
  setTarjetaPatron (state, payload) {
    state.lstTarjetaPatron = payload
  },
  setCuentaPatron (state, payload) {
    state.lstCuentaPatron = payload
  },
  setDatosPoliza (state, payload) {
    state.lstDatosPoliza = payload
  },
  setRevision (state, payload) {
    state.revision = payload
  }
}
