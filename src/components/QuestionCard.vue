<template>
  <div class="question-card">
    <div class="question-header">
      <span class="question-label">Question</span>
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
</template>

<script>
export default {
  name: 'QuestionCard',

  props: {
    question: {
      type: Object,
      required: true,
      // Shape: { question: String, answers: Array, correct: Number }
    },
  },

  emits: ['answer'],

  data() {
    return {
      answered: false,
      selectedIndex: null,
      letters: ['A', 'B', 'C', 'D'],
    }
  },

  methods: {
    handleAnswer(index) {
      if (this.answered) return

      this.answered = true
      this.selectedIndex = index

      const isCorrect = index === this.question.correct

      setTimeout(() => {
        this.$emit('answer', isCorrect)
        // Reset highlight state after emitting
        this.answered = false
        this.selectedIndex = null
      }, 1000)
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

.question-card {
  font-family: 'DM Sans', sans-serif;
  background: #0f1117;
  border: 1px solid #1e2130;
  border-radius: 20px;
  padding: 2rem 2.25rem 2.25rem;
  max-width: 640px;
  width: 100%;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 24px 64px rgba(0, 0, 0, 0.5);
}

/* ── Header ───────────────────────────────────────── */
.question-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.question-label {
  font-family: 'Syne', sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #6c6fff;
}

.question-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6c6fff;
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.3; transform: scale(0.6); }
}

/* ── Question text ────────────────────────────────── */
.question-text {
  font-family: 'Syne', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #f0f0f5;
  line-height: 1.45;
  margin: 0 0 1.75rem;
}

/* ── Answers grid ─────────────────────────────────── */
.answers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* ── Answer button base ───────────────────────────── */
.answer-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: #181b27;
  border: 1px solid #272b3a;
  border-radius: 12px;
  color: #c8cad8;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    transform 0.1s ease,
    box-shadow 0.15s ease;
}

.answer-btn:not(:disabled):hover {
  background: #1f2235;
  border-color: #6c6fff;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(108, 111, 255, 0.18);
}

.answer-btn:not(:disabled):active {
  transform: translateY(0);
}

.answer-btn:disabled {
  cursor: not-allowed;
}

/* ── Letter badge ─────────────────────────────────── */
.answer-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 7px;
  background: #272b3a;
  font-family: 'Syne', sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  color: #6c6fff;
  letter-spacing: 0;
  transition: background 0.15s ease, color 0.15s ease;
}

/* ── Correct state ────────────────────────────────── */
.answer-correct {
  background: #0d2b1f !important;
  border-color: #22c55e !important;
  color: #4ade80 !important;
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.2) !important;
  animation: pop 0.25s ease;
}

.answer-correct .answer-letter {
  background: #22c55e;
  color: #0d2b1f;
}

/* ── Wrong state ──────────────────────────────────── */
.answer-wrong {
  background: #2b0f0f !important;
  border-color: #ef4444 !important;
  color: #f87171 !important;
  box-shadow: 0 0 18px rgba(239, 68, 68, 0.2) !important;
  animation: shake 0.35s ease;
}

.answer-wrong .answer-letter {
  background: #ef4444;
  color: #2b0f0f;
}

/* ── Dimmed idle state ────────────────────────────── */
.answer-idle {
  opacity: 0.35;
}

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

/* ── Responsive ───────────────────────────────────── */
@media (max-width: 480px) {
  .answers-grid {
    grid-template-columns: 1fr;
  }

  .question-text {
    font-size: 1.1rem;
  }
}
</style>

