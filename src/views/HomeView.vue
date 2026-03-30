<template>
  <StartScreen @start="startGame" />
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import StartScreen from '../components/StartScreen.vue'

export default {
  name: 'HomeView',
  components: { StartScreen },

  setup() {
    return { store: useGameStore() }
  },

  methods: {
    startGame() {
      this.store.startGame()
      this.$router.push({ name: 'play' })
    },
  },
}
</script>


