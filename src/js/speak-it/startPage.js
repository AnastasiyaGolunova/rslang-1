import {app} from "./getData";
import {getData} from "./getData";

const btn = document.querySelector('.start');
let arr = [];

btn.addEventListener('click', async () => {
    arr = await getData();
    app(arr);
    document.querySelector('.wrap').classList.add('block');
    document.querySelector('.wrap_game').classList.remove('wrap_game');
})

export {arr}


