# Tasks — Life Dashboard

## Implementation Order

Tasks are ordered so each builds on the previous. Complete them in sequence.

---

## Task 1 — Restructure HTML

**Goal:** Update `index.html` to include all sections defined in `design.md`, without breaking the existing clock, date, greeting, and name input elements.

**Checklist:**
- [ ] Add `<label for="inputname">` to the existing name input
- [ ] Change the existing `<input id="submitnama" type="submit">` to a `<button id="submitnama">`
- [ ] Add `<button id="theme-toggle" aria-label="Switch to dark mode">` in `<header>`
- [ ] Add `<main>` element after `</header>`
- [ ] Add Pomodoro `<section id="pomodoro">` inside `<main>` with:
  - `<p id="timer-display">25:00</p>`
  - Start, Stop, Reset buttons (`#timer-start`, `#timer-stop`, `#timer-reset`)
  - Duration input `#timer-duration` (type number, min 1, max 120, value 25)
  - Set button `#timer-set`
- [ ] Add To-Do `<section id="todo">` inside `<main>` with:
  - Text input `#todo-input` with label
  - Add button `#todo-add`
  - Empty `<ul id="todo-list">`
- [ ] Add Quick Links `<section id="quicklinks">` inside `<main>` with:
  - Label input `#link-label` with label
  - URL input `#link-url` (type url) with label
  - Add button `#link-add`
  - Empty `<ul id="link-list">`
- [ ] Verify all existing IDs (`#clock`, `#date`, `#greeting`, `#inputname`, `#submitnama`) are unchanged

---

## Task 2 — Base CSS (Layout & Typography)

**Goal:** Build the foundational stylesheet in `CSS/style.css` — reset, typography, header layout, and main grid.

**Checklist:**
- [ ] Add CSS reset (`box-sizing: border-box`, `margin: 0`, `padding: 0`)
- [ ] Define `:root` CSS custom properties for light theme (`--bg`, `--surface`, `--text-primary`, `--text-secondary`, `--accent`, `--border`)
- [ ] Define `body.dark` overrides for all custom properties
- [ ] Style `body`: background `var(--bg)`, color `var(--text-primary)`, font-family, transition for theme switch
- [ ] Style `<header>`: centered, flex column, padding
- [ ] Style `<main>`: CSS Grid, 3 columns on desktop, gap between sections
- [ ] Style each `<section>`: card appearance (background `var(--surface)`, border-radius, padding, box-shadow)
- [ ] Add responsive breakpoint `@media (max-width: 767px)` → single column
- [ ] Add responsive breakpoint `@media (768px–1199px)` → two columns

---

## Task 3 — Theme Toggle

**Goal:** Implement light/dark mode switching with `localStorage` persistence.

**Checklist:**
- [ ] On page load, read `dashboard_theme` from `localStorage`
- [ ] If value is `"dark"`, add class `dark` to `<body>` before first render
- [ ] Update `#theme-toggle` icon/label to reflect current theme on load
- [ ] Add click event on `#theme-toggle` that:
  - Toggles `dark` class on `<body>`
  - Saves new theme value to `localStorage`
  - Updates button `aria-label` and icon

---

## Task 4 — Persist Name in localStorage

**Goal:** Extend the existing name/greeting feature to remember the name across reloads.

**Checklist:**
- [ ] On page load, read `dashboard_name` from `localStorage`
- [ ] If a name is stored, pre-fill `#inputname` with it
- [ ] Call `greeting()` on page load so the greeting reflects the stored name immediately
- [ ] In the `#submitnama` click handler, after updating the greeting, save the name to `localStorage` under key `dashboard_name`

---

## Task 5 — Pomodoro Timer

**Goal:** Implement the full countdown timer with configurable duration.

**Checklist:**
- [ ] On page load, read `dashboard_pomodoro_duration` from `localStorage` (default `25`)
- [ ] Set `#timer-duration` value and `#timer-display` to match loaded duration
- [ ] Implement `startTimer()`:
  - Guard: do nothing if already running
  - Set `isRunning = true`
  - Use `setInterval` (1000ms) to decrement `timeLeft`
  - Update `#timer-display` each tick in `MM:SS` format
  - Call `timerDone()` when `timeLeft` reaches 0
- [ ] Implement `stopTimer()`:
  - Clear the interval
  - Set `isRunning = false`
- [ ] Implement `resetTimer()`:
  - Call `stopTimer()`
  - Restore `timeLeft` to current configured duration
  - Update `#timer-display`
- [ ] Implement `timerDone()`:
  - Clear interval
  - Display a browser `alert("Focus session complete!")` or in-page notification
