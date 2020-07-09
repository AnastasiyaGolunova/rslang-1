'use strict';

const resBtn = document.querySelector('result');

resBtn.addEventListener('click', function () {
    document.querySelector('.wrap_wrap').classList.add('wrap_game');
    document.querySelector('.statistic-wrap').classList.remove('statistic-wrap');
});
