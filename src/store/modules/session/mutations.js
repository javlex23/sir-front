/* ============
 * Mutations for the user module
 * ============
 *
 * The mutations that are available on the
 * user module.
 */

export default {
  setCodigoEmpleado (state, payload) {
    state.codigoEmpleado = payload
  },
  setNombreCompleto (state, payload) {
    state.nombreCompleto = payload
  },
  setRol (state, payload) {
    state.rol = payload
  },
  setCorreo (state, payload) {
    state.correo = payload
  },
  setOpciones (state, payload) {
    state.opciones = payload
  },
  setMatricula (state, payload) {
    state.matricula = payload
  }
}
  