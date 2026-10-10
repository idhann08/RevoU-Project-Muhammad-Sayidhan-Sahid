# Design — Life Dashboard

## Architecture Overview

The project is a single-page application (SPA) with no build step. All logic lives in one JavaScript file, all styling in one CSS file, and all markup in one HTML file.

```
RevoU-Project-Muhammad-Sayidhan-Sahid/
├── index.html          ← Single page, all sections present in DOM
├── CSS/
│   └── style.css       ← All styles: layout, components, themes
└── JS/
    └── index.js        ← All logic: clock, greeting, timer, todo, links, theme
```

State that needs to survive page reloads is stored in `localStorage`. No global state object is required — each feature manages its own storage key.

---

## HTML Structure

```html
<body>
  <header>
    <!-- Clock & Date -->
    <h1 id="clock">00:00:00</h1>
    <h2 id="date"></h2>

    <!-- Greeting & Name Input -->
    <h1 id="greeting"></h1>
    <div id="name-form">
      <label for="inputname">Your name</label>
      <input id="inputname" type="text" placeholder="Enter your name">
      <button id="submitnama">Save</button>
    </div>

    <!-- Theme Toggle -->
    <button id="theme-toggle" aria-label="Toggle dark mode">🌙</button>
  </header>

  <main>
    <!-- Pomodoro Timer -->
    <section id="pomodoro" aria-label="Pomodoro timer">
      <h2>Focus Timer</h2>
      <p id="timer-display">25:00</p>
      <div id="timer-controls">
        <button id="timer-start">Start</button>
        <button id="timer-stop">Stop</button>
        <button id="timer-reset">Reset</button>
      </div>
      <div id="timer-config">
        <label for="timer-duration">Duration (min)</label>
        <input id="timer-duration" type="number" min="1" max="120" value="25">
        <button id="timer-set">Set</button>
      </div>
    </section>

    <!-- To-Do List -->
    <section id="todo" aria-label="To-do list">
      <h2>Tasks</h2>
      <div id="todo-input-group">
        <label for="todo-input">New task</label>
        <input id="todo-input" type="text" placeholder="Add a task...">
        <button id="todo-add">Add</button>
      </div>
      <ul id="todo-list"></ul>
    </section>

    <!-- Quick Links -->
    <section id="quicklinks" aria-label="Quick links">
      <h2>Quick Links</h2>
      <div id="link-input-group">
        <label for="link-label">Label</label>
        <input id="link-label" type="text" placeholder="Label">
        <label for="link-url">URL</label>
        <input id="link-url" type="url" placeholder="https://...">
        <button id="link-add">Add</button>
      </div>
      <ul id="link-list"></ul>
    </section>
  </main>
</body>
```

---

## JavaScript Design

### Module Structure (within one file)

`JS/index.js` is organised into clearly separated sections using comments:

```
// === CLOCK & DATE ===
// === GREETING & NAME ===
// === THEME ===
// === POMODORO TIMER ===
// === TO-DO LIST ===
// === QUICK LINKS ===
// === INIT ===
```

### localStorage Keys

| Key | Type | Description |
|---|---|---|
| `dashboard_name` | `string` | User's saved name |
| `dashboard_theme` | `string` | `"light"` or `"dark"` |
| `dashboard_pomodoro_duration` | `number` | Timer duration in minutes |
| `dashboard_todos` | `JSON array` | Array of task objects |
| `dashboard_links` | `JSON array` | Array of link objects |

### Data Shapes

**Task object:**
```js
{
  id: number,        // Date.now() at creation time
  text: string,      // Task description
  completed: boolean // Completion state
}
```

**Link object:**
```js
{
  id: number,   // Date.now() at creation time
  label: string, // Display label
  url: string   // Full URL including protocol
}
```

### Clock & Date

- `updateClock()` runs on `setInterval` every 1000ms.
- Uses `toLocaleTimeString("en-US", { hour12: false })` for time.
- Uses `toLocaleDateString("en-US", { weekday, year, month, day })` for date.
- Both update their respective DOM elements each tick.

