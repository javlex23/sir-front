<template>
    <div>
      <TheFooter fixed>
        <div>
          Sistemas de Información
          <span class="ml-1">&copy; {{ dateTime }} </span>
        </div>
      </TheFooter>
    </div>
</template>

<script>
import moment from 'moment'
import { Footer as TheFooter } from '@coreui/vue'

export default {
  data () {
    return {
      dateTime: moment().format('YYYY')
    }
  },
  components: {
    TheFooter
  },
}
</script>
