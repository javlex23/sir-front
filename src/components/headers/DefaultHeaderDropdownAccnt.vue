<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <span class="is-white right-10"><i class="fa fa-user" />  <span class="d-md-down-none">{{ nombreCompleto }}</span></span>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Mi cuenta</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench" /> Configuración</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments" /> Comentarios
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-lock" /> Salir</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
      ...mapGetters('session', ['nombreCompleto'])
  },
}
</script>
