import {getData, app, cardsWrap} from "./getData";

const btn = document.querySelector('.start');
let arr = [];

btn.addEventListener('click', async () => {
    console.log(await getData());
    console.log(arr);
    arr = await getData();
    app(arr);
    document.querySelector('.wrap').classList.add('block');
    document.querySelector('.wrap_game').classList.remove('wrap_game');

})

async function change(){
    console.log(arr);
    cardsWrap.innerHTML = '';
    arr = await getData();
    app(arr);
}

export {arr, change}



