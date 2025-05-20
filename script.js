const brushingImg = 'guru_brushing.png';
const startImg = 'guru_start.png';

const img = document.getElementById('guruImage');
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const quote = document.getElementById('quote');
const bgm = document.getElementById('bgm');
const toggleBGM = document.getElementById('toggleBGM');

let timerId = null;

function formatTime(sec){
  const m = String(Math.floor(sec/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  return `${m}:${s}`;
}

function startTimer(){
  if(timerId) return; // already running
  let remaining = 180;
  img.src = startImg;
  timerDisplay.textContent = formatTime(remaining);
  quote.textContent = 'はみがきスタートだよ……！';
  timerId = setInterval(()=>{
    remaining--;
    timerDisplay.textContent = formatTime(remaining);
    if(remaining<=0){
      clearInterval(timerId);
      timerId=null;
      img.src = brushingImg;
      quote.textContent = 'おつかれさま……よくがんばったね……？';
    }
  },1000);
}

function toggleMusic(){
  if(bgm.paused){
    bgm.play();
    toggleBGM.textContent = 'BGM オフ';
  }else{
    bgm.pause();
    toggleBGM.textContent = 'BGM オン';
  }
}

startButton.addEventListener('click', startTimer);
toggleBGM.addEventListener('click', toggleMusic);
