let Home = {
  render: async () => {
    let view = /*html*/ `
        <section class="section">
          <div style="display: flex; justify-content: center;">
            <div>
              <div style="display: flex;">
                <div style="margin-right: 100px;">
                  남은 시간 : <span id="secondSpan">0</span>초
                </div>
                <div>
                  점수 : <span id="pointSpan">0</span>점
                </div>
              </div>
              <div style="display: flex; justify-content: center;">
                <h2 id="textH2">문제 단어</h2>
              </div>
              <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                <form id="submitForm">
                  <input type="text" placeholder="입력" id="textInput" disabled>  
                </form>
              </div>
              <div style="display: flex; justify-content: center;">
                <button id="footerButton">시작</button>
              </div>
            </div>
          </div>
        </section>
        `;
    return view;
  },
  after_render: async () => {
    const footerButton = document.getElementById('footerButton');
    const textH2 = document.getElementById('textH2');
    const secondSpan = document.getElementById('secondSpan');
    const pointSpan = document.getElementById('pointSpan');
    const submitForm = document.getElementById('submitForm');
    const textInput = document.getElementById('textInput');

    let problems = [];
    let problemIndex = 0;
    let timer = null;
    let second = 0;

    init();

    function init() {
      addEventListeners();
    }

    function addEventListeners() {
      footerButton.addEventListener('click', handleClick);
      submitForm.addEventListener('submit', handleSubmit);
    }

    function handleSubmit(event) {
      event.preventDefault();
      if (textInput.value === textH2.textContent) {
        clearInterval(timer);
        second = second + problems[problemIndex].second - secondSpan.textContent * 1;
        pointSpan.textContent = pointSpan.textContent * 1 + secondSpan.textContent * 1;

        if (problemIndex === problems.length - 1) {
          window.location.assign(
            `/#/result/${pointSpan.textContent}/${parseInt(second / problems.length)}`
          );
          return;
        }

        problemIndex += 1;
        startGame();
      }

      textInput.value = '';
    }

    function handleClick() {
      if (footerButton.textContent === '시작') getProblems();
      else {
        textInput.disabled = true;
        footerButton.textContent = '시작';
        problems = [];
        problemIndex = 0;
        second = 0;
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
        second += problems[problemIndex].second;

        if (problemIndex === problems.length - 1) {
          window.location.assign(
            `/#/result/${pointSpan.textContent}/${parseInt(second / problems.length)}`
          );
          return;
        }

        problemIndex += 1;
        startGame();
      }
    }
  }
};

export default Home;