### Greeting & Name

- On page load, read `dashboard_name` from `localStorage`.
- Pre-fill `#inputname` with stored name if present.
- `greeting()` reads `#inputname` value and current hour to compose greeting text.
- `#submitnama` click event calls `greeting()` and saves name to `localStorage`.

### Theme

- On page load, read `dashboard_theme` from `localStorage` and apply the class `dark` to `<body>` if value is `"dark"`.
- Theme toggle button adds/removes the `dark` class on `<body>` and saves the new value to `localStorage`.
- All theme-specific styles are handled by `body.dark` CSS selectors.

### Pomodoro Timer

- State variables: `timerInterval` (interval ID), `timeLeft` (seconds), `isRunning` (boolean).
- `startTimer()` — guards against double-start; sets `isRunning = true`; decrements `timeLeft` every second via `setInterval`; calls `timerDone()` at 0.
- `stopTimer()` — clears interval; sets `isRunning = false`.
- `resetTimer()` — calls `stopTimer()`; restores `timeLeft` to configured duration.
- `timerDone()` — clears interval; calls `alert()` or shows an in-page notification.
- `#timer-set` click — reads `#timer-duration` value, validates (1–120), saves to `localStorage`, resets display.
- On page load, read `dashboard_pomodoro_duration` from `localStorage` (default 25).

### To-Do List

- `loadTodos()` — reads `dashboard_todos` from `localStorage`; calls `renderTodos()`.
- `saveTodos(todos)` — serialises array to `localStorage`.
- `renderTodos(todos)` — clears `#todo-list`; creates one `<li>` per task.
- Each `<li>` contains:
  - Checkbox — toggles `completed`; calls `saveTodos()` and re-renders.
  - `<span>` with task text — double-click turns into `<input>` for inline editing; blur/Enter saves.
  - Delete button — removes task from array; calls `saveTodos()` and re-renders.
- `#todo-add` click / Enter keypress on `#todo-input` — creates new task object, pushes to array, saves, re-renders.

### Quick Links

- `loadLinks()` — reads `dashboard_links` from `localStorage`; calls `renderLinks()`.
- `saveLinks(links)` — serialises array to `localStorage`.
- `renderLinks(links)` — clears `#link-list`; creates one `<li>` per link.
- Each `<li>` contains:
  - `<a>` with `target="_blank"` and `rel="noopener noreferrer"`.
  - Delete button — removes link from array; calls `saveLinks()` and re-renders.
- `#link-add` click — validates both label and URL fields are non-empty; creates link object, pushes, saves, re-renders.

---

## CSS Design

### Layout

- `<header>` — centered, stacked column layout.
- `<main>` — CSS Grid with three columns on desktop, one column on mobile (`< 768px`).
- Each `<section>` — card style with padding, border-radius, and subtle shadow.

### Theme Variables

CSS custom properties on `:root` define the light theme. `body.dark` overrides them for dark mode.

```css
:root {
  --bg: #f5f5f5;
  --surface: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #555555;
  --accent: #4f46e5;
  --border: #e0e0e0;
}

body.dark {
  --bg: #121212;
  --surface: #1e1e1e;
  --text-primary: #f0f0f0;
  --text-secondary: #aaaaaa;
  --accent: #7c71f1;
  --border: #333333;
}
```

### Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< 768px` | Single column, full width sections |
| `768px – 1199px` | Two column grid |
| `≥ 1200px` | Three column grid |

### Completed Task Style

```css
.todo-item.completed span {
  text-decoration: line-through;
  opacity: 0.5;
}
```

---

## Accessibility Notes

- All `<input>` elements have a matching `<label>` (either visible or via `aria-label`).
- `<button>` elements have descriptive text or `aria-label`.
- The theme toggle button updates its `aria-label` dynamically: `"Switch to dark mode"` / `"Switch to light mode"`.
- The timer section uses `aria-live="polite"` on `#timer-display` so screen readers announce the remaining time on each update.
- Focus order follows the visual top-to-bottom, left-to-right layout.
