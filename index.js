//Helper Functions
const helperFunction = (() => {
  const switchPage = (currentPage, newPage) => {
    currentPage.style.display = "none";
    newPage.style.display = "flex";
  };

  const displayModal = (modal) =>{
    modal.style.display = "flex";
  }

  const removeModal = (modal) =>{
    window.setTimeout(()=>modal.style.display = "none", 1000);
  }

  const removeActiveClass = (element) =>{
    element.classList.remove("active");
  }

  return {
    removeActiveClass,
    displayModal,
    removeModal,
    switchPage
  }

})();

const titlePage = (() => {

  //Avatar Selection (Arrow Buttons)
  const switchButtons = document.querySelectorAll("[data-avatarSwitch-button]");
  switchButtons.forEach(button => {
    button.addEventListener("click", () => {
      const offset = button.dataset.avatarswitchButton == "next" ? 1 : -1;
      const slides = button.closest("[data-avatars]").querySelector("[data-slides]")

      const activeSlide = slides.querySelector("[data-active]");
      let newIndex = [...slides.children].indexOf(activeSlide) + offset
      if (newIndex < 0) newIndex = slides.children.length - 1
      if (newIndex >= slides.children.length) newIndex = 0

      slides.children[newIndex].dataset.active = true
      delete activeSlide.dataset.active

      const selectedPlayer1Avatar = document.querySelector(".player1 [data-active] img").getAttribute("src");
      const selectedPlayer2Avatar = document.querySelector(".player2 [data-active] img").getAttribute("src");
      let player1Avatar = document.querySelector(".player1-avatar");
      let player2Avatar = document.querySelector(".player2-avatar");
      player1Avatar.src = selectedPlayer1Avatar;
      player2Avatar.src = selectedPlayer2Avatar;
    })
  })

  //Player Name Input
  const playerOneInput = document.querySelector("#p1-name");
  playerOneInput.addEventListener("change", () => {
    playerOneName.textContent += playerOneInput.value;
  });

  const playerTwoInput = document.querySelector("#p2-name");
  playerTwoInput.addEventListener("change", () => {
    playerTwoName.textContent += playerTwoInput.value;
  });

  const playerOneName = document.querySelector("#player1-name");
  const playerTwoName = document.querySelector("#player2-name");



  //Start Button
  const startBtn = document.querySelector("#start-btn")
  startBtn.addEventListener("click", () => {
    if (playerOneName.textContent == "" || playerOneName.textContent.trim().length == 0) {
      playerOneName.textContent = "Player 1";
    }
    if (playerTwoName.textContent == "" || playerTwoName.textContent.trim().length == 0) {
      playerTwoName.textContent = "Player 2";
    }
    const titlePage = document.querySelector(".title-page");
    const gameBoard = document.querySelector(".game-page");
    helperFunction.switchPage(titlePage, gameBoard);
  })

  return{
    playerOneName,
    playerTwoName
  }

})();


const gamePage = (() => {

  // Player Factory Function
  const Player = (marker) => {
    return {
      marker
    };
  }

  //Private Variables
  const playerOne = Player("X");
  const playerTwo = Player("O");
  const player1Avatar = document.querySelector(".player1-avatar");
  const player2Avatar = document.querySelector(".player2-avatar");
  let playerOneTurn = true;
  const cellElements = document.querySelectorAll("[data-cell]");
  const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  const player1Score = document.querySelector("#player1-score");
  const player2Score = document.querySelector("#player2-score");
  let player1CurrentScore = 0;
  let player2CurrentScore = 0;
  const roundText = document.getElementById("round");
  let currentRound = 0;
  const winModal = document.querySelector(".winner-modal");
  const winAvatar = document.querySelector(".winner-avatar");
  const winText = document.querySelector("[data-winner-text]");
  const drawModal = document.querySelector(".draw-modal");
  const winContinueBtn = document.getElementById("winner-btn");
  const drawContinueBtn = document.getElementById("draw-btn");

  //Starts the Game
  function startGame(){
  cellElements.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", selectedCell, {
      once: true
    })
  })
  helperFunction.removeActiveClass(winModal);
  helperFunction.removeModal(winModal);
  helperFunction.removeActiveClass(drawModal);
  helperFunction.removeModal(drawModal);
  currentRound++;
  roundText.textContent = `Round: ${currentRound}`;
}

