<template lang="pug">
  div.div-portada
    div.space
    div.d-lg-none.d-md-none.is-mobile-card 
        span.is-mobile-card-title Búsqueda de Póliza
        div.space
        b-row
            b-col(lg = "3" md = "3" sm = "3" xs = "12")
                b-form-group(label="Póliza" label-for="npoliza").mb-0.is-text
                b-form-input#npoliza(type ='number'  required = '' placeholder='Nro póliza' size = "sm" v-model = "bpoliza")
            b-col(lg = "5" md = "5" sm = "5" xs = "12")
                b-form-group(label="Cliente" label-for="cliente").mb-0.is-text
                    b-input-group
                        b-form-input#cliente(type = 'text' disabled required = '' placeholder = 'Datos de cliente' size = "sm" v-model = "bcliente")
                        b-input-group-append
                          b-button.is-btn-2(@click = "showModalClients" size = "sm") 
                            span.bold ...
            b-col(lg = "3" md = "3" sm = "3" xs = "12")
                b-form-group(label="btn" label-for="cliente").mb-0.is-small.is-white
                    b-button.is-btn-2(@click = "loadData" size = "sm")
                        i(class="fa fa-search") 
                        span.is-btn-2 &nbsp;&nbsp;Buscar
        div.space
    b-card(text-variant = "white" header-tag = "header" ).is-card.top-10.d-sm-down-none
        h6(slot = "header" class = "mb-0") Búsqueda de póliza
        b-row
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                b-form-group(label="Póliza" label-for="npoliza").mb-0.is-text
                b-form-input#npoliza(type ='number'  required = '' placeholder='Número de póliza' size = "sm" v-model = "bpoliza")
            b-col(lg = "5" md = "5" sm = "5" xs = "12")
                b-form-group(label="Cliente" label-for="cliente").mb-0.is-text
                    b-input-group
                        b-form-input#cliente(type = 'text' disabled required = '' placeholder = 'Datos de cliente' size = "sm" v-model = "bcliente")
                        b-input-group-append
                          b-button.is-btn-2(@click = "showModalClients" size = "sm") 
                            span.bold ...
            b-col(lg = "3" md = "3" sm = "3" xs = "12")
                b-form-group(label="btn" label-for="cliente").mb-0.is-small
                    b-button.is-btn-2(@click = "loadData" size = "sm")
                        i(class="fa fa-search") 
                        span.is-btn-2 &nbsp;&nbsp;Buscar
    div#historial(v-show = "historial")
        div.space.d-lg-none.d-md-none
        div.space.d-lg-none.d-md-none
        div.space.d-lg-none.d-md-none
        div.space.d-lg-none.d-md-none
        div.space
            span.is-label.is-caption 
                center HISTÓRICO VÍA COBRO 
                    span(v-show = "tituloHistorial") ( Póliza: {{tituloHistorialPoliza}})
            div.space
            div.space
            b-table(stacked="md" striped hover :fields = "fields" :items = "items" caption-top).is-table
                template(slot = "descripcionEstado" slot-scope = "row")
                    b-button(variant = "success" size = "sm" class = "mr-1" v-show = "row.value == 'En Revision'" @click = "changeOption") {{row.value}}
                    span(v-show = "row.value != 'En Revision'") {{row.value}}
            b-row
                b-col(sm = "6" md = "6" lg = "6" xs = "12")
                    b-pagination
            div.space
            div.space
            div.space
            div.space
            div.space
    div#revision(v-show = "revisar")
        div.space.d-lg-none.d-md-none
        div.space.d-lg-none.d-md-none
        div.space.d-lg-none.d-md-none
        div.space.d-lg-none.d-md-none
        div.space.d-lg-none.d-md-none
        span.is-label.is-caption 
            center REVISIÓN VÍA COBRO
                span(v-show = "tituloHistorial") ( Póliza: {{tituloHistorialPoliza}})
        div.space            
        div.space
            b-row
                b-col(lg = "2" md = "2" sm = "2" xs = "12")
                    label Vía de Cobro
                b-col(lg = "4" md = "4" sm = "4" xs = "12")
                    b-form-select(v-model = "selectedViaCobro" :options = "lstViaCobros" class="mb-3" size="sm")
            div#tarjeta(v-show = "esTarjeta")
                panel-tarjeta(:listOperadores = "lstOperadores" :listMonedas = "lstMonedas" :lstMonedaOperador = "lstMonedaOperador"
                :selectOperador = "selectedOperador" :selectMoneda = "selectedMoneda" :nroTarjeta = "tarjetaOn" 
                :vencimientoTarjeta = "vencimientoOn" :maskTarjeta = "tarjetaValidacion.mascara" :validaTarjeta = "tarjetaValidacion")
            div#cuenta(v-show = "esCuenta")
                panel-cuenta(:listBancos = "lstBancos" :listTipoCuentas = "lstTipoCuentas" :listMonedas = "lstMonedas" 
                :selectBanco = "selectedBanco" :selectTipoCuenta = "selectedTipoCuenta" :selectMoneda = "selectedMoneda" 
                :cuentaActiva = "cuentaOn" :maskCuenta = "cuentaValidacion.formato" :validaCuenta = "cuentaValidacion")
            b-row.space
                b-col
                    b-button(variant = "danger" size = "sm" class = "mr-1"  @click = "changeOption") Rechazar
                    b-button(variant = "success" size = "sm" class = "mr-1"  @click = "changeOption") Guardar
                    b-button(variant = "secondary" size = "sm" class = "mr-1"  @click = "showHistory") Regresar
    b-modal(size = "lg" ref="modalClient" hide-footer title="Búsqueda de clientes")
        div(class="d-block text-center")
            b-row
                b-col(lg = "9" md = "9" sm = "9" xs = "12")
                    b-form-group
                        b-input-group.mb-3
                            b-input-group-prepend
                                b-input-group-text
                                    i(class="fa fa-search")
                            b-form-input(type='text' required='' placeholder='Ingresa nombre de cliente a buscar' size = "sm" v-model = "clienteBuscado")
                b-col(lg = "3" md = "3" sm = "3" xs = "12")
                    b-button(type='button' variant='primary' size = "sm" class='px-4' @click = "searhClient") Buscar
            b-table(stacked="md" small striped hover :fields = "fieldsClients" :items = "itemsClients" caption-top).is-table-secondary       
                template(slot="actions" slot-scope="row")
                    b-button(size="sm" @click.stop="info(row.item)" class="mr-1" variant = "success") 
                        i(class="fa fa-hand-pointer")
            b-row
                b-col
                    b-pagination()
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import panelTarjeta from '@/components/viacobro/panelTarjeta'
import panelCuenta from '@/components/viacobro/panelCuenta'
export default {
  data () {
      return {
        lstViaCobros: [],
        lstOperadores: [],
        lstMonedas: [],
        lstMonedaOperador: [],
        lstMonedaCuenta: [],
        lstBancos: [],
        lstTipoCuentas: [],
        selectedViaCobro: '',
        selectedOperador: '',
        selectedMoneda: '',
        selectedBanco: '',
        selectedTipoCuenta: '',
        tarjetaOn: '',
        vencimientoOn: '',
        cuentaOn: '',
        afiliacionOn: 0,
        items: [],
        itemsClients: [],
        tarjetaPatron: null,
        tarjetaValidacion: {
            "mascara" : "", 
            "longitud" : "",
            "validaciones" : [], 
            "mensajeErrorInvalidez": "", 
            "mensajeErrorLongitud": "",
            "flagRestriccion": ""
            },
        cuentaValidacion: {
            "formato" : "",
            "validaciones" : []
        },
        revisar: false,
        historial: true,
        esTarjeta: false,
        esCuenta: false,
        fields: [
            {
                key: 'fechaCreacion',
                label: 'F.Creación',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'viaCobro',
                label: 'Vía Cobro',
                tdClass: (value, key, item) => {
                    return 'is-text-important is-text-table-center'
                }
            },
            {
                key: 'bancoOperador',
                label: 'Banco/Operador',
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'tarjetaCuenta',
                label: 'Tarjeta/Cuenta',
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'moneda',
                label: 'Moneda',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'descripcionEstado',
                label: 'Estado',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'rechazo',
                label: 'Por rechazo',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            }
        ],
        fieldsClients: [
            {
                key: 'poliza',
                label: 'Póliza',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'cliente',
                label: 'Nombre de cliente',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-left'
                }
            },
            {
                key: 'estado',
                label: 'Estado',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'fechaIngreso',
                label: 'Fecha Ingreso',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {   key: 'actions', 
                label: '' 
            }
        ],
        clienteBuscado: '',
        bpoliza: '',
        bcliente: '',
        tituloHistorial : false,
        tituloHistorialPoliza: '',
        usuario: ''
      }
  },
  methods: { 
      ...mapActions('viaCobroModifica', ['callApiGetHistory', 'callApiGetInitialize', 'callApiGetRevision', 'callApiGetClients']),
      searhClient() {
          let req = {}
          req.token = this.jwt
          req.cliente = this.clienteBuscado
          if(req.cliente != ''){
            this.callApiGetClients(req).then((res) => {
                if(res.data.codigoRespuesta == '01'){
                    this.itemsClients = res.data.clientes
                    console.log(this.itemsClients)
                }
            })
          } else {
            alert('Ingrese texto de búsqueda')
          }
      },
      loadData() {
          this.historial = true
          this.revisar = false
          if(this.bpoliza){
            let req = {}
            req.token = this.jwt
            req.poliza = this.bpoliza
            req.usuario = this.matricula
            this.tituloHistorial = true
            this.tituloHistorialPoliza = this.bpoliza
            this.callApiGetHistory(req).then((res) => {
                if(res.data.codigoRespuesta == '01'){
                    this.items = res.data.viasCobro
                    this.afiliacionOn = res.data.viasCobro.filter(obj => obj.descripcionEstado == 'En Revision')[0].codigoAfiliacion
                    let strViaCobro = res.data.viasCobro.filter(obj => obj.descripcionEstado == 'En Revision')[0].viaCobro
                    this.esTarjeta = strViaCobro.includes('Tarjeta')
                    this.esCuenta = strViaCobro.includes('Cuenta')
                    this.callApiGetInitialize(req).then((res1) => {
                        if(res1.data.codigoRespuesta == '01'){
                            let viaCobrosResponse = res1.data.viasCobro
                            let operadoresResponse = res1.data.operadores
                            let monedasResponse = res1.data.monedas
                            let bancosResponse = res1.data.bancos
                            let tipoCuentaResponse = res1.data.tiposCuenta
                            //Vias de cobro
                            let viaCobros = []
                            for(let i = 0; i < viaCobrosResponse.length; i++){
                                viaCobros.push({
                                    "value" : viaCobrosResponse[i].codigo,
                                    "text" : viaCobrosResponse[i].descripcion
                                })
                            }
                            //Operadores
                            let operadores = []
                            for(let i = 0; i < operadoresResponse.length; i++){
                                operadores.push({
                                    "value" : operadoresResponse[i].codigo,
                                    "text" : operadoresResponse[i].descripcion,
                                    "monedas" : operadoresResponse[i].monedas
                                })
                            }
                            //Monedas
                            let monedas = []
                            for(let i = 0; i < monedasResponse.length; i++){
                                monedas.push({
                                    "value" : monedasResponse[i].codigo,
                                    "text" : monedasResponse[i].descripcion
                                })
                            }
                            //Bancos
                            let bancos = []
                            for(let i = 0; i < bancosResponse.length; i++){
                                bancos.push({
                                    "value" : bancosResponse[i].codigo,
                                    "text" : bancosResponse[i].descripcion
                                })
                            }
                            //Tipo cuentas
                            let tipoCuentas = []
                            for(let i = 0; i < tipoCuentaResponse.length; i++){
                                tipoCuentas.push({
                                    "value" : tipoCuentaResponse[i].codigo,
                                    "text" : tipoCuentaResponse[i].descripcion
                                })
                            }
                            this.lstViaCobros = viaCobros
                            this.lstOperadores = operadores
                            this.lstMonedas = monedas
                            this.lstBancos = bancos
                            this.lstTipoCuentas = tipoCuentas
                            this.tarjetaValidacion.mascara = res1.data.tarjetaPatron.formatoTarjetaDefault
                            this.tarjetaValidacion.longitud = res1.data.tarjetaPatron.longitudTarjetaDefault
                            this.tarjetaValidacion.validaciones = res1.data.tarjetaPatron.validacionesTarjeta
                            this.tarjetaValidacion.mensajeErrorInvalidez = res1.data.tarjetaPatron.mensajeTarjetaInvalida
                            this.tarjetaValidacion.mensajeErrorLongitud = res1.data.tarjetaPatron.mensajelongitudTarjetaInvalida
                            this.tarjetaValidacion.flagRestriccion = res1.data.tarjetaPatron.flagRestriccion
                            this.cuentaValidacion.formato = res1.data.cuentaPatron.formato
                            this.cuentaValidacion.validaciones = res1.data.cuentaPatron.validacionesCuenta
                        }
                    })
                }
            })
            .catch(err => { console.log(err) })
          } else {
              alert('Ingrese póliza de consulta')
          }
      },
      changeOption(evt){
        evt.preventDefault()
        console.log(this.afiliacionOn)
        let req = {"token": this.jwt, "afiliacion": this.afiliacionOn}
        this.callApiGetRevision(req).then((res) => {
            this.selectedViaCobro = res.data.codigoViaCobro
            this.tarjetaOn = res.data.numeroTarjeta
            this.vencimientoOn = res.data.vencimiento
            this.selectedOperador = res.data.codigoOperador
            this.selectedMoneda = res.data.codigoMoneda
            this.selectedBanco = res.data.codigoBanco
            this.selectedTipoCuenta = res.data.codigoTipoCuenta
            this.cuentaOn = res.data.numeroCuenta
            let monedas = this.lstOperadores.filter(obj => obj.value == this.selectedOperador)[0].monedas
            this.lstMonedaOperador = this.lstMonedas.filter(obj => monedas.includes(obj.value))
        })
        .catch(err => { console.log(err) })
        this.revisar = true
        this.historial = false
      },
      showHistory(evt){
        evt.preventDefault()
        this.revisar = false
        this.historial = true
      },
      showModalClients(){
          this.$refs.modalClient.show()
      },
      hideModalClient(){
          this.$refs.modalClient.hide()
      },
      info (item) {
        this.bpoliza = item.poliza
        this.bcliente = item.cliente
        this.$refs.modalClient.hide()
      },
  },
  computed: {
      ...mapGetters('user', ['jwt']),
      ...mapGetters('session', ['matricula']),
  },
  beforeMount() {
      
  },
  components: {
      'panel-tarjeta' : panelTarjeta,
      'panel-cuenta' : panelCuenta
  }
}
</script>

<style>
</style>