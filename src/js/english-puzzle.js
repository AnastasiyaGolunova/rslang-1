import '../css/style.css'
import '../css/english-puzzle.css';
import images from './english-puzzle/images';

const startButton = document.querySelector('.button-start');
const logoWrap = document.querySelector('#logo');
const gameWrap = document.querySelector('.game');
const levelGame = document.querySelector('#levels');
const pageGame = document.querySelector('#page');
const imageContainer = document.querySelector('.img-puzzle');

let draggedItem = null;
let dataElements = null;
let canvasElements = null;
let canvasHeight = null;
let image = null;

async function createCanvasElements({
  src,
  wordsList,
  extraWidthValue = 10,
  fontFamily = 'Arial',
  fontRatio = 1,
  fontType = 'bold',
  borderPuzzle = 1,
  shadowPuzzle = 2,
  borderText = 1,
  shadowText = 10,
  colorBorder = 'rgb(0,255,250)',
  colorShadowBorder = 'rgb(255,255,250)',
  colorText = 'magenta',
  colorShadowText = 'black',
  solidTextColor = 'white',
  fontStyle = 'fillText'
}) {

  if (!wordsList || !Array.isArray(wordsList) || !wordsList.length || !wordsList.every(el => typeof el === 'string')) {
    throw new TypeError('"wordsList" argument must be an array containing strings. Example: ["string"]');
  }

  if (!src || typeof src !== 'string') {
    throw new TypeError('"src" argument must be a "string"');
  }

  if (isNaN(parseInt(extraWidthValue, 10))) {
    throw new TypeError('"extraWidthValue" argument must be a "number"');
  }

  return new Promise((resolve, reject) => {
    const container = document.querySelector('.img-puzzle');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const img = new Image(containerWidth, containerHeight);
    img.src = src;

    img.onload = () => {
      const groupsWords = wordsList.map(word => word.split(' '));
      const groupsRow = groupsWords.length;
      const EXTRA_WIDTH_VALUE = parseInt(extraWidthValue, 10);
      const result = [];

      let startYPointCropImage = 0;

      groupsWords.forEach((words, i) => {
        const row = document.createElement('div');
        const wordCount = words.length;
        const letterCounts = words.reduce((acc, val) => acc + val.replace(/<[^>]*>/g, '').length, 0);
        const reduceLength = letterCounts * EXTRA_WIDTH_VALUE;
        const extraWidth = Math.round(reduceLength / wordCount);
        const onePart = Math.round((img.width - reduceLength) / letterCounts);
        canvasHeight = Math.round(img.height / groupsRow);

        let widthCount = 0;

        row.classList.add(`group-words`);
        row.classList.add(`row-${i + 1}`);

        words.forEach((w, j) => {
          const word = w.replace(/<[^>]*>/g, '');
          const canvas = document.createElement('canvas');

          canvas.classList.add('canvas-item');
          canvas.classList.add(`canvas-row-${i + 1}`);
          canvas.classList.add(`canvas-item-${j + 1}`);
          canvas.setAttribute('data-item', `${i + 1}-${j + 1}`);
          canvas.setAttribute('data-word', word);
          canvas.setAttribute('draggable', true);

          canvas.addEventListener('dragstart', () => {
            draggedItem = canvas;
            setTimeout(() => {
              //canvas.style.display = 'none';
            }, 0)
          });

          canvas.addEventListener('dragend', (e) => {
            e.preventDefault();
            setTimeout(() => {
              draggedItem.style.display = 'inline';
              draggedItem.style.marginRight = `-${Math.round((canvasHeight / 3) / 2)}px`;
              draggedItem = null;
            }, 0);
          });

          canvas.addEventListener('dblclick', (e) => {
            const parentDiv = imageContainer.querySelector(`.${e.target.parentElement.className.replace(' ', '.')}`);
            e.target.style.marginRight = `-${Math.round((canvasHeight / 3) / 2)}px`;
            parentDiv.append(e.target);
            if (!document.querySelector('.elements-puzzle').lastChild.childElementCount) {
              document.querySelector('#check').classList.remove('hidden');
              document.querySelector('#dont-know').classList.add('hidden');
            }
          })

          canvas.addEventListener('drop', (e) => {
            e.target.parentElement.insertBefore(draggedItem, e.target)
          })

          const ctx = canvas.getContext('2d');
          let canvasWidth = (word.length * onePart) + extraWidth;

          if (j === wordCount - 1) {
            canvasWidth = img.width - widthCount;
            widthCount += canvasWidth;
          } else {
            widthCount += canvasWidth;
          }

          const x1 = 0;
          const y1 = Math.round(canvasHeight / 3);
          const y2 = Math.round((canvasHeight / 3) * 2);
          const centerY = canvasHeight / 2;
          const radius = Math.round((canvasHeight / 3) / 2);
          const startXPointCropImage = widthCount - canvasWidth;
          const fontSize = Math.round(canvasHeight / 4);
          if (j !== wordCount - 1) {
            ctx.canvas.width = canvasWidth + radius;
          } else {
            ctx.canvas.width = canvasWidth;
          }
          ctx.canvas.height = canvasHeight;

          ctx.beginPath();

          if (j) {
            ctx.arc(x1, centerY, radius, Math.PI / 2, Math.PI * 1.5, true);
          }

          ctx.lineTo(0, y1);
          ctx.lineTo(0, 0);
          ctx.lineTo(canvasWidth, 0);
          ctx.lineTo(canvasWidth, y1);

          if (j !== wordCount - 1) {
            ctx.arc(canvasWidth, centerY, radius, Math.PI * 1.5, Math.PI / 2, false);
          }

          ctx.lineTo(canvasWidth, y2);
          ctx.lineTo(canvasWidth, canvasHeight);
          ctx.lineTo(0, canvasHeight);
          ctx.lineTo(0, y2);

          if (!j) {
            ctx.lineTo(0, y1);
          }

          ctx.clip();

          ctx.drawImage(img, startXPointCropImage, startYPointCropImage, canvasWidth + radius, canvasHeight, 0, 0, canvasWidth + radius, canvasHeight);

          ctx.shadowColor = colorShadowBorder;
          ctx.strokeStyle = colorBorder;
          ctx.shadowBlur = shadowPuzzle;
          ctx.lineWidth = borderPuzzle;
          ctx.stroke();
          ctx.globalCompositeOperation = 'destination-in';
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
          ctx.beginPath();
          ctx.shadowColor = colorShadowText;
          ctx.shadowBlur = shadowText;
          ctx.lineWidth = borderText;
          ctx.strokeStyle = colorText;
          ctx.font = `${fontType} ${fontSize * fontRatio}pt ${fontFamily}`;
          ctx.textAlign = 'center';
          ctx.fillStyle = solidTextColor;
          ctx[fontStyle](word, canvasWidth / 2 + radius / 2, canvasHeight / 2 + fontSize / 3);
          row.append(canvas);
        })
        startYPointCropImage += canvasHeight
        result.push(row);
      });
      resolve(result);
    };

    img.onerror = err => {
      console.log(err);
      reject(err);
    }
  })
};

