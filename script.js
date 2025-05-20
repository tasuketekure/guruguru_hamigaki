function startBrushing() {
  document.getElementById("bgm").play();
  document.getElementById("guru").src = "guru_brushing.png";
}

function stopBrushing() {
  document.getElementById("bgm").pause();
  document.getElementById("guru").src = "guru_start.png";
}

function sendStamp() {
  const date = document.getElementById("stampDate").value;
  if (!date) {
    alert("日付を選んでください");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzB9xMnBZXH-QIfrnawMtrRWYHM-MoB4Y0GeOBEpm3P1I79o0uAlg5yDuH2CYGeu4uS/exec", {
    method: "POST",
    body: JSON.stringify({ date: date }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(txt => alert("スタンプを登録しました！"))
  .catch(err => alert("エラー：" + err));
}
