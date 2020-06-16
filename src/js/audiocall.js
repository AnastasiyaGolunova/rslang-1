const urlApi = 'https://afternoon-falls-25894.herokuapp.com/words';
const main = document.querySelector('#main');
let audio = {
    correct: new Audio(''),
    errors: new Audio(''),
    success: new Audio(''),
    failure: new Audio(''),
};
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
function getData(){
    let url = `${urlApi}?page=${getRandomInt(31)}`;
    fetch(url)
    .then((response) => {
        let data = response.json();
        return data;
    })
    .then((data) => {
        console.log(data);
    }); 
}

getData();

