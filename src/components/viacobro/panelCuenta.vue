<template lang="pug">
    div
        b-row
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                label Banco
            b-col(lg = "4" md = "4" sm = "4" xs = "12")
                b-form-select(v-model = "banco" :options = "listBancos" class="mb-3" size="sm" @change = "changeFormatoCuenta")
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                label Tipo cuenta
            b-col(lg = "4" md = "4" sm = "4" xs = "12")
                b-form-select(v-model = "tipocuenta" :options = "listTipoCuentas" class="mb-3" size="sm" @change = "changeFormatoCuenta")
        b-row
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                label Número cuenta
            b-col(lg = "4" md = "4" sm = "4" xs = "12")
                b-input-group
                    b-input-group-prepend
                        b-input-group-text
                            i(class="fa fa-credit-card")
                    b-form-input#npoliza(type='text'  required='' size = "sm" v-model = "cuenta" v-mask = "cuentaPatron.mascara")
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                label Moneda
            b-col(lg = "4" md = "4" sm = "4" xs = "12")
                b-form-select(v-model = "moneda" :options = "listMonedas" class="mb-3" size="sm")
</template>

<script>
export default {
    props: ['listBancos', 'listMonedas', 'listTipoCuentas', 'selectBanco', 'selectMoneda', 'selectTipoCuenta', 
            'cuentaActiva', 'maskCuenta', 'validaCuenta'],
    data(){
        return {
            listaBancos: [],
            listaTipoCuenta: [],
            listaMonedas: [],
            selectedBanco: '',
            selectedMoneda: '',
            selectedTipoCuenta: '',
            cuentaOn: '',
            cuentaPatron: {"mascara": "XXXXXXXXXXXXXXXXXXXX"},
            formatoValido: true,
        }
    },
    methods : {
        changeFormatoCuenta(){
            let tempFormat = this.validaCuenta.validaciones.filter(obj => (this.banco == obj.codigoBanco && this.tipocuenta == obj.codigoTipoCuenta))
            if(tempFormat == null || tempFormat.length == 0){
                this.cuentaPatron.mascara = "XXXXXXXXXXXXXXXXXXXX"
            }else {
                this.cuentaPatron.mascara = tempFormat[0].formato
            }
        }
    },
    computed: {
        banco: {
            get: function(){
                return this.selectedBanco == '' ? this.selectBanco : this.selectedBanco
            },
            set: function(newValue){
                this.selectedBanco = newValue
            }
        },
        tipocuenta: {
            get: function(){
                return this.selectedTipoCuenta == '' ? this.selectTipoCuenta : this.selectedTipoCuenta
            },
            set: function(newValue){
                this.selectedTipoCuenta = newValue
            }
        },
        moneda: {
            get: function(){
                return this.selectedMoneda == '' ? this.selectMoneda : this.selectedMoneda
            },
            set: function(newValue){
                this.selectedMoneda = newValue
            }
        },
        cuenta: {
            get: function(){
                return this.cuentaOn == '' ? this.cuentaActiva : this.cuentaOn
            },
            set: function(newValue){
                this.cuentaOn = newValue
            }
        },
        formatStateCuenta () {
            return this.formatoValido
        },
    }
}
</script>
