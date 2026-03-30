<template>
  <div class="question-card">
    <p class="question-text">{{ question.question }}</p>
    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :class="buttonClass(index)"
        :disabled="selectedAnswer !== null"
        @click="selectAnswer(index)"
      >
        {{ answer }}
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
    },
    selectedAnswer: {
      type: Number,
      default: null,
    },
  },
  emits: ['answer'],
  methods: {
    selectAnswer(index) {
      if (this.selectedAnswer !== null) return
      this.$emit('answer', index)
    },
    buttonClass(index) {
      if (this.selectedAnswer === null) return ''
      if (index === this.question.correct) return 'correct'
      if (index === this.selectedAnswer) return 'wrong'
      return ''
    },
  },
}
</script>

<style scoped>
.question-card {
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: fadeUp 0.4s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.question-text {
  font-family: var(--font-head);
  font-size: clamp(0.7rem, 2.5vw, 1rem);
  color: var(--text);
  line-height: 1.8;
  text-align: center;
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
}

.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

button {
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
  text-align: center;
}

button:hover:not(:disabled) {
  border-color: var(--accent);
  box-shadow: 0 0 16px rgba(0, 229, 255, 0.2);
  transform: translateY(-2px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

button.correct {
  background: rgba(0, 255, 153, 0.1);
  border-color: var(--correct);
  color: var(--correct);
  box-shadow: 0 0 20px rgba(0, 255, 153, 0.25);
}

button.wrong {
  background: rgba(255, 60, 60, 0.1);
  border-color: var(--wrong);
  color: var(--wrong);
  box-shadow: 0 0 20px rgba(255, 60, 60, 0.25);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.85;
}
</style>






