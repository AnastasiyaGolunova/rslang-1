'use strict';

const btn = document.querySelector('.start');
let arr = [];

btn.addEventListener('click', async () => {
    arr = await getData();
    app(arr);
    console.log(arr);
    document.querySelector('.wrap').classList.add('block');
    document.querySelector('.wrap_game').classList.remove('wrap_game');

})
console.log(arr);

