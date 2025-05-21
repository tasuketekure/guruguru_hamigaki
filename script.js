
const guruImage = document.getElementById("guruImage");
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("startButton");
const quote = document.getElementById("quote");
const bgm = document.getElementById("bgm");
const toggleBGM = document.getElementById("toggleBGM");
const stampSound = document.getElementById("stampSound");
const brushingImg = "guru_brushing.png";
const startImg = "guru_start.png";

let playing = false;
let timerId = null;
let timerFinished = false;

const quotes = [
  "……おくすり飲むの、こっちが先……？","きょうも、はみがき……して、いい？","ねえ、いっしょに座ってて……優しくして……","ぐるぐるのこと、ちゃんと見てて……",
  "ぐるぐるのこと、忘れてほしくないの……","しかたが、じっと……してるのが、いちばん……","ひとりでも、ちゃんとやってる……夢で、みた",
  "ぴかぴかの……よぶんな気持ち、はぶいてしまいたい……","ひかりのかべ……よく見えない……","ちょっとくらい……泣いても、いいよね……？",
  "ずっと……君といられたら……","できるよ、だいじょうぶ……きみがそばにいれば","いましょう、ずっと……離れないで……",
  "……お耳、ふわふわしてる……","さみしいよ……ねえ……","名前……よんで……","まぶしいときは、目をとじていい……",
  "かべと話すのは、ぐるぐるだけじゃない……","大丈夫じゃないことも、大丈夫にしてあげる……","「だいじょうぶ？」って、言ってほしかった……",
  "ぬいぐるみたち、ぜんぶ、こころを持ってる……","ぐるぐるの、ことばにならないきもち……","そっと、隠してるつもり……だったのに……",
  "おふとんのなか、いっしょにいて……","……寒くなってきたね、手、つないでて","泣かない日があってもいいのに……",
  "うまくわらえるように、なるのかな……","あしたも、ここにいてくれる……？","夢の中では、ちゃんと笑えてたんだよ","だいすきって、いってほしいだけ……"
];

function showQuote() {
  const today = new Date().getDate();
  const line = quotes[(today - 1) % quotes.length];
  quote.textContent = "ぐるぐる「" + line + "」";
}

function startTimer() {
  if (timerId) return;
  let sec = 180;
  timerFinished = false;
  timerDisplay.textContent = "03:00";
  guruImage.src = startImg;
  showQuote();
  timerId = setInterval(() => {
    sec--;
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    timerDisplay.textContent = `${m}:${s}`;
    if (sec <= 0) {
      clearInterval(timerId);
      timerId = null;
      timerFinished = true;
      guruImage.src = brushingImg;
      quote.textContent = "おつかれさま……よくがんばったね……？";
    }
  }, 1000);
}

function toggleMusic() {
  if (playing) {
    bgm.pause();
    toggleBGM.textContent = "BGM オン／オフ";
  } else {
    bgm.play();
    toggleBGM.textContent = "BGM オフ";
  }
  playing = !playing;
}

function submitStamp() {
  const date = document.getElementById("stampDate").value;
  if (!date) return alert("日付を選んでね！");
  if (!timerFinished) return alert("タイマーが終わってからスタンプを押してね！");
  fetch("https://script.google.com/macros/s/AKfycbzB9xMnBZXH-QIfrnawMtrRWYHM-MoB4Y0GeOBEpm3P1I79o0uAlg5yDuH2CYGeu4uS/exec", {
    method: "POST",
    body: JSON.stringify({ date }),
    headers: { "Content-Type": "application/json" }
  }).then(r => r.text()).then(() => {
    stampSound.play();
    alert("スタンプをおしたよ！");
  });
}

function toggleNotification() {
  const btn = document.getElementById("notifyToggle");
  const current = localStorage.getItem("guru_notify") === "on";
  if (current) {
    localStorage.setItem("guru_notify", "off");
    btn.textContent = "通知: オフ";
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        localStorage.setItem("guru_notify", "on");
        btn.textContent = "通知: オン";
      } else {
        alert("通知が許可されませんでした");
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("notifyToggle");
  const current = localStorage.getItem("guru_notify");
  btn.textContent = current === "on" ? "通知: オン" : "通知: オフ";
  timerFinished = false;
});
