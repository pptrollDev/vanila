import Utils from '../services/Utils.js';

let Reuslt = {
  render: async () => {
    let request = Utils.parseRequestURL();

    let view = /*html*/ `
            <section class="section">
            <div style="display: flex; justify-content: center;">
            <div>
              <div style="display: flex; justify-content: center;">
                <h3>Mission Complete!</h3>
              </div>
              <div style="display: flex; justify-content: center;">
                <h2>당신의 점수는 ${request.point}점 입니다.</h2>
              </div>
              <div style="display: flex; justify-content: center;">
                <h4>단어당 평균 답변 시간은 ${request.second}초 입니다.</h2>
              </div>
              <div style="display: flex; justify-content: center;">
                <button id="footerButton">다시 시작</button>
              </div>
            </div>
          </div>
            </section>
        `;
    return view;
  },
  after_render: async () => {
    const footerButton = document.getElementById('footerButton');

    init();

    function init() {
      addEventListeners();
    }

    function addEventListeners() {
      footerButton.addEventListener('click', handleClick);
    }

    function handleClick() {
      window.location.assign(`/#/`);
    }
  }
};

export default Reuslt;
