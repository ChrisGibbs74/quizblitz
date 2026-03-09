<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #080a10;">
    <div style="width: 100%; max-width: 640px; padding: 1rem;">
      <p style="color: #6c6fff; font-family: monospace; margin-bottom: 1rem;">
        Last answer: <strong>{{ lastAnswer }}</strong>
      </p>
      <QuestionCard :question="testQuestion" @answer="onAnswer" />
    </div>
  </div>
</template>

<script>
import QuestionCard from './components/QuestionCard.vue'

export default {
  components: { QuestionCard },
  data() {
    return {
      lastAnswer: '—',
      testQuestion: {
        question: 'Which planet is closest to the Sun?',
        answers: ['Venus', 'Earth', 'Mercury', 'Mars'],
        correct: 2   // Mercury (zero-indexed)
      }
    }
  },
  methods: {
    onAnswer(isCorrect) {
      this.lastAnswer = isCorrect ? '✅ Correct!' : '❌ Wrong'
    }
  }
}
</script>