function showGame() {
  logoWrap.classList.add('hidden');
  gameWrap.classList.remove('hidden');
};

/* ---------------------------------------------- Рандом данных ---------------------------------------------- */
function getRandomElement(array) {
  const index = Math.floor(Math.random() * array.length);
  return index;
};
/* ---------------------------------------------------------------------------------------------------------== */

/* --------------------------------------- Получение данных с сервера ---------------------------------------- */
async function getSentense() {
  let currentPage = null;
  if (pageGame % 2 !== 0) {
    currentPage = Math.floor(pageGame.value / 2)
  } else {
    currentPage = (pageGame.value / 2) - 1;
  }
  const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${levelGame.value - 1}&page=${currentPage}`)
  const data = await response.json();
  if (pageGame % 2 !== 0) {
    data.splice(9, 10);
  } else {
    data.splice(0, 10);
  }
  return data;
};
/* ---------------------------------------------------------------------------------------------------------== */

/* --------------------------------------- Создание новой строки пазла --------------------------------------- */
function addNewRow(className, len) {
  const row = document.createElement('div');
  row.style.height = `${(imageContainer.clientHeight /len)}px`;
  row.className = className;
  row.style.backgroundColor = '#020c97';
  row.style.display = 'block';
  row.style.textAlign = 'left';
  imageContainer.append(row);

  row.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  row.addEventListener('dragenter', (e) => {
    e.preventDefault();
  });

  row.addEventListener('drop', (e) => {
    e.target.append(draggedItem);
    if (!document.querySelector('.elements-puzzle').lastChild.childElementCount) {
      document.querySelector('#check').classList.remove('hidden');
      document.querySelector('#dont-know').classList.add('hidden');
    }
  });
};
/* ---------------------------------------------------------------------------------------------------------== */

/* ---------------------------------------- Перемещать элементы пазла ---------------------------------------- */
function movePuzzles(elements) {
  const container = document.createElement('div');
  container.className = elements.className;
  document.querySelector('.elements-puzzle').append(container);
  for (let i = 0; i !== elements.childElementCount; i) {
    const index = getRandomElement(elements.children);
    container.append(elements.children[index]);
    elements.remove(index);
  };
}
/* ---------------------------------------------------------------------------------------------------------== */

/* --------------------------------------------- Старт новой игры -------------------------------------------- */
function startNewGame() {
  if (document.querySelector('#img-puzzle').childElementCount) {
    for (let i = 0; i !== document.querySelector('#img-puzzle').childElementCount; i) {
      document.querySelector('#img-puzzle').children[i].remove();
    };
  };
  if (document.querySelector('#elements-puzzle').childElementCount) {
    for (let i = 0; i !== document.querySelector('#elements-puzzle').childElementCount; i) {
      document.querySelector('#elements-puzzle').children[i].remove();
    };
  };
  document.querySelector('#continue').classList.add('hidden');
  document.querySelector('#dont-know').classList.add('hidden');
  document.querySelector('#check').classList.add('hidden');
  document.querySelector('#results').classList.add('hidden');

  image = getRandomElement(images);
  document.querySelector('#img-puzzle').style.backgroundImage = `url('${images[image]}')`;
  const listSentense = getSentense();
  listSentense.then(data => {
    dataElements = data;
    canvasElements = createCanvasElements({
      src: `${images[image]}`,
      wordsList: data.map(item => item.textExample),
    })
    canvasElements.then(res => {
      imageContainer.style.backgroundColor = '#0465aa';
      imageContainer.style.backgroundImage = 'none';
      addNewRow(res[0].className, res.length);
      movePuzzles(res[0]);
    });
  });
  document.querySelector('#dont-know').classList.remove('hidden');
}
/* ---------------------------------------------------------------------------------------------------------== */

function changeSoundInput() {
  if (document.querySelector('#sound-input').checked) {
    document.querySelector('#sound-label').classList.add('active');
    document.querySelector('#sound').classList.remove('hidden');
  } else {
    document.querySelector('#sound-label').classList.remove('active');
    document.querySelector('#sound').classList.add('hidden');
  };
};

function changeImageInput() {
  if (document.querySelector('#image-input').checked) {
    document.querySelector('#image-label').classList.add('active');
    imageContainer.style.backgroundImage = image;

    console.log('image on');
  } else {
    document.querySelector('#image-label').classList.remove('active');
    imageContainer.style.backgroundImage = 'none';
  };
};

function changeInterpretationInput() {
  if (document.querySelector('#interpretation-input').checked) {
    document.querySelector('#interpretation-label').classList.add('active');
    const index = document.querySelector('.img-puzzle').childElementCount - 1;
    document.querySelector('#translate').innerHTML = dataElements[index].textExampleTranslate;
  } else {
    document.querySelector('#interpretation-label').classList.remove('active');
    document.querySelector('#translate').innerHTML = '';
  };
}




/* ------------------------------------------ Смена уровня сложности ----------------------------------------- */
document.querySelector('#levels').addEventListener('change', () => {
  startNewGame();
});
/* ---------------------------------------------------------------------------------------------------------== */

/* ------------------------------------------- Смена страницы игры ------------------------------------------- */
document.querySelector('#page').addEventListener('change', () => {
  startNewGame();
});
/* ---------------------------------------------------------------------------------------------------------== */

/* ---------------------------------------- Действие кнопки Start -------------------------------------------- */
document.querySelector('#button-start').addEventListener('click', () => {
  startNewGame();
  showGame();
});
/* ----------------------------------------------------------------------------------------------------------- */

/* ---------------------------------------- Действие кнопки Check -------------------------------------------- */
document.querySelector('#check').addEventListener('click', () => {
  const classCount = document.querySelector('.img-puzzle').lastChild.classList;
  let wordsList = null;
  let countErrors = 0;
  classCount.forEach(item => {
    if (item >= 'row-') {
      wordsList = dataElements[item.split('-')[1] - 1].textExample.replace(/<[^>]*>/g, '').split(' ');
    }
  })
  const puzzles = document.querySelector('.img-puzzle').lastChild.children;

  for (let i = 0; i < puzzles.length; i += 1) {
    if (puzzles[i].getAttribute('data-word') === wordsList[i]) {
      setTimeout(() => {
        puzzles[i].style.outline = '4px solid green';
      })
    } else {
      puzzles[i].style.outline = '4px solid red';
      countErrors += 1;
    }
  }
  if (countErrors === 0) {
    document.querySelector('#continue').classList.remove('hidden');
    document.querySelector('#check').classList.add('hidden');
  } else(
    document.querySelector('#dont-know').classList.remove('hidden')
  )
});
/* ----------------------------------------------------------------------------------------------------------- */

/* --------------------------------------- Действие кнопки Continue ------------------------------------------ */
document.querySelector('#continue').addEventListener('click', () => {
  canvasElements.then(res => {
    const index = document.querySelector('.img-puzzle').childElementCount;
    if (index < 10) {
      addNewRow(res[index].className, res.length)
      movePuzzles(res[index]);
      document.querySelector('#continue').classList.add('hidden');
      document.querySelector('#dont-know').classList.remove('hidden');
    } else if (pageGame.value < 60) {
      pageGame.value = parseInt(pageGame.value, 10) + 1;
      startNewGame();
    } else if (levelGame.value < 6) {
      levelGame.value = parseInt(levelGame.value, 10) + 1;
      pageGame.value = 1;
      startNewGame();
    } else {
      console.log('больше нет раундов');
    }
  });
  // document.querySelector('#continue').classList.add('hidden');
  // document.querySelector('#dont-know').classList.remove('hidden');
});
/* ----------------------------------------------------------------------------------------------------------- */

/* --------------------------------------- Действие кнопки Я не знаю ----------------------------------------- */
document.querySelector('#dont-know').addEventListener('click', () => {
  const index = document.querySelector('.img-puzzle').childElementCount - 1;
  const textExample = dataElements[index].textExample.replace(/<[^>]*>/g, '').split(' ');
  textExample.forEach((word, index) => {
    const elementsPuzzle = document.querySelector('.elements-puzzle').lastChild.childNodes;
    elementsPuzzle.forEach(element => {
      if (index === parseInt(element.getAttribute('data-item').split('-')[1], 10) - 1) {
        element.style.marginRight = `-${Math.round((canvasHeight / 3) / 2)}px`;
        document.querySelector('.img-puzzle').lastChild.append(element);
      }
    })
  })
  document.querySelector('#dont-know').classList.add('hidden');
  document.querySelector('#continue').classList.remove('hidden');
});
/* ----------------------------------------------------------------------------------------------------------- */

/* ---------------------------------- Смена режима подсказки ПРОИЗНОШЕНИЕ ------------------------------------ */
document.querySelector('#sound-label').addEventListener('click', (e) => {
  e.preventDefault();
  if (document.querySelector('#sound-input').checked) {
    document.querySelector('#sound-input').checked = false;
  } else {
    document.querySelector('#sound-input').checked = true;
  };
  changeSoundInput();
});
/* ----------------------------------------------------------------------------------------------------------- */

/* ---------------------------------- Смена режима подсказки КАРТИНКА ------------------------------------ */
document.querySelector('#image-label').addEventListener('click', (e) => {
  e.preventDefault();
  if (document.querySelector('#image-input').checked) {
    document.querySelector('#image-input').checked = false;
  } else {
    document.querySelector('#image-input').checked = true;
  };
  changeImageInput();
});
/* ----------------------------------------------------------------------------------------------------------- */

/* ------------------------------------ Смена режима подсказки ПЕРЕВОД --------------------------------------- */
document.querySelector('#interpretation-label').addEventListener('click', (e) => {
  e.preventDefault();
  if (document.querySelector('#interpretation-input').checked) {
    document.querySelector('#interpretation-input').checked = false;
  } else {
    document.querySelector('#interpretation-input').checked = true;
  };
  changeInterpretationInput();
});
/* ----------------------------------------------------------------------------------------------------------- */