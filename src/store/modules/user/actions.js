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
  signIn ({ commit, dispatch }, item) {
    console.log('SERVER: ' + urls.data().server)
    return new Promise((resolve, reject) => {
      axios.post(urls.data().server + '/sir-admin/api/v1/usuarios/ingresos', item)
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
