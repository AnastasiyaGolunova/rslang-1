import './components/about_page'
import './components/swiper';

import '../css/swiper-bundle.min.css';
import '../css/style.css';
import '../css/sprint.css';
import '../css/about.css';


























// import { createTimer } from './components/timer'

// import { gamePageInit } from './components/game_page'
// import { statisticsPageInit } from './components/statistics_page'

// document.querySelector('.start-btn').addEventListener('click', ()=>{
//   document.querySelector('.start-page').classList.add('hidden');
//   gamePageInit()
//   createTimer(document.querySelector('.game-page__header'));
//   statisticsPageInit()
//   console.log("HELLO")
// })

// document.addEventListener('click', (e)=> {
//   let startPage = document.querySelector('.start-page')
//   let gamePage = document.querySelector('.game-page')
//   let statisticsPage = document.querySelector('.statistics-page');


//   if(e.target === document.querySelector('.return-btn')) {
//     console.log('refresh')
//     gamePage.remove()
//     statisticsPage.remove()
//     startPage.classList.remove('hidden')
//   }
// })


// localStorage.setItem('userId', '5f08bf2f76893e0017ec9809')
// localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDhiZjJmNzY4OTNlMDAxN2VjOTgwOSIsImlhdCI6MTU5NDQwOTE4NSwiZXhwIjoxNTk0NDIzNTg1fQ.KZsGPBnaMx_IZ60DgORRkcuxw4OYrIsIdowxsO3VTfo')
// const urlHeroku = 'https://afternoon-falls-25894.herokuapp.com'
//   // {
// //   "message": "Authenticated",
// //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDhiZjJmNzY4OTNlMDAxN2VjOTgwOSIsImlhdCI6MTU5NDQwOTE4NSwiZXhwIjoxNTk0NDIzNTg1fQ.KZsGPBnaMx_IZ60DgORRkcuxw4OYrIsIdowxsO3VTfo",
// //   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDhiZjJmNzY4OTNlMDAxN2VjOTgwOSIsInRva2VuSWQiOiI5NTQxZTZlNy1lOGVlLTQ0MDItYTZmZC0wOGM3ZmU4ZDAwMWQiLCJpYXQiOjE1OTQ0MDkxODUsImV4cCI6MTU5NDQyNTM4NX0.rphosPGr5aTaV7icgmOlplXfG7lfd1exWQqfy1FSw_I",
// //   "userId": "5f08bf2f76893e0017ec9809"
// // }


// async function response(rawResponse) {
//   if (!rawResponse.ok)  {
//     // if (rawResponse.status === 401) {
//     //   console.log()
//     // }
//     const data = await rawResponse.text();
//     console.log(data);
//     return null;
//   } else {
//     const content = await rawResponse.json();
//     return content;
//   }
// }

// async function getAgregateWords({ userId, group, wordsPerPage, filter }){
//   const filterUrl = `${encodeURIComponent(filter)}`;
//   const token = localStorage.getItem('token');
//   const rawResponse = await fetch(`${urlHeroku}/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${filterUrl}`,
//       {
//           method: "GET",
//           withCredentials: true,
//           headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//           },
//       }
//   );

//   return await response(rawResponse);
// };


// async function getLearnWords(value) {
//   const userId = localStorage.getItem('userId');
//   const agregateWords = {
//     "userId": `${userId}`,
//     "group": "",
//     "wordsPerPage": value,
//     "filter": `{"userWord.difficulty":"hard"}`,
//   }

//   const newWords = await getAgregateWords(agregateWords);
//   console.log('getLearnWords' + newWords);
//   return newWords;
// }

// getLearnWords(5)
//   .then(res => console.log(res))
// // async function aaa() {
// //   let a = await getLearnWords(10)
// // }
// // aaa()



// //createTimer(document.querySelector('.game-page'))