import flatpickr from 'flatpickr';
import Notiflix, { Notify } from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', 'disabled');
let userDate = null;
let timerId = null;
const currentDate = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const validTime = selectedDates[0] < currentDate;
    if (validTime) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.removeAttribute('disabled', 'disabled');
    userDate = selectedDates[0];
  },
};

refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
  refs.startBtn.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    const currentTime = Date.now();
    let deltaTime = userDate - currentTime;
    let { seconds, minutes, hours, days } = convertMs(deltaTime);
    refs.secondsValue.textContent = seconds;
    refs.minutesValue.textContent = minutes;
    refs.hoursValue.textContent = hours;
    refs.daysValue.textContent = days;

    if (
      seconds === '00' &&
      minutes === '00' &&
      hours === '00' &&
      days === '00'
    ) {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  Notify.success('Time is over');
  refs.startBtn.setAttribute('disabled', 'disabled');
}

flatpickr('input#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// console.log(options.selectedDates[0]);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
