/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import axios from 'axios'
import qs from 'qs'

export default {
  init ({ commit, dispatch }, item) {
    return new Promise((resolve, reject) => {
      //axios.defaults.headers.common['Authorization'] = item
      axios.get('http://xmax-sgd.getsandbox.com/sir-admin/api/v1/admin/sir/inicializaciones', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + item //the token is a variable which holds the token
        },
        data: {}
      })
        .then(res => {
          if (res) {
            commit('setCodigoEmpleado', res.data.codigoEmpleado)
            commit('setNombreCompleto', res.data.nombreCompleto)
            commit('setRol', res.data.rol)
            commit('setCorreo', res.data.correo)
            commit('setMatricula', res.data.matricula)
            let menu = res.data.listaOpcionesSIR
            //console.log(menu)
            menu.sort(function(a, b){
              return a.orden.toString().localeCompare(b.orden.toString())
            })
            console.log(menu)
            //Obteniendo etiquetas u opciones principales del menu
            let arrayTitle = []
            for(let i = 0; i < menu.length; i++){
              let objTitle = {}
              if(menu[i].codigoOpcionPadre == null){
                objTitle.code = menu[i].codigoOpcion
                objTitle.title = true
                objTitle.name = menu[i].titulo
                objTitle.class = ''
                objTitle.wraper = {
                  element: '',
                  attributes: {}
                }
                arrayTitle.push(objTitle)
              }
            }
            //Obteniendo opciones de menu
            let opciones = []
            for(let i = 0; i < arrayTitle.length; i++){
              opciones.push(arrayTitle[i])
              for(let j = 0; j < menu.length; j++){
                let objFather = {}
                if(menu[j].codigoOpcionPadre == arrayTitle[i].code){
                  objFather.name = menu[j].titulo
                  objFather.url = menu[j].url
                  objFather.icon = 'fa fa-link'//menu[j].rutaIcono
                  let arrayChildren = []
                  for(let k = 0; k < menu.length; k++){
                    let objChildren = {}
                    if(menu[k].codigoOpcionPadre == menu[j].codigoOpcion){
                      objChildren.name = menu[k].titulo
                      objChildren.url = '/' + menu[k].url
                      objChildren.icon = 'fa fa-cog'//menu[k].rutaIcono
                      arrayChildren.push(objChildren)
                    }
                  }
                  if(arrayChildren.length > 0) objFather.children = arrayChildren
                  opciones.push(objFather)
                }
              }
            }
            console.log(opciones)
            commit('setOpciones', opciones)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
