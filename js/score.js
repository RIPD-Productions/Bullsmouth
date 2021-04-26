const scoreForm = document.querySelector('form')
const finalScore = document.getElementById('finalScore')
const finalScoreField = document.getElementById('finalScoreField')


let totalDarts = localStorage.getItem('totalDarts')
let prize1 = localStorage.getItem('prize1')
let prize2 = localStorage.getItem('prize2')
let prize3 = localStorage.getItem('prize3')
let prize4 = localStorage.getItem('prize4')

prizes = [
    prize1,
    prize2,
    prize3,
    prize4
]

if(prizes.filter(x => x).length === 0){
    if(totalDarts == null){
        score = 0
    }
    score = (totalDarts * 100)
}

score = (prizes.filter(x => x).length * 1000) + (totalDarts * 100)

finalScore.innerText = score.toString()
finalScoreField.value = score

scoreForm.addEventListener('submit', (event) => {
  event.preventDefault()

  new FormData(scoreForm)
})

scoreForm.addEventListener('formdata', (data) => {
    let score = data.formData
    const request = new XMLHttpRequest()
    request.open("POST", "./src/setHighScores.php")
    request.send(score)
    localStorage.clear()
    sessionStorage.clear();
    window.location.href = './highscores.html'
})