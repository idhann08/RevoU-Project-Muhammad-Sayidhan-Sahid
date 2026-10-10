// themee
const html = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

const icnsun = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const icnmoon  = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  themeBtn.innerHTML = theme === "dark" ? icnmoon : icnsun;
}

themeBtn.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

applyTheme(localStorage.getItem("theme") || "dark");


// clock date

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", { hour12: false });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  document.getElementById("clock").textContent = time;
  document.getElementById("date").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();


// greeting

function greeting() {
  const hour = new Date().getHours();
  let grTime;

  if (hour < 12) {
    grTime = "Good Morning";
  } else if (hour < 18) {
    grTime = "Good Afternoon";
  } else {
    grTime = "Good Night";
  }

  const nama = document.getElementById("inputname").value || localStorage.getItem("username") || "User";
  document.getElementById("greeting").textContent = `${grTime}, ${nama}.`;
}

document.getElementById("submitnama").addEventListener("click", () => {
  const nama = document.getElementById("inputname").value;
  if (nama) localStorage.setItem("username", nama);
  greeting();
});




const savedName = localStorage.getItem("username");
if (savedName) document.getElementById("inputname").value = savedName;
greeting();




// pomodoro

let pomoDuration = parseInt(localStorage.getItem("pomoDuration")) || 25;
let pomoSeconds = pomoDuration * 60;
let pomoInterval = null;
let pomoRunning = false;

const pomoDisplay = document.getElementById("pomodoro-display");
const pomoDurationInput = document.getElementById("pomo-duration");

pomoDurationInput.value = pomoDuration;

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updatePomoDisplay() {
  pomoDisplay.textContent = formatTime(pomoSeconds);
}

document.getElementById("pomo-start").addEventListener("click", () => {
  if (pomoRunning) return;
  pomoRunning = true;
  pomoInterval = setInterval(() => {
    pomoSeconds--;
    updatePomoDisplay();
    if (pomoSeconds <= 0) {
      clearInterval(pomoInterval);
      pomoRunning = false;
      pomoDisplay.textContent = "00:00";
      alert("The time's up!.");
    }
  }, 1000);
});

document.getElementById("pomo-stop").addEventListener("click", () => {
  clearInterval(pomoInterval);
  pomoRunning = false;
});

document.getElementById("pomo-reset").addEventListener("click", () => {
  clearInterval(pomoInterval);
  pomoRunning = false;
  pomoDuration = parseInt(pomoDurationInput.value) || 25;
  pomoSeconds = pomoDuration * 60;
  updatePomoDisplay();
});

pomoDurationInput.addEventListener("change", () => {
  if (!pomoRunning) {
    pomoDuration = parseInt(pomoDurationInput.value) || 25;
    localStorage.setItem("pomoDuration", pomoDuration);
    pomoSeconds = pomoDuration * 60;
    updatePomoDisplay();
  }
});

updatePomoDisplay();


// to do list

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.contentEditable = true;
    span.addEventListener("blur", () => {
      tasks[index].text = span.textContent.trim();
      saveTasks();
    });

    const del = document.createElement("button");
    del.textContent = "x";
    del.className = "todo-delete";
    del.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
  input.value = "";
}

document.getElementById("todo-add").addEventListener("click", addTask);
document.getElementById("todo-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();


// ql

let links = JSON.parse(localStorage.getItem("quicklinks")) || [];

function saveLinks() {
  localStorage.setItem("quicklinks", JSON.stringify(links));
}

function renderLinks() {
  const list = document.getElementById("ql-list");
  list.innerHTML = "";

  links.forEach((link, index) => {
    const li = document.createElement("li");
    li.className = "ql-item";

    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const del = document.createElement("button");
    del.textContent = "x";
    del.className = "ql-delete";
    del.addEventListener("click", () => {
      links.splice(index, 1);
      saveLinks();
      renderLinks();
    });

    li.appendChild(a);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function addLink() {
  const labelInput = document.getElementById("ql-label");
  const urlInput = document.getElementById("ql-url");
  const label = labelInput.value.trim();
  let url = urlInput.value.trim();

  if (!label || !url) return;

  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  links.push({ label, url });
  saveLinks();
  renderLinks();

  labelInput.value = "";
  urlInput.value = "";
}

document.getElementById("ql-add").addEventListener("click", addLink);
document.getElementById("ql-url").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addLink();
});

renderLinks();
