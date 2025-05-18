
let timer;
let timeLeft = 180;

function startTimer() {
  clearInterval(timer);
  timeLeft = 180;
  document.getElementById("guruImage").src = "guru_brushing.png";
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("guruImage").src = "guru_start.png";
      document.getElementById("quote").innerText = "……えらいね……";
      updateStamps();
      notify();
    }
  }, 1000);
}

function updateTimer() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  document.getElementById("timerDisplay").innerText = `${minutes}:${seconds}`;
  if (timeLeft === 120) document.getElementById("quote").innerText = "……あと、すこし……";
  if (timeLeft === 60) document.getElementById("quote").innerText = "……がんばってる、ね……";
}

function updateStamps() {
  let stamps = parseInt(localStorage.getItem("guruStamps") || "0");
  stamps++;
  localStorage.setItem("guruStamps", stamps);
  renderStamps();
  document.getElementById("stampSound").play();
}

function renderStamps() {
  const stamps = parseInt(localStorage.getItem("guruStamps") || "0");
  const container = document.getElementById("stampContainer");
  container.innerHTML = "";
  for (let i = 0; i < stamps; i++) {
    const s = document.createElement("div");
    s.classList.add("stamp");
    container.appendChild(s);
  }
}

function setNotifyTime() {
  const time = document.getElementById("notifyTime").value;
  localStorage.setItem("notifyTime", time);
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      alert("通知を設定しました");
    }
  });
}

function notify() {
  if (Notification.permission === "granted") {
    new Notification("ぐるぐる", {
      body: "……きょうも、はみがき……わすれてない……？",
      icon: "guruguru_icon.png"
    });
  }
}

function checkNotifyTime() {
  const now = new Date();
  const [h, m] = (localStorage.getItem("notifyTime") || "").split(":");
  if (!h) return;
  if (parseInt(h) === now.getHours() && parseInt(m) === now.getMinutes()) {
    notify();
  }
}

function toggleBGM() {
  const bgm = document.getElementById("bgm");
  if (bgm.paused) {
    bgm.play().catch(e => console.log("Audio play blocked:", e));
  } else {
    bgm.pause();
  }
}

setInterval(checkNotifyTime, 60000);
renderStamps();
