<template>
  <div class="scoreboard">

    <div class="result-badge" :class="tierClass">
      <span class="badge-icon">{{ tier.icon }}</span>
    </div>

    <div class="result-text">
      <h2 class="tier-label">{{ tier.label }}</h2>
      <p class="tier-sub">{{ tier.sub }}</p>
    </div>

    <div class="score-display">
      <span class="score-num">{{ score }}</span>
      <span class="score-denom">/ {{ total }}</span>
    </div>

    <div class="stat-row">
      <div class="stat">
        <span class="stat-val correct-col">{{ score }}</span>
        <span class="stat-label">Correct</span>
      </div>
      <div class="stat-divider" />
      <div class="stat">
        <span class="stat-val wrong-col">{{ total - score }}</span>
        <span class="stat-label">Wrong</span>
      </div>
      <div class="stat-divider" />
      <div class="stat">
        <span class="stat-val accent-col">{{ pct }}%</span>
        <span class="stat-label">Accuracy</span>
      </div>
    </div>

    <button class="restart-btn" @click="$emit('restart')">
      <span>PLAY AGAIN</span>
    </button>

  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  emits: ['restart'],

  props: {
    score: { type: Number, required: true },
    total: { type: Number, required: true },
  },

  computed: {
    pct() {
      return Math.round((this.score / this.total) * 100)
    },
    tier() {
      if (this.pct === 100) return { icon: '🏆', label: 'PERFECT',    sub: 'Absolutely flawless.',         cls: 'gold'   }
      if (this.pct >= 80)  return { icon: '⚡', label: 'EXCELLENT',  sub: 'Sharp mind, sharp answers.',    cls: 'cyan'   }
      if (this.pct >= 60)  return { icon: '🎯', label: 'SOLID',      sub: 'More than you think.',          cls: 'blue'   }
      if (this.pct >= 40)  return { icon: '🔄', label: 'AVERAGE',    sub: 'Room to grow. Try again.',      cls: 'yellow' }
      return                      { icon: '💀', label: 'GAME OVER',  sub: 'Back to the books.',            cls: 'red'    }
    },
    tierClass() {
      return `badge-${this.tier.cls}`
    },
  },
}
</script>

<style scoped>
.scoreboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  width: 100%;
  max-width: 420px;
  animation: fadeUp 0.5s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Badge ────────────────────────────────────────── */
.result-badge {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  border: 2px solid;
  animation: badgePop 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1) both;
}

@keyframes badgePop {
  from { opacity: 0; transform: scale(0.4); }
  to   { opacity: 1; transform: scale(1); }
}

.badge-gold   { border-color: #ffd700; background: rgba(255,215,0,0.08);   box-shadow: 0 0 30px rgba(255,215,0,0.25);   }
.badge-cyan   { border-color: var(--accent);  background: rgba(0,229,255,0.08);  box-shadow: 0 0 30px rgba(0,229,255,0.25);  }
.badge-blue   { border-color: #5b8fff; background: rgba(91,143,255,0.08);  box-shadow: 0 0 30px rgba(91,143,255,0.25);  }
.badge-yellow { border-color: #ffc107; background: rgba(255,193,7,0.08);   box-shadow: 0 0 30px rgba(255,193,7,0.25);   }
.badge-red    { border-color: var(--wrong);   background: rgba(255,60,60,0.08);  box-shadow: 0 0 30px rgba(255,60,60,0.25);  }

/* ── Labels ───────────────────────────────────────── */
.result-text { text-align: center; }

.tier-label {
  font-family: var(--font-head);
  font-size: clamp(1rem, 4vw, 1.4rem);
  color: var(--accent);
  text-shadow: 0 0 12px rgba(0,229,255,0.5);
  letter-spacing: 0.1em;
  margin-bottom: 0.4rem;
}

.tier-sub {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--muted);
}

/* ── Big score ────────────────────────────────────── */
.score-display {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.score-num {
  font-family: var(--font-head);
  font-size: clamp(3rem, 14vw, 5rem);
  color: #fff;
  line-height: 1;
  text-shadow: 0 0 20px rgba(255,255,255,0.2);
}

.score-denom {
  font-family: var(--font-head);
  font-size: 1rem;
  color: var(--muted);
}

/* ── Stat row ─────────────────────────────────────── */
.stat-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1rem 2rem;
  width: 100%;
  justify-content: center;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-val {
  font-family: var(--font-head);
  font-size: 1rem;
}

.stat-label {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.correct-col { color: var(--correct); text-shadow: 0 0 8px rgba(0,255,153,0.4); }
.wrong-col   { color: var(--wrong);   text-shadow: 0 0 8px rgba(255,60,60,0.4); }
.accent-col  { color: var(--accent);  text-shadow: 0 0 8px rgba(0,229,255,0.4); }

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--border);
}

/* ── Restart button ───────────────────────────────── */
.restart-btn {
  padding: 0.9rem 2.5rem;
  border: 2px solid var(--accent2);
  border-radius: 10px;
  background: transparent;
  color: var(--accent2);
  font-family: var(--font-head);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.1s ease, background 0.2s ease;
}

.restart-btn:hover {
  background: rgba(255,60,172,0.08);
  box-shadow: 0 0 24px rgba(255,60,172,0.35), 0 0 60px rgba(255,60,172,0.1);
  transform: translateY(-2px);
}

.restart-btn:active { transform: translateY(0); }
</style>

