<template>
  <div class="play-view">

    <div class="timer-bar">
      <div
        class="timer-fill"
        :style="{ width: timerPercent + '%' }"
        :class="{ urgent: store.timeLeft <= 5 }"
      ></div>
    </div>

    <p class="progress">
      Question {{ store.progress.current }} of {{ store.progress.total }}
    </p>

    <QuestionCard
      v-if="store.gameState === 'playing' && store.currentQuestion"
      :question="store.currentQuestion"
      :selectedAnswer="store.selectedAnswer"
      @answer="store.submitAnswer"
    />

    <div v-else-if="store.gameState === 'end'" class="end-wrapper">
      <ScoreBoard
        :score="store.score"
        :total="store.questions.length"
        @restart="handleRestart"
      />
      <div v-if="!store.scoreSubmitted" class="submit-score">
        <input
          v-model="store.playerName"
          placeholder="Enter your name"
          class="name-input"
        />
        <button class="submit-btn" @click="store.submitScore()">Submit Score</button>
      </div>
      <p v-else class="submitted">Score submitted! ✓</p>
    </div>

  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },

  setup() {
    const store = useGameStore()
    return { store }
  },

  computed: {
    timerPercent() {
      return (this.store.timeLeft / 15) * 100
    },
  },

  methods: {
    handleRestart() {
      this.store.resetGame()
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped>
.play-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 620px;
}

.timer-bar {
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: var(--correct);
  transition: width 0.9s linear;
}

.timer-fill.urgent {
  background: var(--wrong);
}

.progress {
  text-align: center;
  color: var(--muted);
  font-family: var(--font-body);
  margin-bottom: 1.5rem;
}

.end-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.submit-score {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.name-input {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
}

.submit-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  border: 2px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-family: var(--font-head);
  font-size: 0.6rem;
  cursor: pointer;
  letter-spacing: 0.1em;
  transition: background 0.2s ease;
}

.submit-btn:hover {
  background: rgba(0,229,255,0.08);
}

.submitted {
  color: var(--correct);
  font-family: var(--font-body);
  font-size: 0.95rem;
}
</style>
