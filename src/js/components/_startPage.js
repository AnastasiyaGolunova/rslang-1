//start page creation

const startPage = document.createElement("div");
startPage.classList.add("page-wrapper");

startPage.innerHTML = `<div class="start-page">
<h2 class="header-block">Savannah</h2>
<div class="body-block"><p>The Savannah training helps you build your vocabulary. <br> The more words you know, the more experience
points
you'll get.</p></div>
<img class="game-icon" src="img/savannah-icon.svg"></img>
<div class="button-wrapper">
<button class="start-btn">start</button>
</div>
</div>`;
document.body.prepend(startPage);
