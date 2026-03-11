<template>
  <div>
    <QuestionCard
      v-if="gameState === 'playing'"
      :question="questions[currentIndex]"
      :current="currentIndex + 1"
      :total="questions.length"
      :score="score"
      @answer="handleAnswer"
    />
    <ScoreBoard
      v-else-if="gameState === 'end'"
      :score="score"
      :total="questions.length"
      @restart="resetGame"
    />
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard   from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',

  components: { QuestionCard, ScoreBoard },

  data() {
    return {
      gameState:    'playing',
      currentIndex: 0,
      score:        0,
      questions: [
        { question: 'Which planet is closest to the Sun?',            answers: ['Venus', 'Earth', 'Mercury', 'Mars'],                         correct: 2 },
        { question: 'What is the chemical symbol for gold?',          answers: ['Ag', 'Au', 'Fe', 'Gd'],                                      correct: 1 },
        { question: 'How many sides does a heptagon have?',           answers: ['5', '6', '8', '7'],                                          correct: 3 },
        { question: 'Who painted the Mona Lisa?',                     answers: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Caravaggio'], correct: 2 },
        { question: 'What is the largest ocean on Earth?',            answers: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],                   correct: 3 },
        { question: 'In which year did the Berlin Wall fall?',        answers: ['1987', '1991', '1989', '1993'],                              correct: 2 },
        { question: 'What is the speed of light (approx.) in km/s?', answers: ['150,000', '300,000', '450,000', '1,000,000'],                 correct: 1 },
        { question: 'Which element has atomic number 1?',             answers: ['Helium', 'Oxygen', 'Hydrogen', 'Carbon'],                    correct: 2 },
        { question: 'What language is Django written in?',            answers: ['Ruby', 'JavaScript', 'Go', 'Python'],                        correct: 3 },
        { question: 'How many bones are in the adult human body?',    answers: ['196', '206', '216', '226'],                                  correct: 1 },
      ],
    }
  },

  mounted() {
    this.startGame()
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
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
