'use strict';

const resBtn = document.querySelector('results');

resBtn.addEventListener('click', function () {
    document.querySelector('.wrap_wrap').classList.add('block');
    document.querySelector('.statistic-wrap').classList.remove('statistic-wrap');
});
