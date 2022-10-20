const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};
let timerId = null;

refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

refs.btnStop.setAttribute('disabled', 'disabled');

// function onBtnStartClick() {
//   timerId = setInterval(() => {
//     const p = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//     refs.bodyEl.style.backgroundColor = p;
//     console.log(p);
//   }, 1000);
// }

function onBtnStartClick() {
  timerId = setInterval(changeBodyColor, 1000);

  refs.btnStart.setAttribute('disabled', 'disabled');
  refs.btnStop.removeAttribute('disabled', 'disabled');
}
function changeBodyColor() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

function onBtnStopClick() {
  clearInterval(timerId);
  refs.btnStart.removeAttribute('disabled', 'disabled');
  refs.btnStop.setAttribute('disabled', 'disabled');

  console.log(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// const r = getRandomHexColor();
// console.log(r);
