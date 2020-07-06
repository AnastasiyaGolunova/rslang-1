const learnedWords = document.querySelector('.learned-words');
const wordElement = document.querySelector('.word');

function getWordsNumber() {
    fetch(`https://afternoon-falls-25894.herokuapp.com/words/count`)
        .then((result) => result.json())
        .then((wordsNumber) => learnedWords.innerHTML = `<div class="words-number"><h4>Выученные слова:</h4> ${wordsNumber.count} </div>`)
}

function wordSection(wordList) {
    return wordList.map((word) => {
        console.log(word)
        return `<div class="dictionary-list-words">
    <div class="dictionary-list icon">
        <img class="voice" src="../icons/voice.png" alt="voice">
    </div>
    <span class="dictionary-list eng-word">${word.word}</span>
    <span class="dictionary-list ru-word">${word.wordTranslate}</span>
    <span class="dictionary-list eng-sentence">${word.textExample}</span>
    <div class="dictionary-list icon">
        <img class="trash" src="../icons/trash.png" alt="trash">
    </div>
    </div>`;
    });
}

function createWordContainer(wordList) {
    const wordTemplate = `
    <section class="section">
        ${wordSection(wordList).join('')}
    </section>
    `;
    console.log(wordTemplate)
    wordElement.innerHTML = wordTemplate;
    return wordElement;

}

function getWordsList() {
    fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=0&group=0`)
        .then((result) => result.json())
        .then(createWordContainer)
};

getWordsNumber();
getWordsList();