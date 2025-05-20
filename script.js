let timer;
let isBgmPlaying = false;
const bgm = document.getElementById("bgm");
const guruImage = document.getElementById("guruImage");

function toggleBgm() {
  if (isBgmPlaying) {
    bgm.pause();
  } else {
    bgm.play();
  }
  isBgmPlaying = !isBgmPlaying;
}

function startBrushing() {
  guruImage.src = "guru_brushing.png";
  timer = setTimeout(() => {
    guruImage.src = "guru_start.png";
  }, 10000); // 10秒
}
