const bullsmouthVideo = document.getElementById('bullsmouthVideo')
const userInterface = document.getElementById('interface')
const questionCard = document.getElementById('questionCard')
const answerSelector = document.getElementsByClassName('answer')

function loadJSON(requestURL){
    const request = new XMLHttpRequest()

    request.open("GET", requestURL, true)

    request.responseType = 'json'
    request.send()

    return request
}

bullsmouthVideo.play()

function switchVideo(){
    bullsmouthVideo.addEventListener('loadedmetadata', function (){
        let videoDuration = bullsmouthVideo.duration

        bullsmouthVideo.addEventListener("timeupdate", function (){
            let videoCurrentTime = bullsmouthVideo.currentTime

            if(videoCurrentTime === videoDuration){
                bullsmouthVideo.src = videos[videoIndex++]
                bullsmouthVideo.play()

                if(videoIndex > videos.length){
                    bullsmouthVideo.src = videos[0]
                    bullsmouthVideo.play()
                }

            }

        })
    })
}


const questionsJSON = loadJSON('./assets/json/questions.json')
const videoJSON = loadJSON('./assets/json/video.json')


/*console.log(questionsJSON)*/

let darts = 0
let videoIndex = 0

let videos = ['./assets/vid/sea.mp4','./assets/vid/flowers.mp4','./assets/vid/clouds.mp4']

switchVideo()

if(answerSelector.length > 0){
    for(let i = 0; i < answerSelector.length; i++) {

        if (answerSelector[i] === answerSelector[1]) {
            answerSelector[i].addEventListener('click', () => {
                darts++
                alert('true')
                console.log(darts)
            })
        } else {
            answerSelector[i].addEventListener('click', () => {
                alert('false')
            })
        }
    }
}