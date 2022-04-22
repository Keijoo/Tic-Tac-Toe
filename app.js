// These are the HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
const gamemodeDiv = document.querySelector('.gamemode')
// These are the game constants
const xSymbol = '×';
const oSymbol = '○';

// These are the game variables
let gameIsLive = false;
let xIsNext = true;
let singleplayer = true;

// this is the function of the game
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol; //this converts the x/o symbol to it's counterpart
const handleWin = (letter) => { //this handles the game if the user has won
  gameIsLive = false; //this ends the game if there's a winner
  if (letter === 'x') {
    statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`; //if the game is played and the symbol won, the letter is displayed
  } else {
    statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
  }
};

const checkGameStatus = () => { //this function gets invoked everytime a tile is clicked
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];
// this checks if there's an x or an o in each cell divs

  // this checks winner if there's a winner
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft); //this checks if the top horizontal cels contain the winning condition
    cellDivs[0].classList.add('won');
    cellDivs[1].classList.add('won');
    cellDivs[2].classList.add('won');
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    handleWin(middleLeft); //this checks if the middle horizontal cells contain the winning condition
    cellDivs[3].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[5].classList.add('won');
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    handleWin(bottomLeft); //this checks if the bottom horizontal cells contain the winning condition
    cellDivs[6].classList.add('won');
    cellDivs[7].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft); //this checks if the virticle left cells contain the winning condition
    cellDivs[0].classList.add('won');
    cellDivs[3].classList.add('won');
    cellDivs[6].classList.add('won');
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    handleWin(topMiddle); //this checks if the middle virticle cells contain the winning condition
    cellDivs[1].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[7].classList.add('won');
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight); //this checks if the virticle right cells contain the winning condition
    cellDivs[2].classList.add('won');
    cellDivs[5].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft); //this checks if the diagonal cells from top left to bottom right contains the winning condition
    cellDivs[0].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight); //this checks if the diagonal cells from bottom left to top right contains the winning condition
    cellDivs[2].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[6].classList.add('won');
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    gameIsLive = false; //this ends the game if there's a tie or no winner
    statusDiv.innerHTML = 'Game is tied!';
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${xSymbol} is next`; //this updates the html to display x's turn
    } else {
      statusDiv.innerHTML = `<span>${oSymbol} is next</span>`; //this updates the html to display o's turn
    }
  }
};
// This is the event Handlers
const handleReset = () => {
  xIsNext = true; //this makes it so the first person to play is x
  statusDiv.innerHTML = `${xSymbol} is next`;
  resetDiv.innerHTML = `Reset`;
  for (const cellDiv of cellDivs) { //this loops through all of the cells and removes the class if contains x or o
    cellDiv.classList.remove('x');
    cellDiv.classList.remove('o');
    cellDiv.classList.remove('won');
  }
  gameIsLive = true;
if (singleplayer){
  aiMove();
}
};

const handleGamemode = () => {
if (!gameIsLive) { //this makes sure if the game is already running
  singleplayer = !singleplayer; //this toggles the gamemode
  if (singleplayer) {
    gamemodeDiv.innerHTML = `Singleplayer`;
  }
  else {
    gamemodeDiv.innerHTML = `Multiplayer`;
  }
  }
}

const handleCellClick = (e) => {
  const classList = e.target.classList; //this targets the first index class within the element
  if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') { //this is the check if the classlist has the varibles x or o
    return; //if the class list contains varibles, do nothing
  }
  if (xIsNext) {
    classList.add('x'); //this adds the X class inside the element
    checkGameStatus(); //this ejects the game status
  } else {
    classList.add('o'); //if the first condition is met, this instead adds an o
    checkGameStatus();
  }
  if (gameIsLive){
    if (singleplayer){
      aiMove();
    }
  }
};
//this is the ai's move
function aiMove () {
  const move = aiLogic();
  const classList = cellDivs[move].classList;
  classList.add('x');
  checkGameStatus();
}
//this is the ai logic
function aiLogic () {
 var aimove = -1; //this assings a placeholder value for the loop
 while (aimove == -1) {
   var rand = Math.floor(Math.random()*9) // this generates a random integer between 0-8
   var classList = cellDivs[rand].classList;
   if (!(classList[1] === 'x' || classList[1] === 'o')){
     aimove = rand;
   }
 }
 return aimove;
}
// event listeners
resetDiv.addEventListener('click', handleReset); //this innitiats the game reset

gamemodeDiv.addEventListener('click', handleGamemode);

for (const cellDiv of cellDivs) { //this loops for all of the cell divs which then stores the elements inside the div varible
  cellDiv.addEventListener('click', handleCellClick)
}
