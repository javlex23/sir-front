/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import axios from 'axios'

export default {
  signIn ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      axios.post('http://xmax-sgd.getsandbox.com/sir-admin/api/v1/usuarios/ingresos', item)
        .then(res => {
          if (res) {
            commit('setJWT', res.data.jwtToken)
            console.log(res.data)
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
  signOut ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      commit('setJWT', '')
    })
  }
}
