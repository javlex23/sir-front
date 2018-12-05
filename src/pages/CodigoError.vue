<template lang="pug">
    div    
        b-row(class = "my-1")
            b-col(lg = "2" md = "2" sm = "2" xs = "12" class = "my-1")
                label Entidad Financiera/Operadora
            b-col(lg = "4" md = "4" sm = "4" xs = "12" class = "my-1")
                b-form-select(size = "sm" v-model = "selected" @change = "changeMedio" )
                    option(:value = "null") Seleccione criterio de búsqueda
                    optgroup(v-for = "(group, name) in optionGroups" :label = "name")
                        option(v-for = "option in group" :value = "option.value") {{ option.text }}
        b-row(class = "my-2")
        b-row(align-h = "end")
            b-col(sm = "7" md = "7" lg = "7" xs = "12")
                b-button( variant = "secondary" size = "sm" class = "mr-1" @click = "nuevo" )
                    i(class = "fa fa-plus")
                    span &nbsp;&nbsp;Agregar&nbsp;&nbsp;
            b-col(sm = "5" md = "5" lg = "5" xs = "12" class="my-1")
                b-form-group(horizontal label="" class="mb-0")
                b-input-group
                    b-form-input(size = "sm" v-model="filter" placeholder="Filtrar resultados")
                    b-input-group-append
                        b-btn(size = "sm" :disabled="!filter" @click="filter = ''") Limpiar
        b-row
            b-col(lg = "12" md = "12" sm = "12" xs = "12")
                b-table(stacked = "md" striped hover :fields = "fields" :items = "items" :filter = "filter" 
                        :current-page = "currentPage" :per-page = "perPage" @filtered = "onFiltered" caption-top).is-table
                    template(slot = "acciones" slot-scope = "data")
                        b-button(size = "sm" variant = "secondary" class = "mr-2" @click = "editar(data.item.codigo,data.item.nombre,data.item.descripcion)") 
                            i(class = "fa fa-edit") 
                            span &nbsp;&nbsp;&nbsp;&nbsp;Editar&nbsp;&nbsp;&nbsp;&nbsp;    
        b-row
            b-col(sm = "6" md = "6" lg = "6" xs = "12")
                b-pagination(:totalRows = "totalRows" :per-page = "perPage" v-model = "currentPage")

        b-modal(size = "lg" ref="modalEdit" hide-footer title="REGISTRO DE CODIGO DE ERROR")
            div(class="d-block text-center")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class="my-1").is-text-right
                        label(v-show = "tipoMedio == 'B'") Banco:
                        label(v-show = "tipoMedio == 'O'") Operador:
                    b-col(sm = "3" md = "3" lg = "3" xs = "12" class="my-1").is-text-left
                        label {{operadorText}}
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class="my-1").is-text-right
                        label Codigo:
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class="my-1")
                        b-input(size = "sm" v-model = "codigo")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class="my-1").is-text-right
                        label Nombre:
                    b-col(sm = "9" md = "9" lg = "9" xs = "12" class="my-1")
                        b-input(size = "sm" v-model = "nombre")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class="my-1").is-text-right
                        label Descripción:
                    b-col(sm = "9" md = "9" lg = "9" xs = "12" class="my-1")
                        b-input(size = "sm" v-model = "descripcion")
                b-row(class = "my-4")
                    b-col(sm = "9" md = "9" lg = "9" xs = "12")
                    b-col(sm = "2" md = "2" lg = "2" xs = "12")
                        b-button(variant = "success" size = "sm" class = "mr-1" @click = "save") 
                            span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Guardar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            selected: null,
            operadorText: '',
            optionGroups: {
                'Entidad Bancaria': [],
                'Operadora': []
            },
            fields: [
                {
                    key: 'codigo',
                    label: 'Código',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'nombre',
                    label: 'Nombre',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-left'
                    }
                },
                {
                    key: 'descripcion',
                    label: 'Descripción',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-left'
                    }
                },
                {
                    key: 'acciones',
                    label: '',
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                }
            ],
            items: [],
            currentPage: 1,
            perPage: 10,
            totalRows: 0,
            filter: null,
            data: [],
            tipoMedio: '',
            codigo: '',
            nombre: '',
            descripcion: ''
        }
    },
    methods: {
        ...mapActions('configuracion', ['callApiGetInicializaCodigoError','callApiSaveCodigoError']),
        init(){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            this.callApiGetInicializaCodigoError(req).then((res) => {
                if(res.data.codigoRespuesta == '01'){
                    this.data = res.data.mediosPago
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
            this.items = this.data.filter(obj => (obj.tipo.concat(obj.codigo) == value))[0].errores
            this.totalRows = this.items.length
            this.selected = value
            this.tipoMedio = value.substring(0, 1)
        },
        changeMedio(value){
            this.getDataMedio(value) 
        },
        openEdit(){
            console.log(this.data.filter(obj => obj.tipo.concat(obj.codigo) == this.selected))
            this.operadorText = this.data.filter(obj => obj.tipo.concat(obj.codigo) == this.selected)[0].descripcion
            this.$refs.modalEdit.show()
        },
        nuevo: function(){
            this.openEdit()
        },
        editar: function(codigo, nombre, descripcion){
            this.codigo = codigo
            this.nombre = nombre
            this.descripcion = descripcion
            this.openEdit()
        },
        onFiltered (filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        save (){
            let req = {}
            req.codigo = this.codigo
            req.nombre = this.nombre
            req.descripcion = this.descripcion
            req.token = this.jwt
            req.usuario = this.matricula
            this.callApiSaveCodigoError(req).then((res) => {
                if(res.data.codigoRespuesta == '01'){
                    init()
                }
                alert(res.data.mensajeRespuesta)
            })
            .catch(err => { console.log(err) }) 
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

