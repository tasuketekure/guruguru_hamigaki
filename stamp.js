document.getElementById("stamp-button").addEventListener("click", () => {
  const selectedDate = document.getElementById("stamp-date").value;
  if (!selectedDate) {
    alert("日付を選んでね！");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzB9xMnBZXH-QIfrnawMtrRWYHM-MoB4Y0GeOBEpm3P1I79o0uAlg5yDuH2CYGeu4uS/exec", {
    method: "POST",
    body: JSON.stringify({ date: selectedDate }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(text => {
      document.getElementById("status").textContent = "スタンプ押したよ！";
    })
    .catch(err => {
      console.error(err);
      document.getElementById("status").textContent = "失敗しちゃった……";
    });
});
