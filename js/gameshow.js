const questionsJSON = './assets/json/questions.json'
const videoJSON = './assets/json/video.json'
const bullsmouthVideo = document.getElementById('bullsmouthVideo')
const userInterface = document.getElementById('interface')
const questionCard = document.getElementById('questionCard')
const answers = document.getElementsByClassName('answer')

/*const answer1 = document.getElementById('a1')
const answer2 = document.getElementById('a2')
const answer3 = document.getElementById('a3')
const answer4 = document.getElementById('a4')*/

let darts = 0
let videoIndex = 0

let videos = ['./assets/vid/sea.mp4','./assets/vid/flowers.mp4','./assets/vid/clouds.mp4']

function switchVideo(){
    bullsmouthVideo.addEventListener('loadedmetadata', function (){
        let videoDuration = bullsmouthVideo.duration

        bullsmouthVideo.addEventListener("timeupdate", function (){
            let videoCurrentTime = bullsmouthVideo.currentTime

            if(videoCurrentTime === videoDuration){
                bullsmouthVideo.src = videos[videoIndex++]

                if(videoIndex > videos.length){
                    bullsmouthVideo.src = videos[0]
                }

            }

        })
    })
}


switchVideo()

for(let i = 0; i < answers.length; i++) {

    if (answers[i] === answers[1]) {
        answers[i].addEventListener('click', () => {
            alert('true')
        })
    } else {
        answers[i].addEventListener('click', () => {
            alert('false')
        })

    }
}


