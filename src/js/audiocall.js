const urlApi = 'https://afternoon-falls-25894.herokuapp.com/words';
const main = document.querySelector('#main');
let audio = {
    correct: new Audio(''),
    errors: new Audio(''),
    success: new Audio(''),
    failure: new Audio(''),
};
function getData(){
    let url = `${urlApi}?page=${getRandomInt(31)}`;
    fetch(url)
    .then((response) => {
        let images = response.json();
        return images;
    })
    .then((images) => {
        console.log(images);
    }); 
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
getData();

