const footerButton = document.getElementById('footerButton');
const textH2 = document.getElementById('textH2');
const secondSpan = document.getElementById('secondSpan');
const pointSpan = document.getElementById('pointSpan');
const submitForm = document.getElementById('submitForm');
const textInput = document.getElementById('textInput');

let problems = [];
let problemIndex = 0;
let timer = null;

init();

function init() {
  addEventListeners();
}

function addEventListeners() {
  footerButton.addEventListener('click', clickButton);
  submitForm.addEventListener('submit', handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();
  if (textInput.value === textH2.textContent) {
    clearInterval(timer);
    problemIndex += 1;
    pointSpan.textContent = pointSpan.textContent * 1 + secondSpan.textContent * 1;
    startGame();
  }

  textInput.value = '';
}

function clickButton() {
  if (footerButton.textContent === '시작') getProblems();
  else {
    textInput.disabled = true;
    footerButton.textContent = '시작';
    problems = [];
    problemIndex = 0;
    secondSpan.textContent = 0;
    pointSpan.textContent = 0;
    textH2.textContent = '문제 단어';
    if (timer) clearInterval(timer);
  }
}

function getProblems() {
  fetch('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      problems = json;
      startGame();
    })
    .catch((error) => {
      console.log(error);
    });
}

function startGame() {
  textInput.disabled = false;
  footerButton.textContent = '초기화';
  textH2.textContent = problems[problemIndex].text;
  secondSpan.textContent = problems[problemIndex].second;

  timer = setInterval(decreaseTimer, 1000);
}

function decreaseTimer() {
  secondSpan.textContent -= 1;
  if (secondSpan.textContent === '0') {
    clearInterval(timer);

    if (problemIndex === problems.length - 1) return;

    problemIndex += 1;
    startGame();
  }
}
