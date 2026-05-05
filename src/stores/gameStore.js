import { defineStore } from 'pinia'

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
    token: localStorage.getItem('quizblitz_token') || null,
    userEmail: localStorage.getItem('quizblitz_email') || null,
  }),

  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex] ?? null,
    progress: (state) => ({
      current: state.currentIndex + 1,
      total: state.questions.length,
    }),
  },

  actions: {
    async startGame() {
      const response = await fetch('http://localhost:3000/api/questions/random')
      const questions = await response.json()
      this.questions = questions
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'playing'
      this.selectedAnswer = null
      this.timeLeft = 15
      this._startTimer()
    },

    async register(email, password) {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data
    },

    async login(email, password) {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      this.token = data.token
      this.userEmail = data.email
      localStorage.setItem('quizblitz_token', data.token)
      localStorage.setItem('quizblitz_email', data.email)
      return data
    },

    logout() {
      this.token = null
      this.userEmail = null
      localStorage.removeItem('quizblitz_token')
      localStorage.removeItem('quizblitz_email')
    },

    async submitScore() {
      const response = await fetch('http://localhost:3000/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          score: this.score,
          totalQuestions: this.questions.length
        })
      })
      if (response.ok) {
        this.scoreSubmitted = true
      }
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
