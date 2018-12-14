<template lang="pug">
    div
        div.space
            b-row
                b-col(lg = "3" md = "3" sm = "3" xs = "12")
                    b-form-group(label = "Entidad Bancaria/Operadora" label-for="operador").mb-0.is-text
                    b-form-select(size = "sm" v-model = "selected" )
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
            b-table(stacked = "md" striped hover :fields = "fields" :items = "items" :filter="filter" 
                    :current-page = "currentPage" :per-page = "perPage" @filtered = "onFiltered" 
                    caption-top v-model = "tableValues" @head-clicked="clearSelected").is-table
                template(slot = "HEAD_selected" slot-scope = "head" )
                    b-form-checkbox(@click.native.stop = "toggleSelected" v-model = "allSelected")
                template(slot = "selected" slot-scope = "item")
                    b-form-checkbox(@click.native.stop = "" :key = "item.index" :value = "item.item" v-model = "checkedItems")
                template(slot = "detalle" slot-scope = "row")
                    a.is-budget(v-if = "row.item.descripcionEstado === 'Por Afiliar sin Trama'" size = "sm" variant = "secondary" @click.stop = "row.toggleDetails" class = "mr-2") 
                        i(v-if = "row.detailsShowing" class = "fa fa-eye-slash")
                        i(v-else class = "fa fa-eye")
                        span  {{ row.detailsShowing ? 'Cerrar' : 'Abrir'}} detalle
                template(slot = "row-details" slot-scope = "row")
                    span.is-detalle {{row.item.observacion}}
            b-row
                b-col(sm = "6" md = "6" lg = "6" xs = "12")
                    b-pagination(:totalRows = "totalRows" :per-page = "perPage" v-model = "currentPage")
            b-row.space(align-h="end")
                b-col(sm = "2" md = "2" lg = "2" xs = "12")
                    b-button(variant = "success" size = "md" class = "mr-1" @click = "generar") 
                        i(class = "fa fa-mail-bulk") 
                        span  Generar / Enviar
            //pre {{ JSON.stringify(checkedItems, null, '  ') }}
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            selected: null,
            checkedItems: [],
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
                    key: 'descripcionEstado',
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
            allSelected: false,
            tableValues: [],
            filter: null,
            currentPage: 1,
            perPage: 10,
            totalRows: 0
        }
    },
    methods: {
        ...mapActions('gestionTrama', ['callApiGetInicializaEnvioTrama', 'callApiGetPolizaEnvioTrama', 'callApiProcessEnvioTrama']),
        loadCombo(){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            this.callApiGetInicializaEnvioTrama(req).then((res) => {
                console.log('LOAD:' + res.data.codigoRespuesta)
                let infoComboBanco = []
                let infoComboOperador = []
                if(res.data.codigoRespuesta == '01'){
                    res.data.mediosPago.filter(obj => obj.tipo == 'B').forEach(function (obj) {
                        infoComboBanco.push({'value' : obj.tipo.concat(obj.codigo), 'text' : obj.descripcion})
                    })
                    res.data.mediosPago.filter(obj => obj.tipo == 'O').forEach(function (obj){
                        infoComboOperador.push({'value' : obj.tipo.concat(obj.codigo), 'text' : obj.descripcion})
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
            console.log('SELECTED: ' + this.selected)
            req.tipoProducto = this.selected.substring(0,1)
            req.codigoProducto = this.selected.substring(1)
            this.callApiGetPolizaEnvioTrama(req).then((res) => {
                console.log(res)
                if(res.data.codigoRespuesta == '01'){
                    this.items = res.data.polizas
                }
            })
            .catch(err => { console.log(err) })
        },
        toggleSelected() {
            console.log('Checkeados' + this.checkedItems)
            console.log(this.allSelected)
            this.checkedItems = !this.allSelected ? this.tableValues : []
            console.log('Checkeados' + this.checkedItems)
        },
        clearSelected() {
            this.allSelected = false
            this.checkedItems = []
        },
        generar(){
            if(this.checkedItems.length > 0){
                let polizas = []
                this.checkedItems.forEach(function(obj){
                    polizas.push({
                        "numeroPoliza": obj.numeroPoliza,
                        "moneda": obj.moneda,
                        "accion": obj.accion
                    })
                })
                let request = {}
                request.tipo = this.selected.substring(0,1)
                request.codigo = this.selected.substring(1)
                request.polizas = polizas
                request.token = this.jwt
                console.log('REQUEST: ')
                console.log(request)
                var r = confirm("Seguro de procesar las polizas seleccionadas?")
            
                if (r == true) {
                    this.callApiProcessEnvioTrama(request).then((res) => {
                        console.log(res)
                        if(res.data.codigoRespuesta == '01'){
                            this.listPolizasTramaEnvio()
                            alert('Poliza(s) procesada(s) correctamente')
                        }else{
                            alert('Hubo problemas al procesar su(s) poliza(s)')
                        }
                    })
                    .catch(err => { 
                        console.log(err) 
                        alert(err)
                    })
                }
            }else{
                alert('Seleccione items a procesar')
            }
        },
        onFiltered (filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
    },
    watch: {
        checkedItems(a, b) {
            this.allSelected = (this.tableValues.length === a.length) ? true : false
        },
        filter(a, b) {
            if (a !== b) {
                this.clearSelected()
            }
        },
        async(a, b) {
            if (a !== b) {
                this.clearSelected()
            }
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
