<template>
  <div class="qcard-wrap">

    <!-- HUD bar -->
    <div class="hud">
      <div class="hud-score">
        <span class="hud-label">SCORE</span>
        <span class="hud-val">{{ score }}</span>
      </div>
      <div class="hud-progress">
        <span class="hud-label">Q {{ current }} / {{ total }}</span>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPct + '%' }" />
        </div>
      </div>
    </div>

    <!-- Card -->
    <div class="question-card">
      <div class="question-header">
        <span class="question-label">Question {{ current }}</span>
        <div class="question-pulse" />
      </div>

      <p class="question-text">{{ question.question }}</p>

      <div class="answers-grid">
        <button
          v-for="(answer, index) in question.answers"
          :key="index"
          class="answer-btn"
          :class="{
            'answer-correct': answered && index === question.correct,
            'answer-wrong':   answered && index === selectedIndex && index !== question.correct,
            'answer-idle':    answered && index !== question.correct && index !== selectedIndex,
          }"
          :disabled="answered"
          @click="handleAnswer(index)"
        >
          <span class="answer-letter">{{ letters[index] }}</span>
          <span class="answer-text">{{ answer }}</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'QuestionCard',

  props: {
    question: { type: Object,  required: true },
    current:  { type: Number,  default: 1 },
    total:    { type: Number,  default: 10 },
    score:    { type: Number,  default: 0 },
  },

  emits: ['answer'],

  data() {
    return {
      answered:      false,
      selectedIndex: null,
      letters:       ['A', 'B', 'C', 'D'],
    }
  },

  computed: {
    progressPct() {
      return ((this.current - 1) / this.total) * 100
    },
  },

  methods: {
    handleAnswer(index) {
      if (this.answered) return
      this.answered      = true
      this.selectedIndex = index
      const isCorrect    = index === this.question.correct

      setTimeout(() => {
        this.$emit('answer', isCorrect)
        this.answered      = false
        this.selectedIndex = null
      }, 1000)
    },
  },
}
</script>

<style scoped>
.qcard-wrap {
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeUp 0.4s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── HUD ──────────────────────────────────────────── */
.hud {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.25rem;
}

.hud-score {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.hud-label {
  font-family: var(--font-head);
  font-size: 0.45rem;
  color: var(--muted);
  letter-spacing: 0.12em;
}

.hud-val {
  font-family: var(--font-head);
  font-size: 0.85rem;
  color: var(--accent);
  text-shadow: 0 0 10px rgba(0,229,255,0.5);
}

.hud-progress {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
}

.progress-track {
  width: 100%;
  height: 3px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  border-radius: 99px;
  transition: width 0.4s ease;
  box-shadow: 0 0 8px rgba(0,229,255,0.6);
}

/* ── Card ─────────────────────────────────────────── */
.question-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem 2.25rem 2.25rem;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03),
    0 24px 64px rgba(0,0,0,0.5);
}

/* ── Header ───────────────────────────────────────── */
.question-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.question-label {
  font-family: var(--font-head);
  font-size: 0.5rem;
  letter-spacing: 0.15em;
  color: var(--accent);
}

.question-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.3; transform: scale(0.6); }
}

/* ── Question text ────────────────────────────────── */
.question-text {
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 600;
  color: #f0f0f5;
  line-height: 1.5;
  margin: 0 0 1.75rem;
}

/* ── Answers ──────────────────────────────────────── */
.answers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.answer-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: #0d1020;
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.1s, box-shadow 0.15s;
}

.answer-btn:not(:disabled):hover {
  background: #141828;
  border-color: var(--accent);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0,229,255,0.15);
}

.answer-btn:not(:disabled):active { transform: translateY(0); }
.answer-btn:disabled { cursor: not-allowed; }

.answer-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 7px;
  background: var(--border);
  font-family: var(--font-head);
  font-size: 0.5rem;
  color: var(--accent);
  transition: background 0.15s, color 0.15s;
}

/* ── Correct ──────────────────────────────────────── */
.answer-correct {
  background: #021f0f !important;
  border-color: var(--correct) !important;
  color: var(--correct) !important;
  box-shadow: 0 0 20px rgba(0,255,153,0.2) !important;
  animation: pop 0.25s ease;
}
.answer-correct .answer-letter { background: var(--correct); color: #021f0f; }

/* ── Wrong ────────────────────────────────────────── */
.answer-wrong {
  background: #1f0202 !important;
  border-color: var(--wrong) !important;
  color: var(--wrong) !important;
  box-shadow: 0 0 20px rgba(255,60,60,0.2) !important;
  animation: shake 0.35s ease;
}
.answer-wrong .answer-letter { background: var(--wrong); color: #1f0202; }

/* ── Idle ─────────────────────────────────────────── */
.answer-idle { opacity: 0.3; }

/* ── Animations ───────────────────────────────────── */
@keyframes pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.04); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-5px); }
  40%       { transform: translateX(5px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}

@media (max-width: 480px) {
  .answers-grid { grid-template-columns: 1fr; }
  .question-text { font-size: 1rem; }
  .question-card { padding: 1.5rem; }
}
</style>



