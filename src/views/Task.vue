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
      const response = await this.$store.dispatch('getScores')
      if (response.data.length === 0) {
        console.log('Not started')
        return
      }
      const startTime = this.$store.state.START
      const endTime = this.$store.state.END
      const mockedTime = this.$store.getters.getMock.hour

      if (this.$store.getters.getMock) {
        console.log('using mocked time')
        this.show = mockedTime >= startTime && mockedTime < endTime
      } else {
        this.show = format(new Date(), 'H') >= startTime && format(new Date(), 'H') < endTime    
      }        
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