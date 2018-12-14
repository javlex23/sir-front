<template lang="pug">
    div
        div.space
            b-row
                b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                    label Entidad Financiera/Operadora
                b-col(lg = "3" md = "3" sm = "3" xs = "12" class = "my-1")
                    b-form-select(size = "sm" v-model = "selected" @change = "changeMedio")
                        option(:value = "null") Seleccione criterio de búsqueda
                        optgroup(v-for = "(group, name) in optionGroups" :label = "name")
                            option(v-for = "option in group" :value = "option.value") {{ option.text }}
            b-row(v-show = "esBanco && !panel")
                b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                    label Tipos de Cuenta
                b-col(lg = "3" md = "3" sm = "3" xs = "12" class = "my-1")
                    b-input-group(size = "sm" class = "mb-1")
                        b-input-group-prepend(is-text)
                            b-form-checkbox Corriente
                        b-form-input
                    b-input-group(size = "sm" class = "mb-1")
                        b-input-group-prepend(is-text)
                            b-form-checkbox Ahorros&nbsp;&nbsp;
                        b-form-input
                    

                    //b-form-group(size = "sm" class = "my-1 ml-1")
                        b-form-checkbox-group( id="checkboxes" stacked name="flavour" v-model="tipoCuenta" :options="listTiposCuenta")
            //b-row(v-show = "esBanco && !panel")
                b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                b-col(class = "mb-1")
                    b-button(size = "sm")
                        i(class = "fa fa-plus")
            //b-row(v-show = "esBanco && !panel")
                b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                    label Tipo de Cuenta
                b-col(lg = "3" md = "3" sm = "3" xs = "12" class = "my-1")
                    b-input-group(size = "sm")
                        b-form-select(v-model = "tipoCuenta" :options = "listTipoCuentas" @change = "changeTipoCuenta" size="sm" )
                            option(:value = "null") Seleccione operador
                        b-input-group-append(size = "sm")
                            b-btn(size = "sm" v-b-popover.hover="'Agregar nuevo tipo de cuenta'" @click = "addTipoCuenta" title="Info" ) 
                                i(class = "fa fa-plus")
                            b-btn(size = "sm" v-b-popover.hover="'Editar tipo de cuenta seleccionado'"  @click = "editTipoCuenta" title="Info" ) 
                                i(class = "fa fa-edit")
            b-row(v-show = "panel && !panelMoneda")
                b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                    label Tipo de Cuenta
                b-col(sm = "3" md = "3" lg = "3" xs = "12" class = "my-1")
                    b-input-group(size = "sm")
                        b-form-input(size = "sm" ref="ctipocuenta" placeholder = "Digite nuevo tipo de cuenta" v-model = "ctipocuenta")
            //b-row(v-show = "esBanco")
                b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                    label Cuenta Bancaria (Formato)
                b-col(lg = "3" md = "3" sm = "3" xs = "12" class = "my-1")
                    b-form-textarea(id = "textarea1"
                     v-model = "formatoCuenta"
                     placeholder = "XXXXXXXXXXXXXXXX"
                     :rows = "1"
                     :max-rows = "4"
                     size = "sm")
            //b-row(v-show = "esOperador && !panel")
                b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                    label Tarjeta (Formatos)
                b-col(lg = "3" md = "3" sm = "3" xs = "12" class = "my-1")
                    b-form-textarea(id = "textarea2"
                     v-model = "formatoTarjeta"
                     placeholder = "XXXXXXXXXXXXXXXX"
                     :rows = "3"
                     :max-rows = "4"
                     size = "sm")
            b-row(v-show = "esOperador")
                b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                    label Tipo de Moneda
                b-col(lg = "3" md = "3" sm = "3" xs = "12" class="my-1")
                    b-form-group(size = "sm")
                        b-form-checkbox-group(id="checkboxes1" stacked name="flavour1" v-model="tipoMoneda" :options="listTipoMonedas")
            b-row(v-show = "panelMoneda")
                b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                b-col(sm = "3" md = "3" lg = "3" xs = "12" class = "my-1")
                    b-input-group(size = "sm")
                        b-form-input(size = "sm" placeholder = "Digite tipo de moneda a relacionar a Operador")
            b-row(class = "my-4" )
                b-col(sm = "2" md = "2" lg = "1" xs = "12")
                    b-button(variant = "success" size = "sm" class = "mr-1" @click = "save") 
                        span &nbsp;&nbsp;&nbsp;Guardar&nbsp;&nbsp;&nbsp;
                b-col(sm = "2" md = "2" lg = "1" xs = "12").is-text-left
                    b-button(variant = "danger" size = "sm" class = "mr-1" @click = "cancel") 
                        span &nbsp;&nbsp;Cancelar&nbsp;&nbsp;
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            selected: null,
            optionGroups: {
                'Entidad Bancaria': [],
                'Operadora': []
            },
            tipoCuenta: null,
            tipoMoneda: [null],
            listTiposCuenta: [],
            formatoCuenta: '',
            formatoTarjeta: '',
            panel: false,
            panelMoneda: false,
            esOperador: false,
            esBanco: false,
            data: [],
            ctipocuenta: '',
            listTipoMonedas: [
                {text: 'PEN', value: 'Soles'},
                {text: 'USD', value: 'Dólares'}
            ],
            flagTipoCuenta: 0
        }
    },
    methods: {
        ...mapActions('configuracion', ['callApiGetInicializaCuenta','callApiSaveCuenta','callApiSaveTarjeta']),
        init(){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            this.callApiGetInicializaCuenta(req).then((res) => {
                console.log('MEDIOS PAGO: ')
                console.log(res)
                if(res.data.codigoRespuesta == '01'){
                    this.data = res.data.mediosPago
                    let infoComboMoneda = []
                    let infoCheckTipoCuentas = []
                    res.data.monedas.forEach(function (obj) {
                        infoComboMoneda.push({'value' : obj.codigo, 'text' : obj.descripcion})
                    })
                    res.data.tiposCuenta.forEach(function (obj) {
                        infoCheckTipoCuentas.push({'value' : obj.codigo, 'text' : obj.descripcion})
                    })
                    this.listTipoMonedas = infoComboMoneda
                    this.listTiposCuenta = infoCheckTipoCuentas
                    this.loadOperadores()
                }
            })
            .catch(err => { console.log(err) })
        },
        loadOperadores(){
            let infoComboBanco = []
            let infoComboOperador = []                
            this.data.filter(obj => obj.tipo == 'B').forEach(function (obj) {
                infoComboBanco.push({'value' : 'B' + obj.codigo, 'text' : obj.descripcion})
            })
            this.data.filter(obj => obj.tipo == 'O').forEach(function (obj) {
                infoComboOperador.push({'value' : 'O' + obj.codigo, 'text' : obj.descripcion})
            })
            this.optionGroups['Entidad Bancaria'] = infoComboBanco
            this.optionGroups['Operadora'] = infoComboOperador
        },
        getDataMedio(value){
            let infoComboTipoCuenta = []
            let infoComboMoneda = []
            let medioObjB = this.data.filter(obj => ('B'.concat(obj.codigo) == value && obj.tipo == 'B'))
            let medioObjO = this.data.filter(obj => ('O'.concat(obj.codigo) == value && obj.tipo == 'O'))
            this.esBanco = medioObjB.length > 0
            this.esOperador = medioObjO.length > 0
            this.selected = value
            if(this.esBanco){
                this.panelMoneda = false
                medioObjB[0].tipoCuenta.forEach(function (obj) {
                    infoComboTipoCuenta.push({'value' : obj.codigo, 'text' : obj.descripcion})
                })
                this.listTipoCuentas = infoComboTipoCuenta
                this.tipoCuenta = infoComboTipoCuenta.length > 0 ? infoComboTipoCuenta[0].value : null
                this.getFormatCuenta(this.tipoCuenta)
            }
            if(this.esOperador){
                this.panel = false
                this.formatoTarjeta = medioObjO[0].formatos.join().replace(',','\n')
                
                medioObjO[0].monedas.forEach(function (obj) {
                    infoComboMoneda.push(obj.codigo)
                })
                this.tipoMoneda = infoComboMoneda
            }
        },
        changeMedio(value){
            this.getDataMedio(value)
        },
        getFormatCuenta(value){
            let medioObj = this.data.filter(obj => ('B'.concat(obj.codigo) == this.selected && obj.tipo == 'B'))
            let v1 = medioObj.length > 0 
            let tipoObj = medioObj[0].tipoCuenta.filter(obj => obj.codigo == value)
            let v2 = tipoObj.length > 0
            this.formatoCuenta = v2 ? tipoObj[0].formato : ''
            this.ctipocuenta = v2 ? tipoObj[0].descripcion : ''
        },
        changeTipoCuenta(value){
            this.getFormatCuenta(value)
        },
        addTipoCuenta: function(){
            this.panel = !this.panel
            this.formatoCuenta = ''
            this.ctipocuenta = ''
            this.$nextTick(() => this.$refs.ctipocuenta.focus())
            this.flagTipoCuenta = 1
        },
        editTipoCuenta: function(){
            this.panel = !this.panel
            this.$nextTick(() => this.$refs.ctipocuenta.focus())
            this.flagTipoCuenta = 2
        },
        changePanel: function(){
            this.panel = !this.panel
        },
        changePanelMoneda: function(){
            this.panelMoneda = !this.panelMoneda
        },
        addTipoMoneda: function(){
            this.panelMoneda = true
            this.panel = null
        },
        editTipoMoneda: function(){
            this.panelMoneda = true
            this.panel = null
        },
        save: function(){
            if(this.esBanco){
                let req = {}
                req.codigoEntidadFinanciera = this.selected.replace('B','')
                req.codigoTipoCuenta = this.tipoCuenta
                req.descripcionTipoCuenta = this.ctipocuenta
                req.flagTipoCuenta = 0
                req.formatoTipoCuenta = this.formatoCuenta
                req.token = this.jwt
                req.usuario = this.matricula
                this.callApiSaveCuenta(req).then((res) => {
                    if(res.data.codigoRespuesta == '01'){
                        init()
                    }
                    alert(res.data.mensajeRespuesta)
                })
                .catch(err => { console.log(err) })  
            }else if(this.esOperador){
                let req = {}
                req.longitudTarjeta = this.formatoTarjeta.length
                req.mascara = this.formatoTarjeta
                req.codigoOperador = this.selected.replace('O','')
                req.codigoMoneda = this.tipoMoneda.join()
                req.token = this.jwt
                req.usuario = this.matricula
                this.callApiSaveTarjeta(req).then((res) => {
                    if(res.data.codigoRespuesta == '01'){
                        init()
                    }
                    alert(res.data.mensajeRespuesta)
                })
                .catch(err => { console.log(err) })  
            }else{
                alert('Aún no se han encontrado cambios')
            }
        },
        cancel: function(){

            this.getDataMedio(this.selected)
            this.panel = false
        }
    },
    computed: {
      ...mapGetters('user', ['jwt']),
      ...mapGetters('session', ['matricula']),
    },
    mounted(){
        this.init()
    }
}      
</script>      