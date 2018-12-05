<template lang="pug">
    div.login
        form-login
</template>

<script>
import FormLogin from '@/components/FormLogin'
export default {
  data () {
      return {
          title: 'Login'
      }
  },
  mounted () {
      // Cuando el componente de inicia
  },
  methods: { },
  components: {
    FormLogin
  }
}
</script>
