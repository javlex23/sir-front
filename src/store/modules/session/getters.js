/* ============
 * Getters for the user module
 * ============
 *
 * The getters that are available on the
 * user module.
 */

export default {
    codigoEmpleado: state => { return state.codigoEmpleado },
    nombreCompleto: state => { return state.nombreCompleto },
    rol: state => { return state.rol },
    correo: state => { return state.correo },
    opciones: state => { return state.opciones },
    matricula: state => {return state.matricula}
  }
  