export default {
    data () {
      return {
        type : 'mock',//mock, dev, test, prod
        urls : {
            user_login : '',
            session_ini : '',
            trama_recepcion_load_combo : ''
        }
      }
    },
    methods : {
      init(){
          if(this.type == 'mock'){
            this.urls.user_login = 'http://sir-afiliaciones.getsandbox.com/sir-admin/api/v1/usuarios/ingresos'
            this.urls.session_ini = 'http://sir-afiliaciones.getsandbox.com/admin/sir/inicializaciones'
            this.urls.trama_recepcion_load_combo = ''
          }else if(this.type == 'dev'){
            this.urls.user_login = 'http://128.28.6.63:9002/sir-admin/api/v1/usuarios/ingresos'
            this.urls.session_ini = 'http://128.28.6.63:9002/sir-admin/api/v1/admin/sir/inicializaciones'
            this.urls.trama_recepcion_load_combo = ''
          }
      }
    },
    computed : {
        url_login: function () {
            return 'http://sir-afiliaciones.getsandbox.com/sir-admin/api/v1/usuarios/ingresos'
        }
    }
  }