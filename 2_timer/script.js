let timer;
let currentSeconds = 0;
let isTimerRunning = false;

function updateTimerDisplay() {
  let hours = Math.floor(currentSeconds / 3600);
  let minutes = Math.floor((currentSeconds % 3600) / 60);
  let seconds = currentSeconds % 60;
  document.getElementById('current-time').innerText = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function startTimer() {
  if (!isTimerRunning && currentSeconds > 0) {
    document.getElementById('input-container').style.display = 'none';
    document.getElementById('current-time').style.display = 'block';
    isTimerRunning = true;

    timer = setInterval(function() {
      currentSeconds--;
      if (currentSeconds < 0) {
        clearInterval(timer);
        isTimerRunning = false;
        alert('타이머 종료!');
        resetTimer();
      } else {
        updateTimerDisplay();
      }
    }, 1000);

    updateTimerDisplay(); 
  } else if (!isTimerRunning) {
    let hours = parseInt(document.getElementById('hours').value) || 0;
    let minutes = parseInt(document.getElementById('minutes').value) || 0;
    let seconds = parseInt(document.getElementById('seconds').value) || 0;
    currentSeconds = hours * 3600 + minutes * 60 + seconds;
    if (currentSeconds > 0) {
      startTimer();
    }
  }
}

function stopTimer() {
  if (isTimerRunning) {
    clearInterval(timer);
    isTimerRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  isTimerRunning = false;
  currentSeconds = 0;
  document.getElementById('input-container').style.display = 'block';
  document.getElementById('current-time').style.display = 'none';
  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
  document.getElementById('current-time').innerText = '';
}
