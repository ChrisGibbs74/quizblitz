<template>
  <div class="scoreboard">
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>
    <div class="grid-bg" aria-hidden="true"></div>

    <div class="content">
      <div class="game-over-label">GAME OVER</div>

      <div class="score-ring" :class="scoreRatingClass" aria-label="`Score: ${score} out of 10`">
        <svg class="ring-svg" viewBox="0 0 120 120" aria-hidden="true">
          <circle class="ring-track" cx="60" cy="60" r="52" />
          <circle
            class="ring-fill"
            cx="60" cy="60" r="52"
            :stroke-dasharray="ringCircumference"
            :stroke-dashoffset="ringOffset"
          />
        </svg>
        <div class="ring-inner">
          <span class="score-number">{{ score }}</span>
          <span class="score-denom">/10</span>
        </div>
      </div>

      <p class="score-message">{{ scoreMessage }}</p>

      <button class="restart-btn" type="button" @click="$emit('restart')">
        <span class="restart-btn__icon" aria-hidden="true">↺</span>
        <span class="restart-btn__text">Play Again</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',

  emits: ['restart'],

  props: {
    score: {
      type: Number,
      required: true,
      validator: (v) => v >= 0 && v <= 10,
    },
  },

  computed: {
    ringCircumference() {
      return +(2 * Math.PI * 52).toFixed(2); // r = 52
    },

    ringOffset() {
      const progress = this.score / 10;
      return +(this.ringCircumference * (1 - progress)).toFixed(2);
    },

    scoreRatingClass() {
      if (this.score >= 8) return 'rating-great';
      if (this.score >= 5) return 'rating-ok';
      return 'rating-low';
    },

    scoreMessage() {
      if (this.score === 10) return 'Perfect score. Legendary. 🏆';
      if (this.score >= 8)  return 'So close to perfect — blazing fast! 🔥';
      if (this.score >= 5)  return 'Solid run. You can do better. ⚡';
      if (this.score >= 3)  return 'Rough one. Hit rematch. 💪';
      return "Yikes. The questions fight back. 😅";
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ── Container ── */
.scoreboard {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0b0c1a;
  overflow: hidden;
  font-family: 'Nunito', sans-serif;
}

/* ── Grid bg (matches StartScreen) ── */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(99, 102, 241, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.07) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: gridDrift 20s linear infinite;
}

@keyframes gridDrift {
  from { transform: translateY(0); }
  to   { transform: translateY(48px); }
}

/* ── Orbs ── */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

.orb-1 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, #6366f1, transparent 70%);
  top: -80px;
  left: -60px;
  animation: float 9s ease-in-out infinite;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #f43f5e, transparent 70%);
  bottom: -60px;
  right: -40px;
  animation: float 11s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-28px) scale(1.04); }
}

/* ── Content ── */
.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
  text-align: center;
  animation: entrance 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes entrance {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── "GAME OVER" label ── */
.game-over-label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 12vw, 6rem);
  letter-spacing: 0.08em;
  color: #f8fafc;
  line-height: 1;
  text-shadow: 0 0 40px rgba(244, 63, 94, 0.4);
  animation: entrance 0.65s 0.05s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ── Score ring ── */
.score-ring {
  position: relative;
  width: 180px;
  height: 180px;
  animation: entrance 0.65s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-track {
  fill: none;
  stroke: rgba(255, 255, 255, 0.07);
  stroke-width: 8;
}

.ring-fill {
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1),
              stroke 0.4s ease;
}

/* Rating colour for the ring + number */
.rating-great .ring-fill { stroke: #22c55e; }
.rating-ok    .ring-fill { stroke: #f59e0b; }
.rating-low   .ring-fill { stroke: #f43f5e; }

.rating-great .score-number { color: #22c55e; text-shadow: 0 0 24px rgba(34,197,94,0.5); }
.rating-ok    .score-number { color: #f59e0b; text-shadow: 0 0 24px rgba(245,158,11,0.5); }
.rating-low   .score-number { color: #f43f5e; text-shadow: 0 0 24px rgba(244,63,94,0.5); }

.ring-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.score-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  line-height: 1;
  transition: color 0.4s;
}

.score-denom {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.4rem;
  color: #475569;
  align-self: flex-end;
  padding-bottom: 8px;
}

/* ── Message ── */
.score-message {
  color: #94a3b8;
  font-size: clamp(14px, 2.5vw, 17px);
  font-weight: 600;
  line-height: 1.6;
  max-width: 280px;
  animation: entrance 0.65s 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ── Play Again button ── */
.restart-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  padding: 16px 48px;
  background: transparent;
  color: #f8fafc;
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.06em;
  border: 2px solid rgba(99, 102, 241, 0.6);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s, background 0.15s;
  animation: entrance 0.65s 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.restart-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(99, 102, 241, 0.12);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.restart-btn:hover {
  border-color: #6366f1;
  box-shadow: 0 0 24px rgba(99, 102, 241, 0.35);
  transform: translateY(-2px);
}

.restart-btn:hover::before {
  transform: scaleX(1);
}

.restart-btn:active {
  transform: translateY(0) scale(0.97);
  box-shadow: none;
}

.restart-btn__icon {
  font-size: 20px;
  display: inline-block;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.restart-btn:hover .restart-btn__icon {
  transform: rotate(-180deg);
}
</style>
