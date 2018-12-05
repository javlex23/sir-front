import Vue from 'vue'
import Router from 'vue-router'
// LAYOUTS
import Protected from '@/layouts/protected'
import Public from '@/layouts/public'
// PAGES
import Login from '@/pages/Login'
import Users from '@/pages/Users'
import ViaCobro from '@/pages/ViaCobro'
import TramasEnvio from '@/pages/TramasEnvio'
import TramasRecepcion from '@/pages/TramasRecepcion'
import Bines from '@/pages/Bines'
import Cuentas from '@/pages/Cuentas'
import Correo from '@/pages/Correo'
import FrecuenciaEnvio from '@/pages/FrecuenciaEnvio'
import CodigoError from '@/pages/CodigoError'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Public,
      redirect: 'login',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/admin',
      component: Protected,
      redirect: '/admin',
      children: [
        {
          path: '/admin/actions',
          name: 'Portada',
          component: Users
        },
        {
          path: '/admin/afiliacion/viacobro/revision',
          name: '/ Afiliacion / Via Cobro / Modificacion',
          component: ViaCobro
        },
        {
          path: '/admin/afiliacion/tramas/envio',
          name: '/ Afiliacion / Tramas / Generación y Envío de Tramas',
          component: TramasEnvio
        },
        {
          path: '/admin/afiliacion/tramas/recepcion',
          name: '/ Afiliacion / Tramas / Recepción de Tramas',
          component: TramasRecepcion
        },
        {
          path: '/admin/configuracion/afiliacion/bines',
          name: '/ Afiliacion / Configuracion / Bines no autorizados',
          component: Bines
        },
        {
          path: '/admin/configuracion/afiliacion/cuentas',
          name: '/ Afiliacion / Configuracion / Cuentas bancarias',
          component: Cuentas
        },
        {
          path: '/admin/configuracion/afiliacion/correo',
          name: '/ Afiliacion / Configuracion / Correos',
          component: Correo
        },
        {
          path: '/admin/configuracion/afiliacion/frecuencia',
          name: '/ Afiliacion / Configuracion / Frecuencia envío de tramas',
          component: FrecuenciaEnvio
        },
        {
          path: '/admin/configuracion/afiliacion/codigoerror',
          name: '/ Afiliacion / Configuracion / Código de Error',
          component: CodigoError
        }
      ]
    }
  ]
})
