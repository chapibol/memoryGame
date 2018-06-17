HELP: https: //www.youtube.com/watch?v=oECVwum-7Zc

  // * Create a list that holds all of your cards


  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

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
console.log(allCards);

// Main part where function is kicked off for each element
for (i = 0; i < allCards.length; i++) {
  allCards[i].addEventListener('click', toggleAndAddCard);
}
// *  - display the card's symbol (put this functionality in another function that you call from this one)
// *  - Only push max of 2 cards on to openCards array
function toggleAndAddCard() {
  const targetEvent = event.target;
  if (targetEvent.classList.contains('card') && openCards.length < 2) {
    console.log("A card was clicked.")
    displaySymbol(targetEvent);
    addCardToOpenCards(targetEvent);
    if (openCards.length === 2) {
      console.log("2 cards");
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
    console.log(openCards)
  }
}

// *  - if the list already has another card, check to see if the two cards match
function checkMatch() {
  console.log(openCards.length);
  const firstCardClass = openCards[0].firstElementChild.className;
  const secondCardClass = openCards[1].firstElementChild.className;
  console.log(firstCardClass + "and" + secondCardClass);
  if (firstCardClass === secondCardClass) {
    doMatch();
  } else {
    setTimeout(removeCards(),2000);
  }
  moveCount();
}

// *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function doMatch() {
    console.log("The two cards match");
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    // Reset open card array so it includes a new pair of cards
    openCards = [];
}
// *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function removeCards() {
  console.log("The cards do not match");
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
// *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
