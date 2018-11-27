let timer;
let resetInterval;
let interval = 8000;

const progress = document.querySelector('.progress');
document.addEventListener('DOMContentLoaded', e => {
  console.log('loaded!');
  // const start = document.querySelector('#start');
  // const stop = document.querySelector('#stop');
  // const reset = document.querySelector('#reset');

  // start.addEventListener('click', startTimer);
  // stop.addEventListener('click', stopTimer);
  // reset.addEventListener('click', resetTimer);

  startTimer();

  // let resetInterval = setInterval(resetTimer, interval);
});

let resetCounter = 0;
let i = 0;
let adjustWidth = () => {
  i++;
  progress.style.width = `${100 - (100 / (interval / 1000)) * i}%`;
}

const startTimer = () => {
  resetInterval = setInterval(resetTimer, interval);
  timer = setTimeout(function myTimer() {
    adjustWidth();
    resetCounter++;

    timer = setTimeout(myTimer, 1000);
  }, 1000);
}

const stopTimer = () => {
  console.log('stop!');
  clearTimeout(timer);
  clearInterval(resetInterval);
}

// run this function every interval seconds
const resetTimer = () => {
  i = 0;
  progress.style.width = `100%`;
  stopTimer();
  startTimer();
}