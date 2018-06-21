HELP: https: //www.youtube.com/watch?v=oECVwum-7Zc

  // * Create a list that holds all of your cards


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function randomDeck() {
  const list = document.querySelector('.deck');
  const shufDeck = shuffle(Array.from(document.querySelectorAll('.card')));
  // console.log(shufDeck);
  for (i = 0; i < shufDeck.length; i++) {
    list.appendChild(shufDeck[i]);
  }
  // console.log(list);
  const doc = list.getElementsByClassName("show");
  const docArray = Array.from(doc);
  console.log(doc.length)
  if (docArray.length > 0){
    for (i = 0; i < docArray.length; i++){
      docArray[i].classList.toggle("show");
      docArray[i].classList.toggle("open");
      docArray[i].classList.remove("match");
    }
  }
  //Resets move counter
  const moveCounts = document.querySelector('.moves');
  moveCountNum = Number(moveCounts.innerHTML);
  moveCounts.innerHTML = 0;
  time = 0;
}
randomDeck();

//Restart button

const restart = document.querySelector('.restart');

restart.addEventListener('click', randomDeck)

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



// * set up the event listener for a card. If a card is clicked:
const allCards = document.querySelectorAll('.card');
// console.log(allCards);

// Main part where function is kicked off for each element
for (i = 0; i < allCards.length; i++) {
  allCards[i].addEventListener('click', toggleAndAddCard);
}
// *  - display the card's symbol (put this functionality in another function that you call from this one)
// *  - Only push max of 2 cards on to openCards array
function toggleAndAddCard() {
  const targetEvent = event.target;
  if (targetEvent.classList.contains('card') && openCards.length < 2 && !targetEvent.classList.contains('show')) {
    // console.log("A card was clicked.")
    displaySymbol(targetEvent);
    addCardToOpenCards(targetEvent);
    if (openCards.length === 2) {
      // console.log("2 cards");
      checkMatch();
    }
  }
}

function displaySymbol(event) {
  event.classList.toggle('show');
  event.classList.toggle('open');
}
// *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
let openCards = [];

function addCardToOpenCards(event) {
  if (event.classList.contains('open')) {
    openCards.push(event);
    // console.log(openCards)
  }
}

// *  - if the list already has another card, check to see if the two cards match
function checkMatch() {
  // console.log(openCards.length);
  const firstCardClass = openCards[0].firstElementChild.className;
  const secondCardClass = openCards[1].firstElementChild.className;
  // console.log(firstCardClass + "and" + secondCardClass);
  if (firstCardClass === secondCardClass) {
    doMatch();
  } else {
    removeCards();
  }
  moveCount();
  starCount();
}

// *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function doMatch() {
  // console.log("The two cards match");
  openCards[0].classList.toggle('match');
  openCards[1].classList.toggle('match');
  // Reset open card array so it includes a new pair of cards
  openCards = [];
}
// *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function removeCards() {
  // console.log("The cards do not match");
  displaySymbol(openCards[0]);
  displaySymbol(openCards[1]);
  // Reset open card array so it includes a new pair of cards
  openCards = [];
}
// *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function moveCount() {
  const moveCount = document.querySelector('.moves');
  moveCountNum = Number(moveCount.innerHTML);
  moveCountNum++;
  moveCount.innerHTML = moveCountNum;
}

//Adjusts the star counter
function starCount() {
  if (moveCountNum === 15 || moveCountNum === 25) {
    removeStar();
  }
}
//Remove a star
function removeStar() {
  const stars = document.querySelectorAll('.fa-star')
  for (i = 0; i < stars.length; i++) {
    if (stars[i].style.display !== 'none') {
      stars[i].style.display = 'none';
      break;
    }
  }
}

//timer
time = 1;

function startTimer() {
  let clock = setInterval(() => {
    showTime();
    time++;
    console.log(time);
  }, 1000);

}
startTimer();

function showTime(){
  const timer = document.querySelector('.timer');
  const min = Math.floor(time / 60);
  const sec = time % 60;
  if (sec < 10){
    timer.innerHTML = min + ":0" + sec;
  }
  else{
    timer.innerHTML = min + ":" + sec;
  }
}

// *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
