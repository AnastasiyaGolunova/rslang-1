const learnedWords = document.querySelector('.learned-words');
const word = document.querySelector('.word');

export function getWordsNumber() {
    fetch(`https://afternoon-falls-25894.herokuapp.com/words/count`)
        .then((result) => result.json())
        .then((wordsNumber) => learnedWords.innerHTML = `<div class="words-number">Число слов: ${wordsNumber.count} </div>`)
}

export function getWordsList() {
    fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=0&group=0`)
        .then((result) => result.json())
        .then((wordList) => word.innerHTML =
            `<div class="dictionary-list-words">
            <span class="dictionary-list eng-word"></span>
            <div class="dictionary-list icon">
                <img class="voice" src="../icons/voice.png" alt="voice">
            </div>
            <span class="dictionary-list ru-word"></span>
            <span class="dictionary-list eng-sentence"></span>
            <div class="dictionary-list icon">
                <img class="trash" src="../icons/trash.png" alt="trash">
            </div>
            </div>`)

}

getWordsNumber();
getWordsList();