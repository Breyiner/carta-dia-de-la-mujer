const PIN = '0803';

const lock     = document.getElementById('lockContainer');
const letter   = document.getElementById('letterContainer');
const dots     = document.querySelectorAll('.dot');
const keypad   = document.querySelector('.pin-keypad');
const hint     = document.getElementById('lockHint');
let input = '';

function updateDots() {
  dots.forEach((dot, i) => dot.classList.toggle('filled', i < input.length));
}

function reset(error = false) {
  input = '';
  updateDots();
  hint.textContent = '';
  hint.classList.remove('error');
  if (error) {
    hint.textContent = 'PIN incorrecto 😅';
    hint.classList.add('error');
    navigator.vibrate?.([100, 50, 100]);
  }
}

function unlock() {
  lock.classList.add('hidden');
  letter.classList.remove('hidden');
  // El título aparece automáticamente porque está dentro de letterContainer
  navigator.vibrate?.([50, 100, 50]);
}

keypad.onclick = e => {
  const btn = e.target.closest('.key-btn');
  if (!btn) return;

  const key    = btn.dataset.key;
  const action = btn.dataset.action;

  if (key && input.length < 4) {
    input += key;
    updateDots();
    navigator.vibrate?.(30);
  } else if (action === 'clear') {
    input = input.slice(0, -1);
    updateDots();
  } else if (action === 'ok' && input.length === 4) {
    input === PIN ? unlock() : reset(true);
  }
};

document.onkeydown = e => {
  const num = e.key.replace(/[^0-9]/g, '');
  if (num && num.length === 1 && input.length < 4) {
    input += num;
    updateDots();
  } else if (e.key === 'Backspace') {
    input = input.slice(0, -1);
    updateDots();
  } else if (e.key === 'Enter' && input.length === 4) {
    input === PIN ? unlock() : reset(true);
  }
};

updateDots();