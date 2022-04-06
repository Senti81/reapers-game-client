<template>
  <v-container>
    <v-card
      class="mx-auto pa-3"
      max-width="540"
      elevation="12"
      outlined
      >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-overline mb-1">
            Dashboard
          </v-list-item-title>
          <v-list-item-subtitle>Übersicht</v-list-item-subtitle>
        </v-list-item-content>
        <v-icon large color="blue darken-5">mdi-view-dashboard</v-icon>
      </v-list-item>      
      <div v-if="scores.length === 0" class="ma-4 text-center">
        <span class="text-body-1">
          Es liegen noch keine Ergebnisse vor
        </span>
      </div>
      <v-simple-table v-else>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Pos</th>
              <th class="text-left">Name</th>
              <th class="text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(score, index) in scores"
              :key="index"
            >               
              <td class="text-left">{{ index + 1  }}</td>
              <td class="text-left">{{ score.displayName }}</td>
              <td class="text-right">
                <v-icon v-if="index + 1 === scores.length" color="purple darken-1">mdi-skull</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      scores: []
    }
  },
  methods: {
    async showResults() {
      const response = await this.$store.dispatch('getScores')
      this.scores = response.data
    },
  },
  mounted() {
    this.showResults()
  }
}
</script>

<style>

</style>