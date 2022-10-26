import Notiflix, { Notify } from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = +e.currentTarget.delay.value;
  const step = +e.currentTarget.step.value;
  const amount = e.currentTarget.amount.value;
  console.log(amount);

  for (i = 1; i <= amount; i += 1) {
    let position = i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
