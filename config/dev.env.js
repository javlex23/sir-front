'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONST_RESPONSE_OK_CODE: '01',
  CONST_RESPONSE_ERROR_CODE: '99',
  API_URL: '`http://portal-admin.getsandbox.com/api/v1`',
  API_URL_TOKEN: '',
  API_URL_INICIALIZAR: '',
  API_URL_AFILIACION_MODIFICACION_GET_HISTORIAL: '',
  API_URL_AFILIACION_MODIFICACION_GET_INICIALIZAR: '',
  API_URL_AFILIACION_MODIFICACION_GET_REVISAR: '',
  API_URL_AFILIACION_MODIFICACION_ACTION_REVISAR: ''
})
