<template>
  <StartScreen @start="goToPlay" />
</template>

<script>
import StartScreen from '../components/StartScreen.vue'

export default {
  name: 'HomeView',
  components: { StartScreen },
  methods: {
    goToPlay() {
      sessionStorage.setItem('gameStarted', 'true')
      this.$router.push({ name: 'play' })
    },
  },
}
</script>

