# Requirements — Life Dashboard

## Overview

Life Dashboard is a single-page personal productivity dashboard built with plain HTML, CSS, and vanilla JavaScript. It runs entirely in the browser with no backend or framework dependencies. The project is an extension of an existing RevoU assignment and must preserve the current file structure.

---

## Functional Requirements

### 1. Clock, Date & Greeting

- **REQ-1.1** The page must display the current time, updated every second, in 24-hour format (`HH:MM:SS`).
- **REQ-1.2** The page must display the current date in the format: `Weekday, Month Day, Year` (e.g. `Friday, October 9, 2026`).
- **REQ-1.3** The page must display a time-based greeting: `Good Morning` (00:00–11:59), `Good Afternoon` (12:00–17:59), `Good Night` (18:00–23:59).
- **REQ-1.4** The greeting must include the user's custom name (see REQ-7).

### 2. Custom Name

- **REQ-2.1** A text input and submit button must allow the user to enter their name.
- **REQ-2.2** On submit, the greeting updates to include the entered name.
- **REQ-2.3** If no name is entered, the greeting falls back to `"User"`.
- **REQ-2.4** The entered name must be persisted in `localStorage` so it survives page reloads.

### 3. Pomodoro Focus Timer

- **REQ-3.1** The timer must default to 25 minutes.
- **REQ-3.2** The user must be able to start, stop (pause), and reset the timer.
- **REQ-3.3** The timer must count down and display remaining time in `MM:SS` format.
- **REQ-3.4** When the timer reaches 00:00, the browser must display an alert or notification.
- **REQ-3.5** The user must be able to configure the timer duration (in minutes) before starting.
- **REQ-3.6** The configured duration must be persisted in `localStorage`.

### 4. To-Do List

- **REQ-4.1** The user must be able to add a new task by typing in an input field and pressing Enter or clicking an Add button.
- **REQ-4.2** Each task must support inline editing.
- **REQ-4.3** Each task must have a toggle to mark it as complete or incomplete.
- **REQ-4.4** Each task must have a delete button.
- **REQ-4.5** Completed tasks must be visually distinguishable (e.g. strikethrough).
- **REQ-4.6** All tasks, including their completion state, must be persisted in `localStorage`.
- **REQ-4.7** Tasks must be restored from `localStorage` on page load.

### 5. Quick Links

- **REQ-5.1** The user must be able to add a quick link with a label and URL.
- **REQ-5.2** Each quick link must open in a new tab.
- **REQ-5.3** Each quick link must have a delete button.
- **REQ-5.4** All quick links must be persisted in `localStorage`.
- **REQ-5.5** Quick links must be restored from `localStorage` on page load.

### 6. Light / Dark Mode

- **REQ-6.1** A toggle button must switch between light and dark mode.
- **REQ-6.2** The selected theme must be persisted in `localStorage`.
- **REQ-6.3** The correct theme must be applied on page load before any content renders (no flash of wrong theme).

---

## Non-Functional Requirements

### Technical Constraints

- **REQ-T1** The project must use HTML, CSS, and vanilla JavaScript only — no frameworks, libraries, or build tools.
- **REQ-T2** There must be exactly one CSS file: `CSS/style.css`.
- **REQ-T3** There must be exactly one JavaScript file: `JS/index.js`.
- **REQ-T4** The `index.html` file must remain at the project root.
- **REQ-T5** No backend, server-side code, or external API calls are permitted.

### Responsiveness

- **REQ-R1** The layout must be usable on screens from 320px wide and up.
- **REQ-R2** All interactive elements must be reachable and operable on touch devices.

### Accessibility

- **REQ-A1** All interactive elements must be keyboard-navigable.
- **REQ-A2** All form inputs must have associated `<label>` elements or `aria-label` attributes.
- **REQ-A3** Colour contrast must meet WCAG 2.1 AA minimum ratios in both light and dark mode.
- **REQ-A4** The timer alert must not rely on colour alone to communicate state.

---

## Existing Code Baseline

The following is already implemented and must be preserved as the foundation:

| Feature | File | Status |
|---|---|---|
| Real-time clock (`#clock`) | `JS/index.js` | ✅ Implemented |
| Real-time date (`#date`) | `JS/index.js` | ✅ Implemented |
| Time-based greeting (`#greeting`) | `JS/index.js` | ✅ Implemented |
| Name input (`#inputname`) + submit (`#submitnama`) | `index.html` / `JS/index.js` | ✅ Implemented |
| CSS styling | `CSS/style.css` | ⬜ Empty — to be built |
| Pomodoro timer | — | ⬜ Not yet built |
| To-do list | — | ⬜ Not yet built |
| Quick links | — | ⬜ Not yet built |
| Light/dark mode | — | ⬜ Not yet built |
| localStorage persistence | — | ⬜ Not yet built |
