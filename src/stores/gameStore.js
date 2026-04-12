import { defineStore } from 'pinia'
import { questions as allQuestions } from '../data/questions.js'

export const useGameStore = defineStore('game', {
  state: () => ({
    questions: [],
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    gameState: 'start',
    timeLeft: 15,
    _timer: null,
    playerName: '',
    scoreSubmitted: false,
  }),

  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex] ?? null,
    progress: (state) => ({
      current: state.currentIndex + 1,
      total: state.questions.length,
    }),
  },

  actions: {
    startGame() {
      this.questions = [...allQuestions]
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'playing'
      this.selectedAnswer = null
      this.timeLeft = 15
      this._startTimer()
    },

    submitAnswer(answerIndex) {
      if (this.selectedAnswer !== null) return
      this.selectedAnswer = answerIndex
      this._stopTimer()
      if (answerIndex === this.currentQuestion.correct) {
        this.score++
      }
      setTimeout(() => this._advance(), 1000)
    },

    resetGame() {
      this._stopTimer()
      this.questions = []
      this.currentIndex = 0
      this.score = 0
      this.selectedAnswer = null
      this.gameState = 'start'
      this.timeLeft = 15
      this.playerName = ''
      this.scoreSubmitted = false
    },

    _startTimer() {
      this.timeLeft = 15
      this._stopTimer()
      this._timer = setInterval(() => {
        this.timeLeft--
        if (this.timeLeft <= 0) {
          this._stopTimer()
          this._advance()
        }
      }, 1000)
    },

    _stopTimer() {
      if (this._timer) {
        clearInterval(this._timer)
        this._timer = null
      }
    },

    _advance() {
      if (this.currentIndex + 1 >= this.questions.length) {
        this.gameState = 'end'
        this.selectedAnswer = null
      } else {
        this.currentIndex++
        this.selectedAnswer = null
        this._startTimer()
      }
    },
  },
})


