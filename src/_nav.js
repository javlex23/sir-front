import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      nav: []
    }
  },
  methods : {
    ...mapGetters('session', ['opciones']),
    initMenu() {
      return this.opciones    
    }
  }
}
  