- [ ] Add click events: `#timer-start` → `startTimer()`, `#timer-stop` → `stopTimer()`, `#timer-reset` → `resetTimer()`
- [ ] Add click event on `#timer-set`:
  - Read and validate `#timer-duration` value (1–120)
  - Save to `localStorage` under `dashboard_pomodoro_duration`
  - Call `resetTimer()` with new duration
- [ ] Add `aria-live="polite"` to `#timer-display` in HTML (or via JS on load)

---

## Task 6 — To-Do List

**Goal:** Implement add, complete, edit, and delete task functionality with localStorage persistence.

**Checklist:**
- [ ] Implement `loadTodos()`: read `dashboard_todos` from `localStorage`; parse JSON; call `renderTodos()`
- [ ] Implement `saveTodos(todos)`: stringify and write array to `localStorage`
- [ ] Implement `renderTodos(todos)`:
  - Clear `#todo-list`
  - For each task, create an `<li class="todo-item">` containing:
    - `<input type="checkbox">` checked if `task.completed`; on change → toggle completed, save, re-render
    - `<span>` with task text; on double-click → replace with `<input>` for inline edit; on blur/Enter → save new text, re-render
    - `<button>` delete; on click → remove from array, save, re-render
  - Apply class `completed` to `<li>` when `task.completed` is true
- [ ] Add click event on `#todo-add`: read `#todo-input`, create task object (`{ id: Date.now(), text, completed: false }`), push, save, re-render, clear input
- [ ] Add `keydown` Enter event on `#todo-input` that triggers the same add logic
- [ ] Call `loadTodos()` on page load

---

## Task 7 — Quick Links

**Goal:** Implement add and delete quick links with localStorage persistence.

**Checklist:**
- [ ] Implement `loadLinks()`: read `dashboard_links` from `localStorage`; parse JSON; call `renderLinks()`
- [ ] Implement `saveLinks(links)`: stringify and write array to `localStorage`
- [ ] Implement `renderLinks(links)`:
  - Clear `#link-list`
  - For each link, create an `<li>` containing:
    - `<a href="link.url" target="_blank" rel="noopener noreferrer">` with `link.label` as text
    - `<button>` delete; on click → remove from array, save, re-render
- [ ] Add click event on `#link-add`:
  - Read `#link-label` and `#link-url`
  - Validate both are non-empty; validate URL format
  - Create link object (`{ id: Date.now(), label, url }`)
  - Push, save, re-render, clear inputs
- [ ] Call `loadLinks()` on page load

---

## Task 8 — Component Styles

**Goal:** Style all new components added in Tasks 1–7.

**Checklist:**
- [ ] Style `#clock`: large font size, monospace font
- [ ] Style `#date` and `#greeting`: appropriate size hierarchy
- [ ] Style `#theme-toggle`: top-right position in header, icon button appearance
- [ ] Style `#timer-display`: large countdown display, centered
- [ ] Style timer control buttons: grouped, distinct Start/Stop/Reset appearance
- [ ] Style `#todo-list`: remove list bullets; each `<li>` as a row with checkbox, text, delete button
- [ ] Style `.todo-item.completed span`: `text-decoration: line-through`, reduced opacity
- [ ] Style `#link-list`: remove list bullets; each link as a pill or row
- [ ] Style all `<input>` and `<button>` elements: consistent border, padding, border-radius, accent color focus ring
- [ ] Ensure all styles use CSS variables so dark mode applies automatically

---

## Task 9 — Accessibility & Polish

**Goal:** Verify and fix accessibility, and apply final responsive polish.

**Checklist:**
- [ ] Confirm every `<input>` has a visible or `aria-label` label
- [ ] Confirm every icon-only `<button>` has a descriptive `aria-label`
- [ ] Confirm `#timer-display` has `aria-live="polite"`
- [ ] Test keyboard navigation: Tab through all interactive elements in logical order
- [ ] Test Enter key triggers add actions on all input fields
- [ ] Check colour contrast ratios in both light and dark mode meet WCAG 2.1 AA
- [ ] Test layout on 320px, 768px, and 1200px viewport widths
- [ ] Verify all localStorage reads include fallback defaults
- [ ] Verify no console errors on page load with empty localStorage

---

## Completion Criteria

The project is complete when:

1. All nine tasks above are checked off.
2. The page loads with no console errors.
3. All data (name, theme, timer duration, tasks, links) persists across hard reloads.
4. The layout is functional on a 320px wide screen.
5. All interactive elements are reachable and operable by keyboard alone.
