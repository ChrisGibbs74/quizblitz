<template>
  <div id="app">
    <div class="scanlines" />
    <StartScreen  v-if="gameState === 'start'"   @start="startGame" />
    <QuestionCard
      v-else-if="gameState === 'playing'"
      :question="questions[currentIndex]"
      :current="currentIndex + 1"
      :total="questions.length"
      :score="score"
      @answer="handleAnswer"
    />
    <ScoreBoard
      v-else
      :score="score"
      :total="questions.length"
      @restart="resetGame"
    />
  </div>
</template>

<script>
import StartScreen  from './components/StartScreen.vue'
import QuestionCard from './components/QuestionCard.vue'
import ScoreBoard   from './components/ScoreBoard.vue'

export default {
  name: 'App',
  components: { StartScreen, QuestionCard, ScoreBoard },

  data() {
    return {
      gameState: 'start', // 'start' | 'playing' | 'end'
      currentIndex: 0,
      score: 0,
      questions: [
        {
          question: 'Which planet is closest to the Sun?',
          answers: ['Venus', 'Earth', 'Mercury', 'Mars'],
          correct: 2,
        },
        {
          question: 'What is the chemical symbol for gold?',
          answers: ['Ag', 'Au', 'Fe', 'Gd'],
          correct: 1,
        },
        {
          question: 'How many sides does a heptagon have?',
          answers: ['5', '6', '8', '7'],
          correct: 3,
        },
        {
          question: 'Who painted the Mona Lisa?',
          answers: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Caravaggio'],
          correct: 2,
        },
        {
          question: 'What is the largest ocean on Earth?',
          answers: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
          correct: 3,
        },
        {
          question: 'In which year did the Berlin Wall fall?',
          answers: ['1987', '1991', '1989', '1993'],
          correct: 2,
        },
        {
          question: 'What is the speed of light (approx.) in km/s?',
          answers: ['150,000', '300,000', '450,000', '1,000,000'],
          correct: 1,
        },
        {
          question: 'Which element has atomic number 1?',
          answers: ['Helium', 'Oxygen', 'Hydrogen', 'Carbon'],
          correct: 2,
        },
        {
          question: 'What language is the Django web framework written in?',
          answers: ['Ruby', 'JavaScript', 'Go', 'Python'],
          correct: 3,
        },
        {
          question: 'How many bones are in the adult human body?',
          answers: ['196', '206', '216', '226'],
          correct: 1,
        },
      ],
    }
  },

  methods: {
    startGame() {
      this.currentIndex = 0
      this.score        = 0
      this.gameState    = 'playing'
    },

    handleAnswer(isCorrect) {
      if (isCorrect) this.score++
      this.currentIndex++
      if (this.currentIndex === this.questions.length) {
        this.gameState = 'end'
      }
    },

    resetGame() {
      this.gameState = 'start'
    },
  },
}
</script>

<style>
/* ── Global reset & tokens ─────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Barlow:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #05070f;
  --surface:   #0d1020;
  --border:    #1c2240;
  --accent:    #00e5ff;
  --accent2:   #ff3cac;
  --correct:   #00ff99;
  --wrong:     #ff3c3c;
  --text:      #dde2f0;
  --muted:     #4a5070;
  --font-head: 'Press Start 2P', monospace;
  --font-body: 'Barlow', sans-serif;
}

html, body {
  height: 100%;
  background: var(--bg);
  color: var(--text);
}

#app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,255,0.07) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(255,60,172,0.06) 0%, transparent 70%),
    var(--bg);
}

/* CRT scanline overlay */
.scanlines {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0,0,0,0.08) 3px,
    rgba(0,0,0,0.08) 4px
  );
}
</style>





