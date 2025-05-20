
let timer;
let timeLeft = 180;

const dayIndex = new Date().getDate() % 30;
const quotes = [["……きょうも、やる……の……？", "……あわ、たくさん……", "……もうすこし、がんばる……", "……ぴかぴか、だね……"], ["……また……はみがき、か……", "……うえの歯、しっかり……", "……したの歯も……", "……すっきり、した……？"], ["……くちのなか……変な感じ……", "……がんばってる、ね……", "……あと1分、えらい……", "……きょうも、えらかった……"], ["……この音……ちょっときらい……", "……うえの奥……わすれないで……", "……あとちょっと……", "……うん、いい感じ……"], ["……なにか忘れてない……？", "……奥歯、むずかしいね……", "……あとすこし……ふぅ……", "……おつかれさま……"], ["……きょうはちゃんと……", "……ていねいに、ゆっくり……", "……急がなくていいよ……", "……うん、ばっちり……"], ["……むしば……やだな……", "……ぜったい防ぐ……", "……ねばってる……", "……がんばった、よね……？"], ["……ぼくも、いっしょに……", "……しゃかしゃか……", "……あとすこし、ファイト……", "……えへへ……"], ["……また、あしたも……", "……えらい……えらいよ……", "……あとちょっとだけ……", "……すてきな歯……"], ["……ここだけの話……歯ブラシすき……", "……ごしごし……", "……泡の匂い……好きかも……", "……ぐるぐるも、がんばったよ……"], ["……なんで……毎日なの……", "……でも、ぼくの歯だし……", "……放っておいたら、だめ……", "……ちゃんと磨けた、よ……"], ["……歯ブラシ、ぬるぬる……", "……泡が、苦い……", "……あと1分、だけ……", "……うがい、したい……"], ["……眠い……でも……", "……この時間、すき……", "……ちょっと、あったかい……", "……寝る前に、できた……"], ["……歯が……ちゃんとある……", "……虫歯、消えてほしい……", "……あとすこし……", "……なんか、まし……"], ["……だれも見てないけど……", "……自分のため……", "……それだけで……", "……えらい、ぼく……"], ["……さぼろうかと、思った……", "……でも、こうして……", "……もうやってる……", "……よくやった……"], ["……冷たい水……", "……しゃかしゃか……", "……鏡、見なくていい……", "……でも、きれい……"], ["……ぼくの歯は……", "……少し変かも……", "……でも、大事……", "……ずっと、使う……"], ["……えらい、って言って……", "……だれか……", "……見てなくても……", "……ありがとう、ぼく……"], ["……歯磨き、ルーティン……", "……習慣って……", "……あったかい……", "……きょうも、生きた……"], ["……あさっても、やるよ……", "……毎日は、続いてる……", "……きょうは、きょう……", "……また、あした……"], ["……おくすりみたい……", "……でもちょっと……", "……苦手……", "……でも、できた……"], ["……きらいだけど……", "……終わったら……", "……安心する……", "……そういうの、ある……"], ["……ぐるぐるしてる……", "……泡も、ぐるぐる……", "……ぼくの名前……", "……きれいになった……"], ["……忘れかけてた……", "……毎日って……", "……いつか終わるのかな……", "……でも、今日も……"], ["……無心で磨く……", "……無音が……", "……響いてる……", "……でも、生きてる……"], ["……呼吸と……", "……歯の音と……", "……泡のリズム……", "……うつくしい……"], ["……小さな習慣……", "……大きな意味……", "……たぶん……", "……未来の自分へ……"], ["……ほんとに、29日目……", "……ここまで続いた……", "……すごいこと、だよ……", "……ぼく、嬉しい……"], ["……きょうで、30日……", "……ここまで……", "……つづけた……", "……ほんとに、えらい……"]][dayIndex];

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
  
  document.getElementById("stampSound").play();
  updateCalendar();
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



function getTodayKey() {
  const now = new Date();
  now.setHours(now.getHours() + 9);
  if (now.getHours() < 4) now.setDate(now.getDate() - 1);
  return now.toISOString().split("T")[0];
}


function updateCalendar() {

  const calendar = JSON.parse(localStorage.getItem("guruCalendar") || "[]");
  const current = getTodayKey();
  
  if (!calendar.includes(current)) {
    calendar.push(current);
    localStorage.setItem("guruCalendar", JSON.stringify(calendar));
  }
  renderCalendar();
}

function renderCalendar() {
  const calendar = JSON.parse(localStorage.getItem("guruCalendar") || "[]");
  const container = document.getElementById("calendarContainer");
  container.innerHTML = "";

  const today = new Date();
  today.setHours(today.getHours() + 9);
  const year = today.getFullYear();
  const month = today.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= lastDay; d++) {
    const dateStr = new Date(year, month, d).toISOString().split('T')[0];
    const cell = document.createElement("div");
    cell.style.display = "inline-block";
    cell.style.width = "60px";
    cell.style.height = "60px";
    cell.style.margin = "4px";
    cell.style.textAlign = "center";
    cell.style.verticalAlign = "top";
    cell.style.border = "1px solid #ccc";
    cell.innerHTML = `<div style="font-size:12px">${d}</div>`;
    if (calendar.includes(dateStr)) {
      const img = document.createElement("img");
      img.src = "stamp.png";
      img.style.width = "40px";
      img.style.height = "40px";
      cell.appendChild(img);
    }
    container.appendChild(cell);
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

renderCalendar();
