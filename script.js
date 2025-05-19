
let timer;
let timeLeft = 180;

const dayIndex = new Date().getDate() % 10;
const quotes = [['……きょうも、やる……の……？', '……あわ、たくさん……', '……もうすこし、がんばる……', '……ぴかぴか、だね……'], ['……また……はみがき、か……', '……うえの歯、しっかり……', '……したの歯も……', '……すっきり、した……？'], ['……くちのなか……変な感じ……', '……がんばってる、ね……', '……あと1分、えらい……', '……きょうも、えらかった……'], ['……この音……ちょっときらい……', '……うえの奥……わすれないで……', '……あとちょっと……', '……うん、いい感じ……'], ['……なにか忘れてない……？', '……奥歯、むずかしいね……', '……あとすこし……ふぅ……', '……おつかれさま……'], ['……きょうはちゃんと……', '……ていねいに、ゆっくり……', '……急がなくていいよ……', '……うん、ばっちり……'], ['……むしば……やだな……', '……ぜったい防ぐ……', '……ねばってる……', '……がんばった、よね……？'], ['……ぼくも、いっしょに……', '……しゃかしゃか……', '……あとすこし、ファイト……', '……えへへ……'], ['……また、あしたも……', '……えらい……えらいよ……', '……あとちょっとだけ……', '……すてきな歯……'], ['……ここだけの話……歯ブラシすき……', '……ごしごし……', '……泡の匂い……好きかも……', '……ぐるぐるも、がんばったよ……']][dayIndex];

function startTimer() {
  clearInterval(timer);
  timeLeft = 180;
  document.getElementById("guruImage").src = "guru_brushing.png";
  document.getElementById("quote").innerText = quotes[0];
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("guruImage").src = "guru_start.png";
      document.getElementById("quote").innerText = quotes[3];
      updateStamps();
      notify();
    }
  }, 1000);
}

function updateTimer() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  document.getElementById("timerDisplay").innerText = `${minutes}:${seconds}`;
  if (timeLeft === 120) document.getElementById("quote").innerText = quotes[1];
  if (timeLeft === 60) document.getElementById("quote").innerText = quotes[2];
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
