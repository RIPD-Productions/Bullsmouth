const questionsJSON = './assets/json/questions.json'
const videoJSON = './assets/json/video.json'
const bullsmouthVideo = document.getElementById('bullsmouthVideo')
const userInterface = document.getElementById('interface')
const questionCard = document.getElementById('questionCard')
const answer1 = document.getElementById('a1')
const answer2 = document.getElementById('a2')
const answer3 = document.getElementById('a3')
const answer4 = document.getElementById('a4')

let darts = 0

bullsmouthVideo.src = './assets/vid/sea.mp4'

bullsmouthVideo.addEventListener('loadedmetadata', function (){
    let videoDuration = bullsmouthVideo.duration

    bullsmouthVideo.addEventListener("timeupdate", function (){
        let videoCurrentTime = bullsmouthVideo.currentTime

        if(videoCurrentTime === videoDuration){
            bullsmouthVideo.src = './assets/vid/flowers.mp4'
        }

    })
})

