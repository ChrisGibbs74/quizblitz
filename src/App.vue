<template>
  <div id="app">
    <div class="scanlines" />

    <nav class="nav">
      <span class="nav-logo">QUIZ<span>BLITZ</span></span>
      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/leaderboard">Leaderboard</RouterLink>
        <RouterLink v-if="!store.token" to="/login">Login</RouterLink>
        <RouterLink v-if="!store.token" to="/register">Register</RouterLink>
        <span v-if="store.token" class="nav-user">{{ store.userEmail }}</span>
        <button v-if="store.token" class="nav-logout" @click="store.logout()">Logout</button>
      </div>
    </nav>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { useGameStore } from './stores/gameStore.js'

export default {
  name: 'App',
  setup() {
    return { store: useGameStore() }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Barlow:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #05070f;
  --surface:   #0d1020;
  --border:    #1c2240;
  --accent:    #00e5ff;
  --accent2:   #ff3cac;
  --correct:   #00ff99;
  --wrong:     #ff3c3c;
  --text:      #dde2f0;
  --muted:     #4a5070;
  --font-head: 'Press Start 2P', monospace;
  --font-body: 'Barlow', sans-serif;
}

html, body {
  height: 100%;
  background: var(--bg);
  color: var(--text);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,255,0.07) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(255,60,172,0.06) 0%, transparent 70%),
    var(--bg);
}

.scanlines {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px, transparent 3px,
    rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px
  );
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  background: rgba(13, 16, 32, 0.9);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-logo {
  font-family: var(--font-head);
  font-size: 0.7rem;
  color: var(--accent);
  text-shadow: 0 0 10px rgba(0,229,255,0.6);
  letter-spacing: 0.05em;
}

.nav-logo span {
  color: var(--accent2);
  text-shadow: 0 0 10px rgba(255,60,172,0.6);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  font-family: var(--font-head);
  font-size: 0.45rem;
  color: var(--muted);
  text-decoration: none;
  letter-spacing: 0.12em;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.nav-links a:hover {
  color: var(--text);
}

.nav-links a.router-link-active {
  color: var(--accent);
  border-color: var(--border);
  text-shadow: 0 0 8px rgba(0,229,255,0.4);
}

.nav-user {
  font-family: var(--font-head);
  font-size: 0.45rem;
  color: var(--accent);
}

.nav-logout {
  font-family: var(--font-head);
  font-size: 0.45rem;
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  transition: color 0.15s ease;
}

.nav-logout:hover {
  color: var(--wrong);
}

.main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
</style>
