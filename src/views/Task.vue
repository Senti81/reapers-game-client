<template>
  <v-container fluid>
    <ShowTask v-if="showTask"/>       
    <NoTask v-else/>
  </v-container>
</template>

<script>
import NoTask from '@/components/NoTask.vue'
import ShowTask from '@/components/ShowTask.vue'

export default {
  components: {
    ShowTask,
    NoTask
  },
  computed: {
    showTask() {
      return this.$store.getters.getHour >= this.$store.state.START && this.$store.getters.getHour <= this.$store.state.END
    }
  },
  methods: {
    async checkTask() {
      const response = await this.$store.dispatch('getScores')
      if (response.data.length === 0) {
        console.log('Not started')
        return
      }    
    }
  },
  mounted() {
    this.checkTask()
  }
}
</script>

<style>

</style>