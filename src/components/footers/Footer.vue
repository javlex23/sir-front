<template lang="pug">
    footer
      b-container.bv-example-row
        b-row.row-example
          b-col.text-center(sm="12") Sistemas de Información
            span
            | &nbsp;&nbsp;|&nbsp;&nbsp;Copyright &copy
            span
            | &nbsp;{{ dateTime }}
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      dateTime: moment().format('YYYY')
    }
  }
}
</script>
