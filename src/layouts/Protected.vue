<template lang="pug">
    div#is.app
      // Component HEADER
      header-app
      // BODY
      div#is-body
        sidebar-is
      // Component FOOTER
      footer-is
</template>

<script>
import '@/assets/css/coreui.css'
import '@/assets/css/main.css'
import '@/assets/css/icons.css'
import HeaderApp from '@/components/headers/HeaderApp'
import FooterApp from '@/components/footers/FooterApp'
import SidebarIS from '@/components/sidebar/SidebarIS'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {
    'header-app': HeaderApp,
    'footer-is': FooterApp,
    'sidebar-is' : SidebarIS
  },
  methods: { 
      ...mapActions('session', ['init', 'menu']),
      initialize () {
        this.loading = true
        let object = []
        this.init(this.jwt).then((res) => {
            console.log(res)
        })
        .catch(err => { console.log(err) })
      }
  },
  computed: {
      ...mapGetters('user', ['jwt'])
  },
  beforeMount(){
    this.initialize()
  },
  mounted () {   
  }
}
</script>

<style>
</style>
