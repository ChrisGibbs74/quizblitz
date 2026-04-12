# Quiz 2 Answers
Christopher Gibbs 



## Q1

Answer Choice D 
The component should emit an event to the parent requesting the change, and the parent should update its own data in response. Instead, QuestionCard should emit an event and let the parent or store handle the update.


## Q2

```js
submitAnswer(index) {
  const correct = index === this.questions[this.currentIndex].correct
  this.lastAnswerCorrect = correct
  if (correct) this.score++
  this.nextQuestion()
}
```

QuestionCard should read `lastAnswerCorrect` from the store rather than receive it
as a prop from App.vue because it avoids prop drilling through multiple layers.
The store is the single source of truth for game state, and `lastAnswerCorrect`
is game logic — it belongs there. Reading it directly from `useGameStore` keeps
App.vue clean and makes the data instantly available to any component that needs it.


## Q3

Answer Choice C 
All component instances share the same state object in memory. The arrow function ensures a fresh state object is created for each store instance. Without it, all components would mutate the same object simultaneously.


## Q4

The mistake is that App.vue is using `<GameView v-if="gameState === 'playing'" />`
instead of `<router-view />`. Vue Router renders matched route components into
`<router-view>` — without it, the router has nowhere to display the component,
so navigating to /play renders nothing. The router is working correctly but the
output placeholder is missing.

```vue
<template>
  <div>
    <h1>QuizBlitz</h1>
    <router-view />
  </div>
</template>
```
`<router-view>` acts as a dynamic placeholder that renders whichever component
matches the current URL route. When the user navigates to /play, Vue Router
swaps in GameView without reloading the page.


## Q5

Answer Choice B 
Approach B is preferable. ScoreBoard only displays data — keeping it decoupled from the store by receiving `score` and `total` as props makes it a pure presentational component that is easier to reuse and test in isolation. 


## Q6

The error occurs because after the last question, `nextQuestion()` sets
`currentIndex` to `state.questions.length`, which is one index beyond the last
valid index. `state.questions[state.questions.length]` returns `undefined`,
so accessing `.text` on it throws a TypeError.

```js
getters: {
  currentQuestion: (state) => state.questions[state.currentIndex] ?? null
}
```

The getter is the better place for this fix because it is the single point
where `currentQuestion` is accessed by all components. Fixing it here protects
every component that uses it, rather than relying on `nextQuestion()` always
being called correctly.


## Q7


Answer Choice B 
Using index as :key is acceptable here because the answers array for a givenquestion does not change while the component is mounted. Key-related bugs only arise when the list can be reordered or items deleted.


## Q8


Local file approach

- Advantage: Works offline and on GitHub Pages with no backend needed.
  `startGame()` runs instantly with no loading delay.
- Disadvantage: Questions are hardcoded — you cannot update or randomise them without changing the source code and redeploying.

Remote API approach

- Advantage: Questions can be updated, randomised, or expanded without
  touching the frontend code.
- Disadvantage: Requires a live server. If the API is down, `startGame()`
  fails and `this.questions` stays empty, breaking the game entirely.

 My choice:

For the current stage of the project I would choose the local file approach. The app is a frontend-only project deployed on GitHub Pages with no backend. Using a remote API would break `startGame()` in production since there is no server running. The local questions array is reliable, instant, and sufficient for 10 questions. A remote API would only make sense once a backend is built and the `questions` state and `startGame()` action are tested with async error handling.


## Q9

Answer Choice B
`v-show` keeps all components mounted with `display: none`. This means
`startGame()` would need to defend against being called while a game is already in progress, and game state like `currentIndex` and `score` could persist unexpectedly between screen transitions.


## Q10


```js
state: () => ({
  // existing state...
  timeLeft: 15,
  _timer: null,
}),

actions: {
  _startTimer() {
    this.timeLeft = 15
    this._stopTimer()
    this._timer = setInterval(() => {
      this.timeLeft--
      if (this.timeLeft <= 0) {
        this._stopTimer()
        this.nextQuestion()
      }
    }, 1000)
  },

  _stopTimer() {
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  },

  // Call _startTimer() at the end of startGame() and nextQuestion()
  // Call _stopTimer() at the start of submitAnswer()
}
```

**QuestionCard.vue template changes:**
```vue
<p class="timer">{{ store.timeLeft }}s</p>
```

**Why timer logic belongs in the store:**
The timer controls `nextQuestion()` and `gameState` — both of which are store
state. If the timer lived in `QuestionCard.vue`, it would need to call store
actions from inside a presentational component, mixing display logic with game
logic. Keeping it in `useGameStore` means the timer is managed in one place,
resets correctly when `nextQuestion()` is called, and stops cleanly when
`submitAnswer()` is triggered. Any component can read `timeLeft` from the
store without the timer logic leaking into the UI layer.


