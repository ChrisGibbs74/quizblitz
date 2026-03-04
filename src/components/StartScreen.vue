<template>
  <div class="start-screen">
    <!-- Animated background grid -->
    <div class="grid-bg" aria-hidden="true"></div>

    <!-- Floating decorative orbs -->
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>

    <div class="content">
      <div class="badge">⚡ Ready to play?</div>

      <h1 class="title">
        <span class="title-quiz">Quiz</span><span class="title-blitz">Blitz</span>
      </h1>

      <p class="tagline">10 questions. 30 seconds each.<br>How fast can you think?</p>

      <button class="play-btn" @click="$emit('start')" type="button">
        <span class="play-btn__text">Play</span>
        <span class="play-btn__icon" aria-hidden="true">▶</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',

  emits: ['start'],
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700&display=swap');

/* ── Reset & base ── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ── Container ── */
.start-screen {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0b0c1a;
  overflow: hidden;
  font-family: 'Nunito', sans-serif;
}

/* ── Animated grid background ── */
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
  opacity: 0.35;
  pointer-events: none;
}

.orb-1 {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, #6366f1, transparent 70%);
  top: -100px;
  right: -80px;
  animation: float 8s ease-in-out infinite;
}

.orb-2 {
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, #f43f5e, transparent 70%);
  bottom: -80px;
  left: -60px;
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-30px) scale(1.05); }
}

/* ── Content card ── */
.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  padding: 24px;
  animation: entrance 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes entrance {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Badge ── */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.4);
  color: #a5b4fc;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 6px 16px;
  border-radius: 999px;
  animation: entrance 0.7s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ── Title ── */
.title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 18vw, 10rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  animation: entrance 0.7s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.title-quiz {
  color: #f8fafc;
}

.title-blitz {
  color: #f43f5e;
  text-shadow:
    0 0 30px rgba(244, 63, 94, 0.6),
    0 0 60px rgba(244, 63, 94, 0.3);
}

/* ── Tagline ── */
.tagline {
  color: #94a3b8;
  font-size: clamp(14px, 2.5vw, 17px);
  font-weight: 600;
  line-height: 1.7;
  animation: entrance 0.7s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ── Play button ── */
.play-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 18px 52px;
  background: #f43f5e;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.06em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 8px 32px rgba(244, 63, 94, 0.45);
  animation: entrance 0.7s 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.play-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.play-btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 14px 40px rgba(244, 63, 94, 0.55);
}

.play-btn:hover::before {
  transform: translateX(100%);
}

.play-btn:active {
  transform: translateY(0) scale(0.97);
  box-shadow: 0 4px 16px rgba(244, 63, 94, 0.35);
}

.play-btn__icon {
  font-size: 14px;
  transition: transform 0.2s;
}

.play-btn:hover .play-btn__icon {
  transform: translateX(4px);
}
</style>