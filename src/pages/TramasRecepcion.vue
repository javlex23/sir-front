<template lang="pug">
    div
        div.space
            b-row
                b-col(lg = "3" md = "3" sm = "3" xs = "12")
                    b-form-group(label = "Entidad Bancaria/Operadora" label-for = "operador").mb-0.is-text
                    b-form-select(size = "sm" v-model = "selected" )
                        option(:value = "null") Seleccione criterio de búsqueda
                        optgroup(v-for = "(group, name) in optionGroups" :label = "name")
                            option(v-for = "option in group" :value = "option.value") {{ option.text }}
                b-col(lg = "2" md = "2" sm = "2" xs = "12")
                    b-form-group(label = "Rango de fechas" ).mb-0.is-text
                    div.datepicker-trigger
                        b-form-input(
                            type = "text"
                            id = "datepicker-trigger"
                            placeholder = "Fecha desde"
                            :value = "formatDates(dateOne, dateTwo)" 
                            v-model = "dateOne" 
                            size = "sm")
                        AirbnbStyleDatepicker(
                            :trigger-element-id = "'datepicker-trigger'"
                            :mode = "'range'"
                            :fullscreen-mobile = "true"
                            :date-one = "dateOne"
                            :date-two = "dateTwo"
                            @date-one-selected = "val => { dateOne = val }"
                            @date-two-selected = "val => { dateTwo = val }")
                b-col(lg = "2" md = "2" sm = "2" xs = "12")
                    b-form-group(label = "Rango de fechas" ).mb-0.is-small.is-transparent
                        b-form-input(size = "sm" placeholder = "Fecha hasta" v-model = "dateTwo" disabled)
                b-col(lg = "3" md = "3" sm = "3" xs = "12")
                    b-form-group(label = "btn" label-for = "cliente").mb-0.is-small.is-transparent
                    b-button.is-btn-2( size = "sm" @click = "list")
                        i(class = "fa fa-search") 
                        span.is-btn-2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Buscar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                            b-btn(size = "sm" :disabled="!filter" @click="filter = ''") Limpiar
            b-table(stacked = "md" striped hover :fields = "fields" :items = "items" :filter="filter" caption-top).is-table
                template(slot = "selected" slot-scope = "row")
                    b-form-radio-group(id="radios" v-model="checked" name="radioSubComponent")
                        b-form-radio(@click.stop = "" )
                template(slot = "detalle" slot-scope = "row")
                    b-dropdown(v-show = "row.item.estado == 'Recepcion con error' || row.item.estado == 'Reprocesado'" 
                                id = "ddown" 
                                variant = "secondary" 
                                text = "Detalle" 
                                class = "mr-2" 
                                size = "sm")
                        b-dropdown-item(@click = "itemProcesados(row.item.proceso)") Procesados
                        b-dropdown-item(@click = "itemNoProcesados(row.item.proceso)") No Procesados
                        b-dropdown-item(@click = "itemNoEncontrados(row.item.proceso)") No Encontrados
                    b-button(v-show = "row.item.estado == 'Recepcionado'" size = "sm" variant = "secondary" class = "mr-2" @click = "abrirDetalle(row.item.estado, row.item.codigoProceso)") &nbsp;Detalle&nbsp;&nbsp;
            b-row
                b-col(sm = "6" md = "6" lg = "6" xs = "12")
                    b-pagination
                b-col(sm = "6" md = "6" lg = "6" xs = "12")
                    b-link.link-reference(@click = "descargarPlantilla") 
                        i(class = "fa fa-arrow-alt-circle-down")
                        span  Descargar Plantilla Rechazados
            b-row
                b-col(sm = "6" md = "6" lg = "6" xs = "12")
                    //vue-dropzone(ref = "myVueDropzone" id = "dropzone" :options = "dropzoneOptions" )
                    b-form-file(
                        v-model="file" 
                        :state="Boolean(file)" 
                        placeholder = "Bucar archivo para subir..." 
                        size = "sm")
            b-row.space(align-h = "end")
                b-col(sm = "2" md = "2" lg = "2" xs = "12")
                    b-button(variant = "success" size = "md" class = "mr-1" ) 
                        i(class = "fa fa-mail-bulk") 
                        span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Procesar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        b-modal(size = "lg" ref="modalRecepcion" hide-footer title="DETALLE DE PROCESO")
            div(class="d-block text-center")
                b-row.space(align-h="end")
                    b-col(sm = "5" md = "5" lg = "5" xs = "12" class="my-1")
                        b-form-group(horizontal label="" class="mb-0")
                        b-input-group
                            b-form-input(size = "sm" v-model="filterR" placeholder="Filtrar resultados")
                            b-input-group-append
                                b-btn(size = "sm" :disabled="!filterR" @click="filterR = ''") Limpiar
                b-table(stacked = "md" :fields = "fieldsDetalleR" :items = "itemsR" :filter = "filterR" small striped hover caption-top).is-table-secondary                               
                b-row
                    b-col(sm = "6" md = "6" lg = "6" xs = "12")
                        b-pagination

        b-modal(size = "lg" ref="modalProcesado" hide-footer title="DETALLE DE PROCESO (STATUS: PROCESADOS)")
            div(class="d-block text-center")
                b-row.space(align-h="end")
                    b-col(sm = "5" md = "5" lg = "5" xs = "12" class="my-1")
                        b-form-group(horizontal label="" class="mb-0")
                        b-input-group
                            b-form-input(size = "sm" v-model="filterP" placeholder="Filtrar resultados")
                            b-input-group-append
                                b-btn(size = "sm" :disabled="!filterP" @click="filterP = ''") Limpiar
                b-table(stacked = "md" :fields = "fieldsDetalleP" :items = "itemsP" :filter = "filterP" small striped hover caption-top).is-table-secondary                               
                b-row
                    b-col(sm = "6" md = "6" lg = "6" xs = "12")
                        b-pagination

        b-modal(size = "lg" ref="modalNoProcesado" hide-footer title="DETALLE DE PROCESO (STATUS: NO PROCESADOS)")
            div(class="d-block text-center")
                b-row.space(align-h="end")
                    b-col(sm = "5" md = "5" lg = "5" xs = "12" class="my-1")
                        b-form-group(horizontal label="" class="mb-0")
                        b-input-group
                            b-form-input(size = "sm" v-model="filterNP" placeholder="Filtrar resultados")
                            b-input-group-append
                                b-btn(size = "sm" :disabled="!filterNP" @click="filterNP = ''") Limpiar
                b-table(stacked = "md" :fields = "fieldsDetalleNP" :items = "itemsNP" :filter = "filterNP" small striped hover caption-top).is-table-secondary                               
                    template(slot = "clip" slot-scope = "row")
                        b-button(size = "sm" variant = "secondary" class = "mr-2" v-clipboard:copy="row.item.trama" @click="doCopy(row.item.trama)") Copiar trama
                b-row
                    b-col(sm = "6" md = "6" lg = "6" xs = "12")
                        b-pagination
                    b-col(sm = "6" md = "6" lg = "6" xs = "12")
                        b-link.link-reference(id = "downloadTrama" @click = "descargarTrama") 
                            i(class = "fa fa-arrow-alt-circle-down")
                            span  Descargar Trama
                b-row.space(align-h = "end")
                    b-col(sm = "3" md = "3" lg = "3" xs = "12")
                        b-button(variant = "success" size = "sm" class = "my-0" ) 
                            span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reprocesar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        b-modal(size = "lg" ref="modalNoEncontrado" hide-footer title="DETALLE DE PROCESO (STATUS: NO ENCONTRADOS)")
            div(class="d-block text-center")
                b-row.space(align-h="end")
                    b-col(sm = "5" md = "5" lg = "5" xs = "12" class="my-1")
                        b-form-group(horizontal label="" class="mb-0")
                        b-input-group
                            b-form-input(size = "sm" v-model="filterNE" placeholder="Filtrar resultados")
                            b-input-group-append
                                b-btn(size = "sm" :disabled="!filterNE" @click="filterNE = ''") Limpiar
                b-table(stacked = "md" :fields = "fieldsDetalleNE" :items = "itemsNE" :filter = "filterNE" small striped hover caption-top).is-table-secondary                               
                b-row
                    b-col(sm = "6" md = "6" lg = "6" xs = "12")
                        b-pagination
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import format from 'date-fns/format'
import Datepicker from 'vuejs-datepicker'
import {en, es} from 'vuejs-datepicker/dist/locale'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
    data() {
        return {
            es: es,
            selected: null,
            items: [],
            itemsR: [],
            itemsP: [],
            itemsNP: [],
            itemsNE: [],
            date: null,
            fields: [
                {
                    key: 'selected',
                    label: '',
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'fechaEnvio',
                    label: 'Fecha Envío',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-important is-text-table-center'
                    }
                },
                {
                    key: 'fechaRecepcion',
                    label: 'Fecha Recepción',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-important is-text-table-center'
                    }
                },
                {
                    key: 'nombreArchivo',
                    label: 'Archivo Envío',
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'nombreArchivoReproceso',
                    label: 'Archivo Reprocesado',
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
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
                    key: 'detalle',
                    label: '',
                }
            ],
            fieldsDetalleR: [
                {
                    key: 'num_poliza',
                    label: 'Póliza',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'estado',
                    label: 'Estado',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center uppercase'
                    }
                },
                {
                    key: 'observacion',
                    label: 'Observación',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'clip',
                    label: ''
                }
            ],
            fieldsDetalleP: [
                {
                    key: 'poliza',
                    label: 'Póliza',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'estado',
                    label: 'Estado',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center uppercase'
                    }
                },
                {
                    key: 'observacion',
                    label: 'Observación',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                }
            ],
            fieldsDetalleNP: [
                {
                    key: 'poliza',
                    label: 'Póliza',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'estado',
                    label: 'Estado',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center uppercase'
                    }
                },
                {
                    key: 'observacion',
                    label: 'Observación',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'clip',
                    label: ''
                }
            ],
            fieldsDetalleNE: [
                {
                    key: 'linea',
                    label: 'Línea Archivo',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center uppercase'
                    }
                },
                {
                    key: 'observacion',
                    label: 'Observación',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'clip',
                    label: ''
                }
            ],
            optionGroups: {
                'Entidad Bancaria': [],
                'Operadora': []
            },
            checked: false,
            filter: null,
            filterR: null,
            filterP: null,
            filterNP: null,
            filterNE: null,
            dateFormat: 'D MMM YYYY',
            dateOne: '',
            dateTwo: '',
            tipoMedio: '',
            codigoMedio: '',
            file: null,
            arrayTramas: [],
            itemsTemp: null,
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                addRemoveLinks: true,
                dictDefaultMessage: "<i class='fa fa-upload'></i> UPLOAD ME"
            }
        }
    },
    components: {
        Datepicker,
        vueDropzone: vue2Dropzone
    },
    methods: {
        ...mapActions('viaCobroModifica', ['callApiGetInitialize']),
        ...mapActions('gestionTrama', ['callApiGetIncializaRecepcionTrama', 'callApiGetListaRecepcionTrama', 'callApiGetDetalleTramaRecepcion']),
        formatDates(dateOne, dateTwo) {
            this.date = this.dateTwo
            let formattedDates = ''
            let months = []
            if (dateOne) {
                formattedDates = format(dateOne, this.dateFormat)
            }
            if (dateTwo) {
                formattedDates += ' al ' + format(dateTwo, this.dateFormat)
            }
            return formattedDates
        },
        /*customFormatter(date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a')
        },*/
        loadCombo(){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            this.callApiGetIncializaRecepcionTrama(req).then((res) => {
                let infoComboBanco = []
                let infoComboOperador = []
                if(res.data.codigoRespuesta == '01'){
                    res.data.mediosPago.filter(obj => obj.tipo == 'B').forEach(function (obj) {
                        infoComboBanco.push({'value' : 'B' + obj.codigo, 'text' : obj.descripcion})
                    })
                    res.data.mediosPago.filter(obj => obj.tipo == 'O').forEach(function (obj) {
                        infoComboOperador.push({'value' : 'O' + obj.codigo, 'text' : obj.descripcion})
                    })
                }
                this.optionGroups['Entidad Bancaria'] = infoComboBanco
                this.optionGroups['Operadora'] = infoComboOperador
            })
            .catch(err => { console.log(err) })
        },
        list(){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            req.tipoMedioPago = this.selected.substring(0, 1)
            req.codigoMedioPago = this.selected.substring(1)
            req.fechaInicio = this.dateOne
            req.fechaFin = this.dateTwo
            this.callApiGetListaRecepcionTrama(req).then((res) => {
                console.log(res)
                if(res.data.codigoRespuesta == '01'){
                    this.items = res.data.procesos
                    this.itemsTemp = res.data.procesos
                }
            })
            .catch(err => { console.log(err) })
        },
        listDetalleR(codigoProceso){
            let req = {}
            req.token = this.jwt
            req.usuario = this.matricula
            req.codigoProceso = codigoProceso
            this.callApiGetDetalleTramaRecepcion(req).then((res) => {
                let array = []
                this.arrayTramas = []
                if(res.data.codigoRespuesta == '01'){
                    this.itemsR = res.data.tramas
                    res.data.tramas.forEach(function (obj) {
                        array.push(obj.trama)
                    })
                }
                console.log(array)
                this.arrayTramas = array
            })
            .catch(err => { console.log(err) })
        },
        abrirDetalle(estado, codigoProceso){
            if(estado == 'Recepcionado'){
                this.modalRecepcion(codigoProceso)
            }else if(estado == 'Recepcion con error'){
                this.modalRecepcionError()
            }
        },
        modalRecepcion(codigoProceso){
            this.listDetalleR(codigoProceso)
            this.$refs.modalRecepcion.show()
        },
        modalRecepcionError(){

        },
        descargarPlantilla(){
            link = document.createElement('a')
            link.setAttribute('href', 'http://sir-afiliaciones-2.getsandbox.com/sir-admin/api/v1/afiliaciones/recepciones/plantillas/download/rechazos.xlt')
            link.setAttribute('download', 'rechazos.xlt')
            link.click()
        },
        descargarTrama(){
            let args = {
                data : {
                    data: this.arrayTramas,
                    lineDelimiter: '\n'
                }, 
                el : 'downloadTrama',
                filename: 'trama.txt'
            }
            console.log(args)
            this.downloadTXT(args)
        },
        doCopy: function (texto) {
            this.$copyText(texto).then(function (e) {
                //alert('Copied')
                console.log(e)
            }, function (e) {
                alert('Can not copy')
                console.log(e)
            })
        },
        convertArrayOfObjectsToCSV: function (args) {
            var result, ctr, keys, columnDelimiter, lineDelimiter, data
    
            data = args.data || null;
            if (data == null || !data.length) {
                return null
            }
    
            columnDelimiter = args.columnDelimiter || ','
            lineDelimiter = args.lineDelimiter || '\n'
    
            keys = Object.keys(data[0])
    
            result = ''
            result += keys.join(columnDelimiter)
            result += lineDelimiter
    
            data.forEach(function(item) {
                ctr = 0
                keys.forEach(function(key) {
                    if (ctr > 0) result += columnDelimiter
                    result += item[key]
                    ctr++
                });
                result += lineDelimiter
            });
    
            return result
        },
        downloadCSV: function (args) {
            var data, filename, link;
    
            var csv = this.convertArrayOfObjectsToCSV({
                data: stockData
            });
            if (csv == null) return;
    
            filename = args.filename || 'export.csv';
    
            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);
    
            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
        },
        downloadTXT: function (args) {
            let filename, link
            if (args.data.data == null) return;
    
            filename = args.filename || 'export.txt'
            let txtContent = args.data.data.join(args.data.lineDelimiter);

            link = document.createElement('a');
            link.setAttribute('href', 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURI(txtContent))
            link.setAttribute('download', filename)
            link.click();
        },
        itemProcesados: function (proceso) {
            this.itemsP = this.itemsTemp.filter(obj => obj.proceso == proceso)[0].detalle[0].procesados
            this.$refs.modalProcesado.show()
        },
        itemNoProcesados: function (proceso) {
            this.itemsNP = this.itemsTemp.filter(obj => obj.proceso == proceso)[0].detalle[0].noprocesados
            this.$refs.modalNoProcesado.show()
        },
        itemNoEncontrados: function (proceso) {
            this.itemsNE = this.itemsTemp.filter(obj => obj.proceso == proceso)[0].detalle[0].noencontrados
            this.$refs.modalNoEncontrado.show()
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
