
function submitStamp() {
  const date = document.getElementById("stampDate").value;
  if (!date) return alert("日付を選んでね！");
  fetch("https://script.google.com/macros/s/AKfycbzB9xMnBZXH-QIfrnawMtrRWYHM-MoB4Y0GeOBEpm3P1I79o0uAlg5yDuH2CYGeu4uS/exec", {
    method: "POST",
    body: JSON.stringify({ date }),
    headers: { "Content-Type": "application/json" }
  }).then(r => r.text()).then(() => {
    document.getElementById("stampSound").play();
    alert("スタンプをおしたよ！");
  });
}

function toggleNotification() {
  const btn = document.getElementById("notifyToggle");
  const current = localStorage.getItem("guru_notify") === "on";
  if (current) {
    Notification.permission === "granted" && alert("通知をオフにしました");
    localStorage.setItem("guru_notify", "off");
    btn.textContent = "通知: オフ";
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        localStorage.setItem("guru_notify", "on");
        btn.textContent = "通知: オン";
        alert("通知をオンにしました");
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
});
