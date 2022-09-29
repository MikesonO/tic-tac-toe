//Helper Functions
const helperFunction = (() => {
  const switchPage = (currentPage, newPage) => {
    currentPage.style.display = "none";
    newPage.style.display = "flex";
  };

  return {
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

  const playerOne = Player("X");
  const playerTwo = Player("O");
  let playerOneTurn = true;


  const cellElements = document.querySelectorAll("[data-cell]");

  cellElements.forEach(cell => {
    cell.addEventListener("click", selectedCell, {
      once: true
    })
  })

  //Gets the selected cell
  function selectedCell(event) {
    const cell = event.target
    if (playerOneTurn == true) {
      placeMarker(cell, playerOne);
      switchTurn();
      changeColor(playerOneTurn);
    } else if (playerOneTurn == false) {
      placeMarker(cell, playerTwo);
      switchTurn();
      changeColor(playerOneTurn);

    }
  }

  //Places Marker on selected Cell
  function placeMarker(cell, player){
    if (player == playerOne){
    cell.textContent = "X";

    } else if (player == playerTwo){
      cell.textContent = "O";
    }
  }

  //Switches the turn
  function switchTurn(){
    playerOneTurn = !playerOneTurn;
    console.log(playerOneTurn);
  }


  //Changes Avatar and Name color based on turn
  function changeColor(playerOneTurn){
  const player1Avatar = document.querySelector(".player1-avatar");
  const player2Avatar = document.querySelector(".player2-avatar");
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




})();