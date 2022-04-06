<template>
  <v-container fluid>
    <ShowTask v-if="show"/>       
    <NoTask v-else/>
  </v-container>
</template>

<script>
import NoTask from '@/components/NoTask.vue'
import ShowTask from '@/components/ShowTask.vue'
import { format } from 'date-fns'

export default {
  data() {
    return {
      show: false
    }
  },
  components: {
    ShowTask,
    NoTask
  },
  methods: {
    async checkTask() {
      console.log('checkTask @', new Date().toLocaleTimeString())
      const response = await this.$store.dispatch('getScores')
      if (response.data.length === 0) {
        console.log('Not started')
        return
      }
      const currentTime = Number.parseInt(format(new Date(), 'H'))
      const startTime = this.$store.state.START
      const endTime = this.$store.state.END
      const mockedTime = this.$store.getters.getMock.hour

      if (mockedTime) {
        this.show = mockedTime >= startTime && mockedTime < endTime
      } else {
        this.show = currentTime >= startTime && currentTime < endTime    
      }      
      if (currentTime < startTime)
        setTimeout(this.checkTask, 60000)
    },
  },
  mounted() {
    console.log('Task.vue mounted')
    this.checkTask()
  }
}
</script>

<style>

</style>