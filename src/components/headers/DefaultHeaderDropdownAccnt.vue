<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <span class="is-white right-10"><i class="fa fa-user" />  <span class="d-md-down-none">{{ nombreCompleto }}</span></span>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Mi cuenta</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item @click="logout"><i class="fa fa-lock" /> Salir</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
      itemsCount: 2 
    }
  },
  methods: {
    ...mapActions('user', ['signOut']),
    logout(){
      this.signOut()
      .then((res) => {
        
      })
      .catch(err => { console.log(err) })
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters('session', ['nombreCompleto']),
  },
}
</script>
