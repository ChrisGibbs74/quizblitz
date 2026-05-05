cat > ~/quizblitz/src/views/RegisterView.vue << 'EOF'
<template>
  <div class="auth-form">
    <h1>Register</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleRegister">Create Account</button>
    <p>Already have an account? <RouterLink to="/login">Log in</RouterLink></p>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'

export default {
  name: 'RegisterView',
  data() {
    return { email: '', password: '', error: '' }
  },
  setup() {
    return { store: useGameStore() }
  },
  methods: {
    async handleRegister() {
      try {
        await this.store.register(this.email, this.password)
        this.$router.push('/login')
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>
EOF
