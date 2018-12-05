<template lang="pug">
      div.is-sidebar
        AppSidebar(fixed).is-sidebar
          SidebarHeader
          SidebarForm
          SidebarNav(:navItems="this.opciones")
          SidebarFooter
          SidebarMinimizer.help-align
        main.main
          Breadcrumb(:list = "this.list")
          div.container-fluid
            div
              router-view
        AppAside(fixed)
          DefaultAside
        div 
          input(type = "hidden" :value = "this.correo") 
</template>

<script>
import '@/assets/css/coreui.css'
import '@/assets/css/main.css'
//import nav from '@/_nav'
import {Sidebar, SidebarHeader, SidebarForm, SidebarNav, SidebarFooter, SidebarMinimizer, Breadcrumb, Aside as AppAside} from '@coreui/vue'
import DefaultAside from './DefaultAside'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      nav: this.opciones //nav.items
    }
  },
  components: {
    'AppSidebar' : Sidebar,
    'SidebarHeader' : SidebarHeader,
    'SidebarForm' : SidebarForm,
    'SidebarNav' : SidebarNav,
    'SidebarFooter' : SidebarFooter,
    'SidebarMinimizer' : SidebarMinimizer,
    'Breadcrumb' : Breadcrumb,
    'AppAside' : AppAside,
    'DefaultAside' : DefaultAside
  },
  methods : {
    signalChange : function(evt) {
        alert('Cambio')
    }
  },
  computed: {
    ...mapState('session', ['opciones', 'correo']),
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  },
  befaforeMount() {
    //console.log(this.opciones)
  },
  mounted() {
    console.log(this.opciones)
    this.nav = this.opciones
  }/*,
  create() {
    console.log(this.opciones)
    this.nav = this.opciones
  }*/
}
</script>

<style>
</style>
