<template lang="pug">
    div
        b-row
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                label Número Tarjeta
            b-col(lg = "4" md = "4" sm = "4" xs = "12")
                b-input-group
                    b-input-group-prepend
                        b-input-group-text
                            i(class="fa fa-credit-card")
                    b-form-input#npoliza(type='text'  required='' size = "sm" @keyup.native = "keyTarjeta" 
                        v-mask = "tarjetaPatron.mascara" v-model = "tarjeta" aria-describedby = "inputLiveFeedback1" 
                        :state = "this.formatStateTarjeta")
                    b-form-invalid-feedback(id = "inputLiveFeedback1") {{mensajeInvalidezTarjeta}}
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                label Operador
            b-col(lg = "4" md = "4" sm = "4" xs = "12")
                b-form-select(v-model = "operador" :options = "listOperadores" class="mb-3" size="sm" @change = "changeOperador")
        b-row
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                label Vencimiento
            b-col(lg = "4" md = "4" sm = "4" xs = "12")
                b-input-group
                    b-input-group-prepend
                        b-input-group-text
                            i(class="fa fa-calendar") &nbsp;
                    b-form-input#npoliza(type='text'  required='' size = "sm" v-mask = "'##/##'" v-model = "vencimiento"
                        aria-describedby = "inputLiveFeedback2" :state = "this.formatStateVencimiento"  @keyup.native = "keyVencimiento")
                    b-form-invalid-feedback(id = "inputLiveFeedback2") {{mensajeInvalidezVencimiento}}
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                label Moneda
            b-col(lg = "4" md = "4" sm = "4" xs = "12")
                b-form-select(v-model = "selectMoneda" :options = "optMonedas" class="mb-3" size="sm")
</template>

<script>    
export default {
    props: ['listOperadores', 'listMonedas', 'selectOperador', 'selectMoneda', 'nroTarjeta', 'vencimientoTarjeta', 'maskTarjeta', 'validaTarjeta'],
    data () {
        return {
            selectedOperador: '',
            selectedMoneda: '',
            listaOperadores: [],
            listaMonedas: [],
            listaMonedaOperador: [],
            tarjetaOn: '',
            vencimientoOn: '',
            tarjetaPatron: {"mascara": "#### #### #### ####", "operador": "0", "longitud" : "20"},
            formatoValido: true,
            vencimientoValido: true,
            mensajeInvalidezTarjeta: '',
            mensajeInvalidezVencimiento: ''
        }
    },
    methods: {
        init() {
            let operadoresResponse = this.listaOperadores;
            let monedasResponse = this.lstMonedas;
            this.loadComboMonedaOperador(this.operador)
        },
        loadComboMonedaOperador(opcion) {
          let listaMonedas = []
          if(!opcion){
              listaMonedas = this.listMonedas
          } else {
              let monedas = this.listOperadores.filter(obj => obj.value == opcion)[0].monedas
              this.listaMonedaOperador = this.listMonedas.filter(obj => monedas.includes(obj.value))
          }
        },
        changeOperador(value){
            this.loadComboMonedaOperador(value)
        },
        getFormatTarget(tarjeta){
            let tempFormat = this.validaTarjeta.validaciones.filter(obj => tarjeta.match(new RegExp(obj.expresionRegularJs)) != null)
            if(tempFormat == null || tempFormat.length == 0){
                this.formatoValido = false
                this.mensajeInvalidezTarjeta = this.validaTarjeta.mensajeErrorInvalidez
                this.tarjetaPatron.longitud = this.validaTarjeta.longitud
                this.tarjetaPatron.mascara = this.validaTarjeta.mascara
                this.tarjetaPatron.operador = "0"
            } else {
                this.tarjetaPatron.longitud = tempFormat[0].longitudTarjeta
                this.tarjetaPatron.mascara = tempFormat[0].mascara.replace(/X/g, '#')
                this.tarjetaPatron.operador = tempFormat[0].codigoOperadorFinanciero
                
                var strTarjeta = tarjeta.replace(/ /g, '')
                if(strTarjeta.length < this.tarjetaPatron.longitud){
                    this.formatoValido = false
                    this.mensajeInvalidezTarjeta = this.validaTarjeta.mensajeErrorLongitud
                }else{
                    this.formatoValido = true
                }
            }
        },
        keyTarjeta(evt) {
            this.getFormatTarget(this.tarjetaOn)
            this.selectedOperador = this.tarjetaPatron.operador
            
        },
        keyVencimiento(evt) {
            let format = /\d\d\/\d\d/
            if(!format.test(this.vencimientoOn)){
                this.vencimientoValido = false
                this.mensajeInvalidezVencimiento = 'Fecha inválida'
            }else{
                let hoy = new Date()
                let strFecha = this.vencimientoOn.split('/')
                let year = ('20' + strFecha[1]) * 1
                let month = strFecha[0] * 1
                console.log(hoy.getMonth())
                if(year < hoy.getFullYear() || (year == hoy.getFullYear() && month <= (hoy.getMonth()+1))){
                    this.vencimientoValido = false
                    this.mensajeInvalidezVencimiento = 'Fecha de vencimiento de tarjeta es menor a la fecha actual'
                }else {
                    this.vencimientoValido = true
                }
            }
        },
        luhnCheck(numeroTarjeta) {
            var digit, digits, odd, sum, _i, _len;
            odd = true;
            sum = 0;
            digits = (numeroTarjeta + '').split('').reverse();
            for (_i = 0, _len = digits.length; _i < _len; _i++) {
                digit = digits[_i];
                digit = parseInt(digit, 10);
                if ((odd = !odd)) {
                    digit *= 2;
                }
                if (digit > 9) {
                    digit -= 9;
                }
                sum += digit;
            }
            return sum % 10 === 0;
        }	
    },
    computed: {
        operador: {
            get: function () {
                return this.selectedOperador == '' ? this.selectOperador : this.selectedOperador
            },
            set: function (newValue) {
                this.selectedOperador = newValue
            }
        },
        optMonedas: {
            get: function () {
                return this.listaMonedaOperador == '' ? this.listMonedas : this.listaMonedaOperador
            },
            set: function (newValue) {
                this.listaMonedaOperador = newValue
            }
        },
        tarjeta: {
            get: function(){
                return this.tarjetaOn == '' ? this.nroTarjeta : this.tarjetaOn
            },
            set: function(newValue){
                this.tarjetaOn = newValue
            }
        },
        vencimiento: {
            get: function() {
                return this.vencimientoOn == '' ? this.vencimientoTarjeta : this.vencimientoOn
            },
            set: function(newValue) {
                this.vencimientoOn = newValue
            }
        },
        formatStateTarjeta () {
            return this.formatoValido
        },
        formatStateVencimiento () {
            return this.vencimientoValido
        }
    },
    mounted() {
        this.init()
    },
    beforeMount() {
    },
    create() {
    }
}

</script>