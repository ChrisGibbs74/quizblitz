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
      <div v-if="store.token">
        <p class="playing-as">Playing as {{ store.userEmail }}</p>
        <button v-if="!store.scoreSubmitted" class="submit-btn" @click="store.submitScore()">
          Submit Score
        </button>
        <p v-else class="submitted">Score submitted ✓</p>
      </div>
      <div v-else>
        <p class="login-prompt">
          <RouterLink to="/login">Log in</RouterLink> to save your score to the leaderboard.
        </p>
      </div>
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

.playing-as {
  text-align: center;
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
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
  text-align: center;
}

.login-prompt {
  text-align: center;
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 0.9rem;
}

.login-prompt a {
  color: var(--accent);
}
</style>
