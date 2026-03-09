<template>
  <div class="start-screen">
    <div class="logo-wrap">
      <div class="logo-glow" />
      <h1 class="logo">QUIZ<span class="logo-accent">BLITZ</span></h1>
      <p class="tagline">10 questions. No second chances.</p>
    </div>

    <ul class="rules">
      <li v-for="(rule, i) in rules" :key="i" class="rule-item">
        <span class="rule-num">0{{ i + 1 }}</span>
        <span>{{ rule }}</span>
      </li>
    </ul>

    <button class="start-btn" @click="$emit('start')">
      <span class="btn-inner">INSERT COIN</span>
      <span class="btn-shine" />
    </button>

    <p class="credit">▲ Press to begin ▲</p>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  emits: ['start'],
  data() {
    return {
      rules: [
        'Read each question carefully.',
        'Click any answer to lock it in.',
        'Correct answers revealed instantly.',
        'Your final score shown at the end.',
      ],
    }
  },
}
</script>

<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  max-width: 520px;
  animation: fadeUp 0.6s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Logo ─────────────────────────────────────────── */
.logo-wrap {
  text-align: center;
  position: relative;
}

.logo-glow {
  position: absolute;
  inset: -40px;
  background: radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%);
  pointer-events: none;
}

.logo {
  font-family: var(--font-head);
  font-size: clamp(1.6rem, 6vw, 2.4rem);
  color: var(--accent);
  text-shadow:
    0 0 10px rgba(0,229,255,0.8),
    0 0 30px rgba(0,229,255,0.4),
    0 0 60px rgba(0,229,255,0.15);
  letter-spacing: 0.05em;
  line-height: 1;
}

.logo-accent {
  color: var(--accent2);
  text-shadow:
    0 0 10px rgba(255,60,172,0.8),
    0 0 30px rgba(255,60,172,0.4);
}

.tagline {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--muted);
  margin-top: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ── Rules ────────────────────────────────────────── */
.rules {
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.rule-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text);
  animation: fadeUp 0.6s ease both;
}

.rule-item:nth-child(1) { animation-delay: 0.1s; }
.rule-item:nth-child(2) { animation-delay: 0.2s; }
.rule-item:nth-child(3) { animation-delay: 0.3s; }
.rule-item:nth-child(4) { animation-delay: 0.4s; }

.rule-num {
  font-family: var(--font-head);
  font-size: 0.55rem;
  color: var(--accent);
  flex-shrink: 0;
}

/* ── Button ───────────────────────────────────────── */
.start-btn {
  position: relative;
  overflow: hidden;
  padding: 0;
  border: 2px solid var(--accent);
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  animation: fadeUp 0.6s 0.5s ease both;
  transition: box-shadow 0.2s ease, transform 0.1s ease;
}

.start-btn:hover {
  box-shadow: 0 0 24px rgba(0,229,255,0.45), 0 0 60px rgba(0,229,255,0.15);
  transform: translateY(-2px);
}

.start-btn:active {
  transform: translateY(0);
}

.btn-inner {
  display: block;
  padding: 0.9rem 2.5rem;
  font-family: var(--font-head);
  font-size: 0.7rem;
  color: var(--accent);
  letter-spacing: 0.12em;
  position: relative;
  z-index: 1;
}

.btn-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.start-btn:hover .btn-shine {
  transform: translateX(100%);
}

/* ── Credit ───────────────────────────────────────── */
.credit {
  font-family: var(--font-head);
  font-size: 0.45rem;
  color: var(--muted);
  letter-spacing: 0.15em;
  animation: blink 1.2s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
</style>
