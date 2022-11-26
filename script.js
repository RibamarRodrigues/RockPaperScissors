const choises = document.querySelector(".choises")
const jokenpoScreen = document.querySelector(".jokenpo")
const choiseBtn = Array.from(choises.children)
const scorePoints = document.querySelector(".points")
const openRules = document.querySelector(".rules-btn")
const closeRules = document.querySelector(".close-rules")
const rules = document.querySelector(".rules-img")
const overlay = document.querySelector(".overlay")

openRules.addEventListener("click", ()=>{
    rules.classList.add("show")
    overlay.classList.add("show")
})
closeRules.addEventListener("click", ()=>{
    rules.classList.remove("show")
    overlay.classList.remove("show")
})

choiseBtn.forEach((choise) => {
    choise.addEventListener("click", jokenpo)
})


let score = localStorage.getItem('scorePoints') || 0
scorePoints.innerText = localStorage.getItem('scorePoints') || 0

function jokenpo(event) {
    const rps = ["rock", "paper", "scissors"]
    let house = rps[Math.floor(Math.random()*3)]
    let player = event.target.className

    choises.style.display = "none"
    jokenpoScreen.style.display = "grid"

    //Player choise in jokenpo div
    const playerPicked = document.createElement('h1')
    playerPicked.innerText = "YOU PICKED"
    const playerBtn = document.createElement('button')
    playerBtn.className = `${player} click`
    jokenpoScreen.appendChild(playerPicked)
    jokenpoScreen.appendChild(playerBtn)

    //House choise in jokenpo div
    const housePicked = document.createElement('h1')
    housePicked.innerText = "THE HOUSE PICKED"
    const houseBtn = document.createElement('button')
    houseBtn.className = `${house} click`
    jokenpoScreen.appendChild(housePicked)
    jokenpoScreen.appendChild(houseBtn)

    houseBtn.style.opacity = 0
    endGame(player, house, playerBtn, houseBtn)
    //Remove id animation
    choiseBtn.forEach((choise) => {
        choise.removeAttribute("id")
    })
}

const combinations = {
    rock: {
        win: "scissors",
        draw: "rock",
        lose: "paper"
    },
    paper: {
        win: "rock",
        draw: "paper",
        lose: "scissors"
    },
    scissors: {
        win: "paper",
        draw: "scissors",
        lose: "rock"
    }
}


function endGame(player, house, playerBtn, houseBtn){
    //Create div, h1 and button play again
    const divEnd = document.createElement('div')
    const text = document.createElement('h1')
    const playAgain = document.createElement('button')
    playAgain.innerText = "Play Again"
    playAgain.className = "play-again"
    playAgain.addEventListener("click", reset)    

    if(combinations[player].win == house) {
        text.innerText = "YOU WIN"
        score ++
        if (screen.width > 600) {
            setTimeout(()=>{
                playerBtn.classList.add("win")
            }, 1000)
        }
    } else if (combinations[player].lose == house) {
        text.innerText = "YOU LOSE"
        score --
        if (screen.width > 600) {
            setTimeout(()=>{
                houseBtn.classList.add("win")
            }, 1000)
        }
    } else {
        text.innerText = "DRAW"
    }

    if (score < 0) score = 0

    divEnd.appendChild(text)
    divEnd.appendChild(playAgain)
    jokenpoScreen.appendChild(divEnd)
    localStorage.setItem('scorePoints', score)

    setTimeout(()=>{
        divEnd.classList.add("show")
        houseBtn.style.opacity = 1
        scorePoints.innerText = score
    }, 1000)
}

function reset() {
    jokenpoScreen.innerHTML = ""
    choises.style.display = "grid"
    jokenpoScreen.style.display = "none"
    //Add id animation
    choiseBtn.forEach((choise) => {
        choise.setAttribute("id", "reset")
    })
}
