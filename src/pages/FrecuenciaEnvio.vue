<template lang="pug">
    div
        b-row
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                label(class = "my-1") Entidad Financiera/Operadora
            b-col(lg = "4" md = "4" sm = "4" xs = "12")
                b-form-select(size = "sm" v-model = "selected" class = "my-1" @change = "changeMedio")
                    option(:value = "null") Seleccione criterio de búsqueda
                    optgroup(v-for = "(group, name) in optionGroups" :label = "name")
                        option(v-for = "option in group" :value = "option.value") {{ option.text }}
        b-row
            b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                label(class = "my-1") Frecuencia semanal
            b-col(lg = "4" md = "4" sm = "4" xs = "12" class = "my-1")
                b-form-group 
                    b-form-checkbox-group(id="checkboxes1" stacked name="flavour1" v-model="selectedDiaSemana" :options="optionsDias")
        b-row
            b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                label(class = "my-1") Frecuencia diaria
            b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                b-input-group(size = "sm" prepend = "Hora" )
                    b-form-input(size = "sm" v-model = "hora" disabled) 
        b-row(class = "my-4")
            b-col(sm = "1" md = "1" lg = "1" xs = "12")
                b-button(variant = "success" size = "sm" class = "mr-1" @click = "save") 
                    span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Guardar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            b-col(sm = "2" md = "2" lg = "2" xs = "12").is-text-left
                b-button(variant = "danger" size = "sm" class = "mr-1" @click = "cancel") 
                    span &nbsp;&nbsp;&nbsp;&nbsp;Cancelar&nbsp;&nbsp;&nbsp;&nbsp;
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { getDate } from 'date-fns';
export default {
    data() {
        return {
            data: [],
            selected: null,
            selectedDiaSemana: [null],
            hora: '05:00 am',
            optionGroups: {
                'Entidad Bancaria': [],
                'Operadora': []
            },
            optionsDias: [
                {text: 'Lunes', value: '1'},
                {text: 'Martes', value: '2'},
                {text: 'Miércoles', value: '3'},
                {text: 'Jueves', value: '4'},
                {text: 'Viernes', value: '5'},
                {text: 'Sábado&nbsp;', value: '6'},
                {text: 'Domingo', value: '0'}
            ]
        }
    },
    methods: {
        ...mapActions('configuracion', ['callApiGetInicializaFrecuencia', 'callApiSaveFrecuencia']),
        getData(){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            this.callApiGetInicializaFrecuencia(req).then((res) => {
                if(res.data.codigoRespuesta == '01'){
                    this.data = res.data.mediosPago
                    this.init()
                }
            })
            .catch(err => { console.log(err) })
            console.log('DATA GENERAL')
            console.log(this.data)
        },
        init(){
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
        getFrecuencia(value){
            let info = this.data.filter(obj => obj.tipo.concat(obj.codigo) == value)[0]
            this.selectedDiaSemana = info.frecuenciaSemanal
            this.hora = info.frecuenciaHoraria
            this.selected = value
        },
        changeMedio(value){
            this.getFrecuencia(value)
        },
        save(){
            let info = this.data.filter(obj => obj.tipo.concat(obj.codigo) == this.selected)[0]
            let req = {}
            req.tipoEntidad = info.tipo
            req.codigoEntidad = this.codigo
            req.frecuenciaSemanal = this.selectedDiaSemana.join()
            req.token = this.jwt
            req.usuario = this.matricula 
            this.callApiSaveFrecuencia(req).then((res) => {
                if(res.data.codigoRespuesta == '01'){
                    this.getData()
                }
                alert(res.data.mensajeRespuesta)
            })
            .catch(err => { console.log(err) })
        },
        cancel(){
            this.getFrecuencia(this.selected)
        }
    },
    computed: {
      ...mapGetters('user', ['jwt']),
      ...mapGetters('session', ['matricula']),
    },
    mounted(){
        this.getData()
    }
}
</script>
    