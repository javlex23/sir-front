<template lang="pug">
    div#is
      // Component HEADER
      header-is
      // BODY
      router-view
      // Component FOOTER
      footer-is
</template>

<script>
import '@/assets/css/main.css'
import '@/assets/css/icons.css'
import Header from '@/components/headers/Header'
import Footer from '@/components/footers/Footer'
import icons from 'glyphicons'
export default {
  data () {
    return {}
  },
  methods: {},
  components: {
    'header-is': Header,
    'footer-is': Footer
  }
}
</script>

<style>
</style>
