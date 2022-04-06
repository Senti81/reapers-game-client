<template>
    <v-toolbar-title>
      {{ formatDate }}
    </v-toolbar-title>
</template>

<script>

export default {
  data() {
    return {
      date: ''
    }
  },
  computed: {
    formatDate() {
      return 'Tag ' + this.$store.getters.getDay + ' - ' + this.$store.getters.getHour + ':' + this.$store.getters.getMinute
    }
  }
}
</script>

<style>

</style>