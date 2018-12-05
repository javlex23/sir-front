<template lang="pug">
  div(class="app flex-row align-items-center")
    b-container
      b-row.justify-content-center
        b-col(md="5")
          b-card-group
            b-card(class="p-4" no-body)#formLogin
              b-card-body
                div
                  div.is-title 
                    h2.text-center Sistema Integral de Recaudación
                  b-form(@submit='onSubmit' v-if='show')
                    p.text-muted.text-center Acceso al Sistema
                    b-form-group#exampleInputGroup2(label='Usuario' label-for='exampleInput2')
                      b-input-group.mb-3
                        b-input-group-prepend
                          b-input-group-text
                            i(class="fa fa-user")
                        b-form-input#exampleInput2(type='text' v-model='form.usuario' required='' placeholder='usuario@interseguro.com.pe')
                    b-form-group#exampleInputGroup1(label='Contraseña:' label-for='exampleInput1')
                      b-input-group.mb-3
                        b-input-group-prepend
                          b-input-group-text
                            i(class="fa fa-lock")
                        b-form-input#exampleInput1(type='password' v-model='form.clave' required='' placeholder='********')
                    b-row
                      b-col(cols="12")
                        b-button(type='submit' variant='primary' class='px-4') Iniciar sesión
                  pulse-loader(:loading="loading")
                  span.loginError {{mensajeError}}
</template>

<script>
import { mapActions } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  data () {
    return {
      loading: false,
      form: {
        usuario: '',
        clave: ''
      },
      show: true,
      mensajeError: ''
    }
  },
  methods: {
    ...mapActions('user', ['signIn']),
    onSubmit (evt) {
      evt.preventDefault()
      this.loading = true
      this.signIn(this.form)
        .then((res) => {
            this.loading = false
            console.log(res)
            if(res.data.codigoRespuesta == '01'){
              this.$router.push('/admin/actions')
            } else {
              this.mensajeError = res.data.mensajeRespuesta
            }
        })
        .catch(err => { console.log(err) })
    },
    functionChange () {
      alert('Cambia')
    }
  },
  components: {
    PulseLoader
  }
}
</script>
