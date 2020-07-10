export default function intervalRepetition(word) {

    const levelButtons = document.querySelector('.level-buttons');
    const againBtn = document.querySelector('#again');
    const hardBtn = document.querySelector('#hard');

    function calculateLevel() {

        //buttons
        againBtn.onclick = () => {
            const levelMessage = `
            <h5 class="message">
            Данное слово появится в текущей тренировке.
            </h5>
        `;
            levelButtons.innerHTML = levelMessage;
            arrayStudy.push(word); //добавить слово в массив текущей тренировки
        }

        hardBtn.onclick = () => {
            const levelMessage = `
            <h5 class="message">
            Данное слово появится в следующей тренировке.
            </h5>
        `;
            levelButtons.innerHTML = levelMessage;

            let hardWord = JSON.stringify(word);
            localStorage.setItem("hardWord", hardWord); //добавить слово в localStorage

            let takenHardWord = JSON.parse(localStorage.getItem("hardWord")); //получить слово из localStorage
        }
    }
    calculateLevel();

}