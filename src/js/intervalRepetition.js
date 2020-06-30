export default function intervalRepetition(word, level) {
    //level from 0-5
    const levelButtons = document.querySelector('.level-buttons');
    const againBtn = document.querySelector('#again');
    const hardBtn = document.querySelector('#hard');
    const goodBtn = document.querySelector('#good');
    const easyBtn = document.querySelector('#easy');

    function calculate(easiness, interval, repetitions) {
        const easiness;
        const interval;
        const repetitions;

        if (!word.interval) { word.interval = 0; }
        if (!word.repetitions) { word.repetitions = 0; }
        if (!word.easiness) { word.easiness = 2.5; }

        // easiness factor
        easiness = easiness + (0.1 - (5 - level) * (0.08 + (5 - level) * 0.02));

        // repetitions
        if (level < 3) {
            repetitions = 0;
        } else {
            repetitions += 1;
        }

        // interval
        if (repetitions <= 1) {
            interval = 1;
        } else if (repetitions == 2) {
            interval = 6;
        } else {
            interval = Math.round(interval * easiness);
        }

        // next practice 
        const millisecondsInDay = 60 * 60 * 24 * 1000; //86.400.000
        const today = new Date();
        const now = today.getMilliseconds();
        const nextPracticeDate = now + millisecondsInDay * interval;  // Store the nextPracticeDate in the database???

        //buttons
        againBtn.onclick = () => {
            const levelMessage = `
            <h5 class="message">
            Данное слово появится в тренировке через 5 минут.
            </h5>
        `;
            levelButtons.innerHTML = levelMessage;
        }

        hardBtn.onclick = () => {
            level = 1;
            const levelMessage = `
            <h5 class="message">
            Данное слово появится в тренировке через ${nextPracticeDate} минут.
            </h5>
        `;
            levelButtons.innerHTML = levelMessage;
        }

        goodBtn.onclick = () => {
            level = 3;
            const levelMessage = `
            <h5 class="message">
            Данное слово появится в тренировке через ${nextPracticeDate} минут.
            </h5>
        `;
            levelButtons.innerHTML = levelMessage;
        }

        easyBtn.onclick = () => {
            level = 5;
            const levelMessage = `
            <h5 class="message">
            Данное слово появится в тренировке через ${nextPracticeDate} минут.
            </h5>
        `;
            levelButtons.innerHTML = levelMessage;
        }
    }
    calculate(easiness, interval, repetitions);

}