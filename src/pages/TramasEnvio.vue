<template lang="pug">
    div
        div.space
            b-row
                b-col(lg = "3" md = "3" sm = "3" xs = "12")
                    b-form-group(label = "Entidad Bancaria/Operadora" label-for="operador").mb-0.is-text
                    b-form-select(size = "sm" v-model = "selected")
                        option(:value = "null") Seleccione criterio de búsqueda
                        optgroup(v-for="(group, name) in optionGroups" :label="name")
                            option(v-for="option in group" :value="option.value") {{ option.text }}
                b-col(lg = "3" md = "3" sm = "3" xs = "12")
                    b-form-group(label="btn" label-for="cliente").mb-0.is-small.is-transparent
                    b-button.is-btn-2( size = "sm" @click = "listPolizasTramaEnvio")
                        i(class="fa fa-search") 
                        span.is-btn-2 &nbsp;&nbsp;Buscar
            div.space
            div.space
            div.space
            div.space
            div.space
            div.space
            b-row.space(align-h="end")
                b-col(sm = "4" md = "4" lg = "4" xs = "12" class="my-1")
                    b-form-group(horizontal label="" class="mb-0")
                    b-input-group
                        b-form-input(size = "sm" v-model="filter" placeholder="Filtrar resultados")
                        b-input-group-append
                            b-btn(size = "sm" :disabled="!filter" @click="filter = ''") Clear
            b-table(stacked = "md" striped hover :fields = "fields" :items = "items" :filter="filter" caption-top).is-table
                template(slot = "HEAD_selected" slot-scope = "data")
                    b-form-checkbox(@click.native.stop = "" v-model="selectAll")
                template(slot = "selected" slot-scope = "data")
                    b-form-checkbox(@click.stop = "" :checked = "selectAll" :value="data.item.numeroPoliza" )
                template(slot = "detalle" slot-scope = "row")
                    a.is-budget(v-if = "row.item.estado === 'Por Afiliar sin Trama'" size = "sm" variant = "secondary" @click.stop = "row.toggleDetails" class = "mr-2") 
                        i(v-if = "row.detailsShowing" class = "fa fa-eye-slash")
                        i(v-else class = "fa fa-eye")
                        span  {{ row.detailsShowing ? 'Cerrar' : 'Abrir'}} detalle
                template(slot = "row-details" slot-scope = "row")
                    b {{row.item.detalleAfiliacion}}
            b-row
                b-col(sm = "6" md = "6" lg = "6" xs = "12")
                    b-pagination
            b-row.space(align-h="end")
                b-col(sm = "2" md = "2" lg = "2" xs = "12")
                    b-button(variant = "success" size = "sm" class = "mr-1" ) 
                        i(class = "fa fa-mail-bulk") 
                        span  Generar / Enviar
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            selected: null,
            checklist: [],
            items: [],
            fields: [
                {
                    key: 'selected',
                    label: '',
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'numeroPoliza',
                    label: 'Póliza',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'fechaEmision',
                    label: 'Emisión Póliza',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-important is-text-table-center'
                    }
                },
                {
                    key: 'contratante',
                    label: 'Contratante',
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'estado',
                    label: 'Estado Afiliación',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'detalle',
                    label: '',
                }
            ],
            optionGroups: {
                'Entidad Bancaria': [],
                'Operadora': []
            },
            selectAll: true,
            filter: null
        }
    },
    methods: {
        ...mapActions('viaCobroModifica', ['callApiGetInitialize']),
        ...mapActions('gestionTrama', ['callApiGetPolizaEnvioTrama']),
        loadCombo(){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            req.poliza = '154545454'
            this.callApiGetInitialize(req).then((res) => {
                console.log(res)
                let infoComboBanco = []
                let infoComboOperador = []
                if(res.data.codigoRespuesta == '01'){
                    res.data.bancos.forEach(function (obj) {
                        infoComboBanco.push({'value' : obj.codigo, 'text' : obj.descripcion})
                    })
                    res.data.operadores.forEach(function (obj){
                        infoComboOperador.push({'value' : obj.codigo, 'text' : obj.descripcion})
                    })
                }
                this.optionGroups['Entidad Bancaria'] = infoComboBanco
                this.optionGroups['Operadora'] = infoComboOperador
                console.log(this.optionGroups)
            })
            .catch(err => { console.log(err) })
        },
        listPolizasTramaEnvio(){
            let req = {}
            req.token = this.jwt
            req.tipoProducto = 1
            req.codigoProducto = 1
            this.callApiGetPolizaEnvioTrama(req).then((res) => {
                console.log(res)
                if(res.data.codigoRespuesta == '01'){
                    this.items = res.data.listPolizas
                }
            })
            .catch(err => { console.log(err) })
        }
    },
    computed: {
      ...mapGetters('user', ['jwt']),
      ...mapGetters('session', ['matricula']),
    },
    mounted(){
        this.loadCombo()
    }
}
</script>
