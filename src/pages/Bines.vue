<template lang="pug">
    div
        div.space
            b-row
                b-col(lg = "1" md = "1" sm = "1" xs = "12")
                    label Operadora
                b-col(lg = "2" md = "2" sm = "2" xs = "12")
                    b-form-select(v-model = "operador" :options = "listOperadoras" @change = "loadEmisores" class="mb-3" size="sm" )
                        option(:value = "null") Seleccione operador
                b-col(lg = "1" md = "1" sm = "1" xs = "12")
                    label Emisor
                b-col(lg = "3" md = "3" sm = "3" xs = "12")
                    b-form-select(v-model = "emisor" :options = "listEmisores" @change = "loadBines" class="mb-3" size="sm" )
                        option(:value = "null") Seleccione emisor
            b-row.space
            b-row.space
            b-row.space(align-h="end")
                b-col(sm = "7" md = "7" lg = "7" xs = "12" )
                    b-button( variant = "secondary" size = "sm" @click = "nuevo" )
                        i(class = "fa fa-plus")
                        span &nbsp;&nbsp;Agregar&nbsp;&nbsp;
                b-col(sm = "5" md = "5" lg = "5" xs = "12" class="my-1")
                    b-form-group(horizontal label="" class="mb-0")
                    b-input-group
                        b-form-input(size = "sm" v-model="filter" placeholder="Filtrar resultados")
                        b-input-group-append
                            b-btn(size = "sm" :disabled="!filter" @click="filter = ''") Limpiar
            b-table(stacked = "md" striped hover :fields = "fields" :items = "items" :filter="filter" caption-top).is-table
                template(slot = "activo" slot-scope = "data")
                    b-form-checkbox(@click.stop = "" :checked = "data.item.activo" :key ="data.item.codigo"  
                                    @change = "changeState(data.item.codigo, data.item.bin, data.item.descripcion, data.item.activo)")
                //template(slot = "acciones" slot-scope = "data")
                    b-button(size = "sm" variant = "secondary" class = "mr-2" @click = "editar(data.item.bin, data.item.descripcion, data.item.activo)") &nbsp;&nbsp;&nbsp;&nbsp;Editar&nbsp;&nbsp;&nbsp;&nbsp;    
            b-row
                b-col(sm = "6" md = "6" lg = "6" xs = "12")
                    b-pagination
                
        b-modal(size = "lg" ref="modalEdit" hide-footer title="REGISTRO DE BINES")
            div(class="d-block text-center")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class="my-1").is-text-right
                        label Operador:
                    b-col(sm = "3" md = "3" lg = "3" xs = "12" class="my-1").is-text-left
                        label {{operadorText}}
                b-row(v-show = "!panel")
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class="my-1").is-text-right
                        label Emisor:
                    b-col(sm = "5" md = "5" lg = "5" xs = "12" class="my-1")
                        b-input-group(size = "sm")
                            b-form-select(v-model = "emisorform" :options = "listEmisores" size="sm" )
                                option(:value = "null") Seleccione emisor
                            b-input-group-append(size = "sm")
                                b-btn(size = "sm" v-b-popover.hover="'Agregar nuevo emisor'" @click = "addEmisor" title="Info" v-show = "ne") 
                                    i(class = "fa fa-plus")
                                b-btn(size = "sm" v-b-popover.hover="'Editar emisor seleccionado'"  @click = "editEmisor" title="Info" v-show = "ee") 
                                    i(class = "fa fa-edit")
                    
                b-row(v-show = "panel")
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1").is-text-right
                        label Emisor:
                    b-col(sm = "5" md = "5" lg = "5" xs = "12" class = "my-1")
                        b-input-group(size = "sm")
                            b-form-input(size = "sm" v-model = "cemisor" placeholder = "Ingrese nuevo emisor a relacionar al operador")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class="my-1").is-text-right
                        label Bin:
                    b-col(sm = "5" md = "5" lg = "5" xs = "12" class="my-1")
                        b-form-input(size = "sm" v-model = "bin")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class="my-1").is-text-right
                        label Descripción:
                    b-col(sm = "9" md = "9" lg = "9" xs = "12" class="my-1")
                        b-form-input(size = "sm" v-model = "descripcion")
                b-row.space
                b-row.space(v-show = "panel")
                b-row.space(v-show = "panel")
                b-row.space(v-show = "panel")
                b-row.space(v-show = "!panel")
                    b-col(sm = "9" md = "9" lg = "9" xs = "12" class = "my-1")
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        b-button(variant = "success" size = "sm" class = "mr-1" @click = "save" ) 
                            span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Guardar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                b-row.space(v-show = "panel")
                    b-col(sm = "7" md = "7" lg = "7" xs = "12" class = "my-1")
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        b-button(variant = "success" size = "sm" class = "mr-1" @click = "save" ) 
                            span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Guardar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        b-button(variant = "danger" size = "sm" class = "mr-1" @click = "changePanel") 
                            span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cancelar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            operador : null,
            operadorText: '',
            data: [],
            listOperadoras: [],
            emisor: null,
            emisorform: null,
            listEmisores: [],
            items: [],
            filter: null,
            fields: [
                {
                    key: 'bin',
                    label: 'Número de Bin',
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'descripcion',
                    label: 'Descripción',
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'activo',
                    label: 'Activo',
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
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
            bin : '',
            descripcion : '',
            estado : false,
            cemisor: '',
            panel : false,
            ne: false,
            ee: false
        }
    },
    methods: {
        ...mapActions('configuracion', ['callApiGetInicializaBin', 'callApiSaveBin']),
        init(){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            this.callApiGetInicializaBin(req).then((res) => {
                if(res.data.codigoRespuesta == '01'){
                    console.log('UPDATE')
                    this.data = res.data.operadores
                    this.loadOperadores()
                    this.loadRefreshEmisores(this.operador)
                    this.loadData(this.emisor)
                }
            })
            .catch(err => { console.log(err) })
        },
        loadOperadores(){
            let infoComboOperador = []
            this.data.forEach(function (obj) {
                infoComboOperador.push({'value' : obj.codigo, 'text' : obj.descripcion})
            })
            this.listOperadoras = infoComboOperador
        },
        loadRefreshEmisores(value){
            let infoComboEmisor = []
            if(value != null){
                this.data.filter(obj => obj.codigo == value)[0].emisores.forEach(function (obj) {
                    infoComboEmisor.push({'value' : obj.codigo, 'text' : obj.descripcion})
                })
            }
            this.listEmisores = infoComboEmisor
        },
        loadEmisores(value){
            this.loadRefreshEmisores(value)
            this.emisor = null
            this.operador = value
            this.items = []
        },
        loadData(value){
            let infoDataBines = []
            if(value != null){
                infoDataBines = this.data.filter(obj => obj.codigo == this.operador)[0].emisores.filter(obj => obj.codigo == value)[0].bines
            }
            this.items = infoDataBines
            console.log(this.items)
        },
        loadBines(value){
            this.loadData(value)
            this.emisor = value
        },
        openEdit(){
            this.operadorText = this.data.filter(obj => obj.codigo == this.operador)[0].descripcion
            this.$refs.modalEdit.show()
        },
        editar(bin, descripcion, estado){
            this.ne = false
            this.ee = true
            this.bin = bin
            this.descripcion = descripcion
            this.estado = estado
            this.emisorform = this.emisor
            this.openEdit()
        },
        nuevo(){
            if(this.operador != null){
                this.ne = true
                this.ee = false
                this.bin = ''
                this.descripcion = ''
                this.estado = false
                this.emisorform = this.emisor
                this.openEdit()
            }else{
                alert("Seleccione operador")
            }
        },
        addEmisor(){
            this.panel = true
        },
        editEmisor(){
            this.panel = true
        },
        changePanel(){
            this.panel = !this.panel
        },
        changeState(codigo, bin, descripcion, estado){
            let req = {}
            req.codigoBin = codigo
            req.bin = bin
            req.descripcion = descripcion
            req.activo = !estado
            req.codigoEmisor = this.emisor
            req.token = this.jwt
            req.usuario = this.matricula 
            var txt
            var r = confirm("Seguro de cambiar el estado a este bin?")
            console.log(req)
            if (r == true) {
                this.callApiSaveBin(req).then((res) => {
                    console.log(res)
                    if(res.data.codigoRespuesta == '01'){
                        alert('Se cambio el estado correctamente!')
                    }else{
                        alert("Hubo un error al guardar los cambios.")
                    }
                })
                .catch(err => { 
                    console.log(err) 
                    alert(err)
                })
            }
            this.init()                
        },
        save(){
            let req = {}
            req.codigoBin = null
            req.bin = this.bin
            req.descripcion = this.descripcion
            req.activo = true
            req.flagEmisor = this.panel
            req.codigoEmisor = this.emisorform
            req.descripcionEmisor = this.cemisor
            req.codigoOperador = this.operador
            req.token = this.jwt
            req.usuario = this.matricula 
            console.log('REQUEST: ')
            console.log(req)
            if(req.bin == ''){
                alert('Número de bin es obligatorio')
            }else if(req.cemisor == ''){
                alert('Registro de emisor es obligatorio')
            }else if(req.panel && req.emisorform == null){
                alert('Registro de emisor es obligatorio')
            }else{
                this.callApiSaveBin(req).then((res) => {
                    if(res.data.codigoRespuesta == '01'){
                        this.init()
                        alert('Bin guardado correctamente!')
                        this.$refs.modalEdit.hide()
                    }else{
                        alert('No se pudo guardar el bin.')
                    }
                    
                })
                .catch(err => { 
                    console.log(err) 
                    alert(err)
                })
            }
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