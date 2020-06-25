'use strict';

async function getTranslation(word) {
    const key = 'key=trnsl.1.1.20200422T112420Z.21d1ab1c5e9b39a9.1a549f13f07ddd2a6f64be33f539c32ee3190acc'
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?${key}&text=${word}&lang=en-ru`;
    const res = await fetch(url);
    const data = await res.json();
    return data.text[0];
}