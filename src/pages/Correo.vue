<template lang="pug">
    div
        b-row(sm = "5" md = "5" lg = "5" xs = "12")
            b-col(sm = "1" md = "1" lg = "1" xs = "12")
            b-col(sm = "4" md = "4" lg = "4" xs = "12" class="my-1")
                b-form-group(horizontal label="" class="mb-0")
                b-input-group
                    b-form-input(size = "sm" v-model="filter" placeholder="Filtrar resultados")
                    b-input-group-append
                        b-btn(size = "sm" :disabled="!filter" @click="filter = ''") Limpiar
        b-row(sm = "7" md = "7" lg = "7" xs = "12")
            b-col(sm = "5" md = "5" lg = "5" xs = "12" class = "my-1")
                b-table(stacked = "md" striped hover :fields = "fields" :items = "items" caption-top).is-table
                    template(slot = "acciones" slot-scope = "data")
                        b-button(size = "sm" variant = "secondary" @click = "editar(data.item.codigo,data.item.funcionalidad,data.item.tipo,data.item.para,data.item.cc,data.item.cco,data.item.asunto,data.item.cuerpo)") 
                            i(class = "fa fa-edit") 
            b-col(sm = "6" md = "6" lg = "6" xs = "12")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        label Funcionalidad
                    b-col(sm = "8" md = "8" lg = "8" xs = "12" class = "my-1")    
                        b-input(size = "sm" v-model = "funcionalidad" disabled)
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        label Tipo
                    b-col(sm = "6" md = "6" lg = "6" xs = "12" class = "my-1")   
                        label &nbsp;{{funcionalidadTipo == 'I' ? 'Interno' : 'Externo'}}
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        label Para
                    b-col(sm = "6" md = "6" lg = "6" xs = "12" class = "my-1")    
                        b-form-textarea(id = "textarea1"
                            placeholder = ""
                            :rows = "3"
                            :max-rows = "6"
                            size = "sm"
                            v-model = "para")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        label Cc
                    b-col(sm = "6" md = "6" lg = "6" xs = "12" class = "my-1")    
                        b-form-textarea(id = "textarea1"
                            placeholder = ""
                            :rows = "2"
                            :max-rows = "6"
                            size = "sm"
                            v-model = "cc")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        label Cco
                    b-col(sm = "6" md = "6" lg = "6" xs = "12" class = "my-1")    
                        b-form-textarea(id = "textarea1"
                            placeholder = ""
                            :rows = "2"
                            :max-rows = "6"
                            size = "sm"
                            v-model = "cco")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        label Asunto
                    b-col(sm = "10" md = "10" lg = "10" xs = "12" class = "my-1") 
                        b-input(size = "sm" v-model = "asunto")
                b-row
                    b-col(sm = "2" md = "2" lg = "2" xs = "12" class = "my-1")
                        label Mensaje
                    b-col(sm = "10" md = "10" lg = "10" xs = "12" class = "my-1") 
                        vue-editor(v-model="cuerpo")
                b-row(class = "my-4")
                    b-col(sm = "2" md = "2" lg = "2" xs = "12")
                        b-button(variant = "success" size = "sm" @click = "save" ) 
                            span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Guardar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    b-col(sm = "3" md = "3" lg = "3" xs = "12")
                        b-button(variant = "danger" size = "sm" class = "ml-3" @click = "cancel") 
                            span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cancelar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</template>
<script>
import { VueEditor } from "vue2-editor";
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            fields: [
                {
                    key: 'nombre',
                    label: 'Plantilla de correo',
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
            filter: null,
            selected: null,
            data: [],
            codigo: 0,
            funcionalidad: '',
            funcionalidadTipo: '',
            funcionalidadAsociado: '',
            para: '',
            cc: '',
            cco: '',
            asunto: '',
            cuerpo: ''
        }
    },
    methods: {
        ...mapActions('configuracion', ['callApiGetInicializaCorreo','callApiSaveCorreo']),
        getData(){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            this.callApiGetInicializaCorreo(req).then((res) => {
                if(res.data.codigoRespuesta == '01'){
                    this.data = res.data
                    this.init()
                }
            })
            .catch(err => { console.log(err) })
            console.log('DATA GENERAL')
            console.log(this.data)
        },
        init(){
            this.items = this.data.correos
        },
        editar(codigo, funcionalidad, tipo, para, cc, cco, asunto, cuerpo){
            this.codigo =codigo
            this.funcionalidad = funcionalidad
            this.funcionalidadTipo = tipo
            this.para = para
            this.cc = cc
            this.cco = cco
            this.asunto = asunto
            this.cuerpo = cuerpo
        },
        save(){
            let req = {}
            req.codigo = this.codigo
            req.funcionalidad = this.funcionalidad
            req.funcionalidadTipo = this.funcionalidadTipo
            req.para = this.para
            req.cc = this.cc
            req.cco = this.cco
            req.asunto = this.asunto
            req.cuerpo = this.cuerpo
            req.token = this.jwt
            req.usuario = this.matricula
            this.callApiSaveCorreo(req).then((res) => {
                if(res.data.codigoRespuesta == '01'){
                    init()
                }
                alert(res.data.mensajeRespuesta)
            })
            .catch(err => { console.log(err) })
        },
        cancel(){
            let codigo = this.codigo
            console.log(this.data.correos.filter(obj => obj.codigo == codigo))
            let dato = this.data.correos.filter(obj => obj.codigo == codigo)
            if(dato[0] != undefined){
                this.funcionalidad = dato[0].funcionalidad
                this.funcionalidadTipo = dato[0].funcionalidadTipo
                this.para = dato[0].para
                this.cc = dato[0].cc
                this.cco = dato[0].cco
                this.asunto = dato[0].asunto
                this.cuerpo = dato[0].cuerpo
            }
        }
    },
    components: {
        VueEditor
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
<style lang="styl">
    @import "~quill/assets/snow"
</style>