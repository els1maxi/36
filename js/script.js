import { DEFAULT_TIME_IN_SECONDS } from './constants.js';

const timer = document.querySelector('.timer');
const modal = document.querySelector('.modal');
const btnOk = document.querySelector('.btn-ok');
const seconds = document.querySelector('.seconds'); 
const minutes = document.querySelector('.minutes');
const hours = document.querySelector('.hours');
const line = document.querySelector('.line');
const reset = document.querySelector('.btn-reset');
const start = document.querySelector('.btn-start');
const pause = document.querySelector('.btn-pause');
const modalHour = document.getElementById('hour');
const modalMinute = document.getElementById('minute');
const modalSec = document.getElementById('sec');

let countdown = null;
let totalTime = DEFAULT_TIME_IN_SECONDS;
let remainingTime = totalTime;
let isPaused = false; 

function updateDisplay() {
  const remHours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
  const remMinutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0');
  const remSeconds = (remainingTime % 60).toString().padStart(2, '0');

  hours.textContent = remHours;
  minutes.textContent = remMinutes;
  seconds.textContent = remSeconds; 
}

function updateProgressBar() {
  const percentage = ((totalTime - remainingTime) / totalTime) * 100;
  line.style.width = `${percentage}%`;

  if (countdown) {
    line.style.backgroundColor = '#ff0000'; 
  } else {
    line.style.backgroundColor = '#28a745'; 
  }
}

function startTimer() {
  if (!countdown) {
    countdown = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
        updateProgressBar();
      } else {
        clearInterval(countdown);
        countdown = null;
        updateProgressBar(); 
      }
    }, 1000);
  }
}

function pauseTimer() {
  if (countdown) {
    clearInterval(countdown);
    countdown = null;
    isPaused = true; 
    updateProgressBar(); 
  } else if (isPaused) {
    startTimer(); 
    isPaused = false;
  }
}

function resetTimer() {
  clearInterval(countdown);
  countdown = null;
  remainingTime = totalTime;
  isPaused = false; 
  updateDisplay();
  updateProgressBar(); 
}

function setModalProperties() {
  const sec = Number(modalSec.value);
  const min = Number(modalMinute.value);
  const hour = Number(modalHour.value);

  remainingTime = totalTime = (hour * 3600) + (min * 60) + sec;
  updateDisplay();
  updateProgressBar();
  modal.classList.remove('show');
}

function getModalProperties() {
  if (!countdown) { 
    modal.classList.add('show');
  }
}

function initializeTimer() {
  remainingTime = totalTime;
  updateDisplay();
  updateProgressBar(); 
}

timer.addEventListener('click', getModalProperties);
btnOk.addEventListener('click', setModalProperties);
start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer);

initializeTimer();
