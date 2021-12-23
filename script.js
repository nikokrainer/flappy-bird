//variables

const black0 = document.querySelector(".black0")
const black1 = document.querySelector(".black1")
const white0 = document.querySelector(".white0")
const white1 = document.querySelector(".white1")
const bird = document.querySelector(".bird")
const html = document.querySelector("html")
let scoreCount = document.querySelector(".scoreCount")
let highScoreCount = document.querySelector(".highScoreCount")

const elementsArray = [black0, black1, white0, white1]

let game = false
let jumping = false
let counter
let score = 0
let highScore = 0

let gameWidth = parseInt(
  window.getComputedStyle(document.documentElement).getPropertyValue("--width")
)
let gameHeight = parseInt(
  window.getComputedStyle(document.documentElement).getPropertyValue("--height")
)
let birdPosition = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--bird-position")
let birdHeight = parseInt(
  window.getComputedStyle(bird).getPropertyValue("height")
)
let birdWidth = parseInt(
  window.getComputedStyle(bird).getPropertyValue("width")
)
let whiteHeight = parseInt(
  window.getComputedStyle(white0).getPropertyValue("height")
)

let birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"))
let highScoreData = localStorage.getItem("highScore")
console.log(highScoreData)

window.addEventListener("load", () => {
  if (highScoreData) {
    highScore = JSON.parse(highScoreData)
    highScoreCount.innerText = highScore
  }
})

html.addEventListener("click", () => {
  if (!game) {
    game = true
    elementsArray.map((element) => {
      element.classList.remove("hidden")
    })
  }
})

html.addEventListener("click", () => {
  if (game) {
    jumper()
  }
})

html.addEventListener("keypress", (e) => {
  if (e.code === "Space" && !game) {
    game = true
    elementsArray.map((element) => {
      element.classList.remove("hidden")
    })
  }
})

html.addEventListener("keypress", (e) => {
  if (e.code === "Space" && game) {
    jumper()
  }
})

white0.addEventListener("animationiteration", () => {
  let random = Math.random() * (gameHeight * 10 - whiteHeight)
  white0.style.top = random + "px"
  score++
  scoreCount.innerText = score
})

white1.addEventListener("animationiteration", () => {
  let random = Math.random() * (gameHeight * 10 - whiteHeight)
  white1.style.top = random + "px"
  score++
  scoreCount.innerText = score
})

//event listeners

setInterval(() => {
  if (game) {
    let birdTop = parseInt(
      window.getComputedStyle(bird).getPropertyValue("top")
    )

    let white0left = parseInt(
      window.getComputedStyle(white0).getPropertyValue("left")
    )
    let white0top = parseInt(
      window.getComputedStyle(white0).getPropertyValue("top")
    )
    let white1left = parseInt(
      window.getComputedStyle(white1).getPropertyValue("left")
    )
    let white1top = parseInt(
      window.getComputedStyle(white1).getPropertyValue("top")
    )

    if (!jumping) {
      bird.style.top = birdTop + 3 + "px"
    }

    if (
      (white0left < birdWidth && birdTop < white0top) ||
      (white0left < birdWidth &&
        birdTop + birdHeight > white0top + whiteHeight) ||
      (white1left < birdWidth && birdTop < white1top) ||
      (white1left < birdWidth &&
        birdTop + birdHeight > white1top + whiteHeight) ||
      birdTop > gameHeight * 10 - (gameHeight * 10) / 15
    ) {
      bird.style.top = birdPosition
      game = false
      elementsArray.map((element) => {
        element.classList.add("hidden")
      })

      if (score > highScore) {
        highScoreCount.innerText = score
        localStorage.setItem("highScore", JSON.stringify(score))
      }

      score = 0
      scoreCount.innerText = score

      alert("game over")
    }
  }
}, 10)

function jumper() {
  jumping = 1
  counter = 0

  if (counter === 0) {
    let jumperInterval = setInterval(() => {
      let birdTop = parseInt(
        window.getComputedStyle(bird).getPropertyValue("top")
      )

      if (counter < 20 && birdTop > 0) {
        bird.style.top = birdTop - 4 + "px"
      }

      if (counter > 20) {
        clearInterval(jumperInterval)
        jumping = 0
        counter = 0
      }

      counter++
    }, 10)
  }
}
