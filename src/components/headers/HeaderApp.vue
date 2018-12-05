<template>
  <div>
    <AppHeader fixed class="is-nav">
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="@/assets/media/images/logo_interseguro.png" width="145" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="@/assets/media/images/is.png" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard"><span class="is-white">Dashboard</span></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <DefaultHeaderDropdownAlert class="d-md-down-none"/>
        <DefaultHeaderDropdownModule class="d-md-down-none"/>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!--<AsideToggler class="d-none d-lg-block" />-->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Header as AppHeader, SidebarToggler, AsideToggler } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import DefaultHeaderDropdownModule from './DefaultHeaderDropdownModule'
import DefaultHeaderDropdownAlert from './DefaultHeaderDropdownAlert'
export default {
  data () {
    return { }
  },
  computed: {
      ...mapGetters('session', ['nombreCompleto', 'opciones'])
  },
  components: {
    AsideToggler,
    AppHeader,
    SidebarToggler,
    DefaultHeaderDropdownAccnt,
    DefaultHeaderDropdownModule,
    DefaultHeaderDropdownAlert
  },
}
</script>
