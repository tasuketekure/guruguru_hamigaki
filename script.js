
let timer;
function startTimer() {
  const button = document.querySelector("button");
  button.disabled = true;
  setTimeout(() => {
    alert("3分経ったよ！");
    button.disabled = false;
  }, 180000);
}

function toggleBgm() {
  const bgm = document.getElementById("bgm");
  if (bgm.paused) {
    bgm.play();
  } else {
    bgm.pause();
  }
}

function submitStamp() {
  const date = document.getElementById("date").value;
  if (!date) {
    alert("日付を選んでね");
    return;
  }
  fetch("https://script.google.com/macros/s/AKfycbzB9xMnBZXH-QIfrnawMtrRWYHM-MoB4Y0GeOBEpm3P1I79o0uAlg5yDuH2CYGeu4uS/exec", {
    method: "POST",
    body: new URLSearchParams({ date })
  })
  .then(res => res.text())
  .then(text => alert("スタンプ送信完了！"))
  .catch(err => alert("エラーが発生しました"));
}
