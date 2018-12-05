<template lang="pug">
  b-navbar.is-nav
    b-navbar-brand(href="#")
      router-link.center-align(:to="'/'" target="_self" class="brand-logo")
        img.is-img-header(src="@/assets/media/images/logo_interseguro.png", alt='SIR - Sistema integrado de recaudación')
</template>

<script>
export default {
  data () {
    return { }
  }
}
</script>
