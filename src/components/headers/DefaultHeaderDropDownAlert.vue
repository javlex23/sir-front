<template>
  <AppHeaderDropdown right no-caret >
    <template slot="header">
      <span class="is-white"><i class="fa fa-bell"></i></span>
        <b-badge pill variant="danger">5</b-badge>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Tiene {{notificaciones}} notificaciones</strong></b-dropdown-header>
      <b-dropdown-item> <span class="is-server-alert">Procesos cerrados</span>
        <b-badge variant="warning">3</b-badge>
      </b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center"><strong>Sistemas externos</strong></b-dropdown-header>
      <b-dropdown-item> <span class="is-server-alert">CRM</span>
        <b-badge variant="danger">Caído</b-badge>
      </b-dropdown-item>
      <b-dropdown-item> <span class="is-server-alert">SITC</span>
          <b-badge variant="success">En ejecución</b-badge>
      </b-dropdown-item>
      <b-dropdown-item> <span class="is-server-alert">Acsel-e</span>
          <b-badge variant="danger">Caído</b-badge>
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAlert',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
        notificaciones: 5
    }
  }
}
</script>