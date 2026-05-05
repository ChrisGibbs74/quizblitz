cat > ~/quizblitz/src/views/LoginView.vue << 'EOF'
<template>
  <div class="auth-form">
    <h1>Log In</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Log In</button>
    <p>No account? <RouterLink to="/register">Register</RouterLink></p>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'

export default {
  name: 'LoginView',
  data() {
    return { email: '', password: '', error: '' }
  },
  setup() {
    return { store: useGameStore() }
  },
  methods: {
    async handleLogin() {
      try {
        await this.store.login(this.email, this.password)
        this.$router.push('/')
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>
EOF
