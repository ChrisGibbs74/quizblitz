## Q1

- A prop is a way to pass data from a parent component down to a child component.
- Data flows one way: from parent to child (top-down).
- In this project, `PlayView.vue` passes the current question from `useGameStore` down to `QuestionCard.vue` as a prop called `question`.
- We prefer props for presentational components like `QuestionCard` because it keeps the component reusable and simple — it just displays whatever data it receives without needing to know where it came from.
- If `QuestionCard` imported `useGameStore` directly, it would be tightly coupled to the store and harder to reuse or test independently.

## Q2

- `$emit` is a way for a child component to send an event up to its parent.
- In `QuestionCard.vue`, when the user clicks an answer button, it calls `$emit('answer', index)` to send the selected answer index up to the parent.
- The parent (`PlayView.vue`) listens for this event using `@answer="store.submitAnswer"`.
- If the parent forgot to handle the emitted event, nothing would happen when the user clicked an answer — the game would freeze on the same question because `submitAnswer` would never be called and the game state would never update.

## Q3

- Before Pinia, `currentIndex`, `score`, and `gameState` all lived in `App.vue`, which means App.vue "owned" all the state.
- As the component tree grows, this causes prop drilling — you have to pass data through multiple layers of components even if middle components don't need it.
- For example, to get `score` into `ScoreBoard.vue`, it would have to be passed from `App.vue` to `PlayView.vue` to `ScoreBoard.vue` as props, even if `PlayView` doesn't use it directly.
- Moving state into `useGameStore` solves this — any component can access the store directly without needing props passed through every layer.
- The store now "owns" the state, meaning it is the single source of truth for `currentIndex`, `score`, and `gameState`.

## Q4

- A traditional multi-page website loads a brand new HTML page from the server every time you navigate to a different URL, causing a full page reload.
- A Single-Page Application (SPA) loads one HTML file once and then dynamically swaps content in and out using JavaScript — no full page reloads.
- `<router-view>` is a placeholder in `App.vue` that renders whichever component matches the current URL route.
- Navigating between routes does not reload the page because Vue Router intercepts the navigation and just swaps the component inside `<router-view>` without making a new request to the server.

## Q5

- `v-if` completely adds or removes an element from the DOM based on a condition.
- `v-show` keeps the element in the DOM at all times but toggles its CSS `display` property between visible and hidden.
- In this project, `v-if` is the better choice because the screens (playing, end) are very different — there is no reason to keep `QuestionCard` in the DOM when the game is over.
- Using `v-show` would mean all screens are always rendered in the DOM, wasting memory and potentially causing bugs with timers or reactive data running in the background.
- `v-if` is better for switching between distinct screens or states that don't need to be preserved.
