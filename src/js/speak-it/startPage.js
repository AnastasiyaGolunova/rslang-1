'use strict';

const btn = document.querySelector('.start');

btn.addEventListener('click', function () {
    document.querySelector('.wrap').classList.add('block');
    document.querySelector('.wrap_game').classList.remove('wrap_game');
})
