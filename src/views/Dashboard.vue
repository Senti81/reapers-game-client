<template>
  <v-container>
    <v-card
      v-if="!this.$store.getters.isStarted"
      class="mx-auto pa-3"
      max-width="540"
      elevation="12"
      outlined
      >
      <v-card-title class="text-md-h4">Erklär-Text</v-card-title>
      <v-card-subtitle class="mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, totam repellendus! Voluptates, necessitatibus voluptas. Accusamus, ullam molestiae! Illo quas optio beatae facilis amet inventore minima libero autem repellat minus debitis quasi rem tenetur ab dolore, reprehenderit molestiae totam similique. Dolorum reprehenderit vel labore aut corporis repudiandae aspernatur iste sapiente impedit.</v-card-subtitle>
    </v-card>
    <div v-else>
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
        
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-right">
                  Punkte
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(score, index) in scores"
                :key="index"
              >               
                <td>                  
                  {{ score.displayName }}
                </td>
                <td class="text-right">{{ score.points }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

      </v-card>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      scores: []
    }
  },
  methods: {
    async showResults() {
      const result = await axios.get(process.env.VUE_APP_BASEURL + '/scores/')
      this.scores = result.data
    },
  },
  mounted() {
    this.showResults()
  }
}
</script>

<style>

</style>