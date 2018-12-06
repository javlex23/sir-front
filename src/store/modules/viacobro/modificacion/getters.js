/* ============
 * Getters for the user module
 * ============
 *
 * The getters that are available on the
 * user module.
 */

export default {
    viasCobro: state => { return state.viasCobro },
    lstViaCobros: state => { return state.lstViaCobros },
    lstOperadores: state => { return state.lstOperadores },
    lstMonedas: state => { return state.lstMonedas },
    lstBancos: state => { return state.lstBancos },
    lstTiposCuenta: state => { return state.lstTiposCuenta },
    lstTarjetaBin: state => { return state.lstTarjetaBin },
    lstTarjetaPatron: state => { return state.lstTarjetaPatron },
    lstCuentaPatron: state => { return state.lstCuentaPatron },
    lstDatosPoliza: state => { return state.lstDatosPoliza },
    revision: state => {return state.revision}
  }
  