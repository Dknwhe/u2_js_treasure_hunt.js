//  Detect a fully-loaded page.
window.addEventListener("load", function() {
  init();
});

/**
 * @param {object} [chest1] - contain img
 * @param {object} [chest2] - contain img
 * @param {object} [chest3] - contain img
 * @param {number} [score] - count score
 * @param {string} [image] - holds photo from pexel 
 */

var chest1 = document.createElement("img");
var chest2 = document.createElement("img");
var chest3 = document.createElement("img");
var score = 0; 
var image = "";

/** 
*@description [function] - init() - that initiates the whole Game application.
*/

function init() {
  initGameUI();
}

// Call functions that creates the Game UI.
function initGameUI() {
  initChests();
  initScoreBoard();
  initRefreshButton();
  initChestEventListeners();
  getImageFromPexels();
}

/**
 * @description Putting 3 image inside div(img)
 * @param {object} [function] -initChests() - visible chest 
 */

function initChests() {
  chest1.setAttribute("src", "images/chest-closed.png");
  chest2.setAttribute("src", "images/chest-closed.png");
  chest3.setAttribute("src", "images/chest-closed.png");
  
  document.getElementById("chests").appendChild(chest1);
  document.getElementById("chests").appendChild(chest2);
  document.getElementById("chests").appendChild(chest3);
  chest1.style.margin = "10px";
  chest3.style.margin = "10px";
}

/**
 * @description Creating a Element tag h2, and giving a text that counting the score.
 * @param {object} [function] - initScoreBoard(); - visible text score.  
 */

function initScoreBoard() {
  var board = document.getElementById("game-wrapper");
  var header = document.createElement("h2");

  header.getElementsByTagName("h2");
  let para = document.createElement("p");

  para.setAttribute("id", "score");
  para.textContent = "Score: " + score;
  para.setAttribute("style", ("text-align: center; color: #f4f4f4;"));

  board.appendChild(header);
  header.appendChild(para);
 
  // Du vill har score under "chests div" och ovanför button. Lyckades göra det som videon. Men lyckades inte göra enligt index.html
  // Man kan köra  document.getElementById("refresh-button").before(header); då blir index.html rätt men videon uppläggning blir fel.
}

/**
 * @description Adds a eventListerner to make the "Try Again! button refresh.
 * @param {object} [function] - initRefreshButton(); - Refresh chest, after pick.
 */

function initRefreshButton() {
  var btn = document.getElementById("refresh-button");
  btn.addEventListener("click", refresh);
}

/**
 * @description Adds eventlisterners on the chests.
 * @param {object} [function] initChestEventListerners(); - Click on chest
 */

function initChestEventListeners() {
  chest1.addEventListener("click", callOne);
  chest2.addEventListener("click", callTwo);
  chest3.addEventListener("click", callThr);
 }

 /**
  * @description Pick random number chest between 1-3. If pick right, 
  * a picture from pexel will show up and score.
  * If wrong, it will open a empty chest. And "click" will disable. 
  * @param {object} [function] - chestClicked(e); - e - target the eventlistener "click" 1,2,3.
  */

function chestClicked(e) {
  var random = Math.floor(Math.random()*3+1);
  var chest = document.getElementById("score");

  if (e == 1) {
    if (random == 3) {
      chest1.setAttribute("src", image);
      score += 5;
      chest.innerText = "Score: " + score;
      getImageFromPexels();

    }else {
      chest1.setAttribute("src", "images/chest-open.png");
      chest.innerText = "Score: " + score;
    }

  }else if (e == 2) {
    if (random == 3) {
      chest2.setAttribute("src", image);
      score += 5;
      chest.innerText = "Score: " + score;
      getImageFromPexels();

    }else {
      chest2.setAttribute("src", "images/chest-open.png");
      chest.innerText = "Score: " + score;
    }

  }else if (e == 3) {
    if (random == 3) {
      chest3.setAttribute("src", image);
      score += 5;
      chest.innerText = "Score: " + score;
      getImageFromPexels();
    
    }else {
      chest3.setAttribute("src", "images/chest-open.png");
      chest3.innerText= "Score: " + score;
    }
  }
  removeChestEvents();
}

/**
 * @description A random photo fom Pexel.
 *  Make a request towards pexels API and get 1 Diamond image.
 * @param {object} [function] - getImageFromPexels(); - Acces from a website.
 */

function getImageFromPexels() {
    // (e.g. "Photos provided by Pexels")
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.pexels.com/v1/search?query=treasure+query&per_page=15&page=1', true);
    xhr.setRequestHeader('Authorization', '563492ad6f91700001000001c5238c09a6ef4bd3ad842d52f61bf053');
    xhr.addEventListener('load', function(){
      if (xhr.readyState == 4 && xhr.status == "200") {
        var pictures = JSON.parse(xhr.responseText);
        var random = Math.floor(Math.random() * 5+1); 
         image = pictures.photos[random].src.small;
      }
    });
    xhr.send();
    
  }
 
/**
 * @description Reset the game, score will not be reset.
 * @param {object} [function] - refresh(); - All chests will close.
 */

function refresh() {
  chest1.setAttribute("src", "images/chest-closed.png");
  chest2.setAttribute("src", "images/chest-closed.png");
  chest3.setAttribute("src", "images/chest-closed.png");
  initChestEventListeners()
}

/**
 * @description Remove chests eventlisteners after "click".
 * @param {object} [function] - removeChestEvents(); - disable "click".
 */

function removeChestEvents(){
  chest1.removeEventListener("click", callOne);
  chest2.removeEventListener("click", callTwo);
  chest3.removeEventListener("click", callThr);
}

/**
 * @description Call function chestClicked();
 * @param {object} [function] - callOne - call click 
 * @param {object} [function] - callTwo - call click 
 * @param {object} [function] - callThr - call click
 */

function callOne() {
  chestClicked(1);
 };

 function callTwo() {
  chestClicked(2);
 };

 function callThr() {
   chestClicked(3);
 };

// function one(one){
//   let result = two(one, 2);
//   return result;
// }
// function two(one,two){
//   result = three(one, two);
//   return result;
// }
// function three(one, two){
//   return one+two;
// }
// let val = one(1);
// console.log(one);