startGame();

  winContinueBtn.addEventListener("click", ()=>{
    if(playerOneTurn == true){
      switchTurn(playerOneTurn);
    } else if(playerOneTurn == false){
      switchTurn(playerOneTurn);
    }
    changeColor(playerOneTurn);
    startGame();
  });

  drawContinueBtn.addEventListener("click", ()=>{
      if(playerOneTurn == true){
        switchTurn(playerOneTurn);
      } else if(playerOneTurn == false){
        switchTurn(playerOneTurn);
      }
      changeColor(playerOneTurn);
      startGame();
  });

  //Gets the selected cell
  function selectedCell(event) {
    const cell = event.target
    if (playerOneTurn == true) {
      placeMarker(cell, playerOne);
      if(checkForWin(playerOneTurn)){
        player1CurrentScore++;
        player1Score.textContent = `Score: ${player1CurrentScore}`;
        endGame(false);
        console.log("Player1 Wins!");
      } else if(checkForDraw()){
        endGame(true);
      } else{
      switchTurn();
      changeColor(playerOneTurn);
      }
    } else if (playerOneTurn == false) {
      placeMarker(cell, playerTwo);
      if(checkForWin(playerOneTurn)){
        player2CurrentScore++;
        player2Score.textContent = `Score: ${player2CurrentScore}`;
        endGame(false);
        console.log("Player2 Wins!");
      } else if(checkForDraw()){
          endGame(true);
      } else{
      switchTurn();
      changeColor(playerOneTurn);
    }
    }
  }

  //Places Marker on selected Cell
  function placeMarker(cell, player){
    if (player == playerOne){
    cell.textContent = "X";
    cell.classList.add("appear");

    } else if (player == playerTwo){
      cell.textContent = "O";
      cell.classList.add("appear");
    }
  }

  //Checks to see which player wins
  function checkForWin(playerOneTurn){
    if (playerOneTurn == true){
    return winningConditions.some(condition =>{
      return condition.every(index =>{
        return cellElements[index].textContent == "X"
      })
    })
  } else if (playerOneTurn == false){
    return winningConditions.some(condition =>{
      return condition.every(index =>{
        return cellElements[index].textContent == "O";
      })
    })
  }
  }

  //Checks to see if each Cell has a Marker
  function checkForDraw(){
    return [...cellElements].every(cell => {
      return cell.textContent == "X" || cell.textContent == "O";
    })
  }

  //Switches the turn
  function switchTurn(){
    playerOneTurn = !playerOneTurn;
  }


  //Changes Avatar and Name color based on turn
  function changeColor(playerOneTurn){
  const player1Name = titlePage.playerOneName;
  const player2Name = titlePage.playerTwoName;
  
    if (playerOneTurn == true){
      player1Name.classList.add("active");
      player1Avatar.classList.add("active");
      player2Avatar.classList.remove("active");
      player2Name.classList.remove("active");
    }
    if (playerOneTurn == false){
      player2Name.classList.add("active");
      player2Avatar.classList.add("active");
      player1Name.classList.remove("active");
      player1Avatar.classList.remove("active");
    }
  }

  changeColor(playerOneTurn);

  function endGame (draw){
    if (draw){
      console.log("draw!");
      helperFunction.displayModal(drawModal);
      drawModal.classList.add("active");
    } else{
      if(playerOneTurn == true){
      winAvatar.setAttribute("src",player1Avatar.getAttribute("src"))
      winText.textContent="Player 1 wins!"
      } else if (playerOneTurn == false){
        winAvatar.setAttribute("src",player2Avatar.getAttribute("src"))
        winText.textContent="Player 2 wins!"
      }
      helperFunction.displayModal(winModal);
      winModal.classList.add("active");
    }
     //Prevents Cell from being clicked
     cellElements.forEach(cell =>{
      cell.removeEventListener("click",selectedCell);
    })
  }




})();