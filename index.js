
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

const titlePage = (()=>{

  //Avatar Selection (Arrow Buttons)
  const switchButtons = document.querySelectorAll("[data-avatarSwitch-button]");
  switchButtons.forEach(button =>{
    button.addEventListener("click", () =>{
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
  startBtn.addEventListener("click", ()=>{
    const titlePage = document.querySelector(".title-page");
    const gameBoard = document.querySelector(".game-page");
    helperFunction.switchPage(titlePage, gameBoard);
  })

})();