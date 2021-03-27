const scoreForm = document.querySelector('form')
const finalScore = document.getElementById('finalScore')
const finalScoreField = document.getElementById('finalScoreField')

let score = 1000

finalScore.innerText = score.toString()
finalScoreField.value = score

scoreForm.addEventListener('submit', (event) => {
  event.preventDefault()

  new FormData(scoreForm)
})

scoreForm.addEventListener('formdata', (data) => {
    let score = data.formData

    console.log(score)

    const request = new XMLHttpRequest()
    request.open("POST", "/")
    request.send(score)
})