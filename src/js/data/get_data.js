function getData(a,b) {
  const URL = `https://afternoon-falls-25894.herokuapp.com/words?page=${b}&group=${a}`;
  return fetch(URL)
    .then((res) => res.json());
}

let easy = {
  words: [],
  translate: []
}

let medium = {
  words: [],
  translate: []
}
let hard = {
  words: [],
  translate: []
}

async function getWords(obj) {
  let startPage;
  let endPage;
  obj == easy ? [startPage, endPage] = [0, 1] : 
  obj == medium ? [startPage, endPage] = [2, 3] : [startPage, endPage] = [4, 5]
  for(let a = startPage ; a <= endPage ; a ++) {
    for(let b = 0 ; b < 5  ; b ++) {
      const data = await getData(a, b);
      for ( let i = 0 ; i < data.length ; i ++) {
      obj.translate.push(data[i].wordTranslate)
      obj.words.push(data[i].word)
      }
    }
  }
  console.log(easy,medium,hard)
}

getWords(easy)
getWords(medium)
getWords(hard)


export {easy, medium, hard}