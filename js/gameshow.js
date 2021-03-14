const questionsJSON = loadJSON('./assets/json/questions.json')
const videoJSON = loadJSON('./assets/json/video.json')

let categorySelection = pickArray(0,4)
let questionSelection = pickArray(0,4)

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
                bullsmouthVideo.play()

                if(videoIndex > 0){
                    userInterface.id = "interface"
                    bullsmouthVideo.pause()
                }


                if(videoIndex > videos.length){
                    bullsmouthVideo.src = videos[0]
                    bullsmouthVideo.play()
                }

            }

        })
    })


}

bullsmouthVideo.play()

switchVideo()

questionsJSON.onload = function () {
    const bullsmouthQuestions = questionsJSON.response
    const categories = bullsmouthQuestions['bullsmouthQuestions']['category'];

    if (isElement('categoryCard')) {

        for (let i = 0; i < categorySelection.length; i++) {
            const categoryItem = document.createElement('li')
            const categoryName = document.createElement('a')

            categoryName.setAttribute('class', 'categoryOption')
            categoryName.innerHTML = categories[categorySelection[i]].categoryName
            categoryName.setAttribute('href', '#')
            categoryName.setAttribute('data-index', categorySelection[i])

            categoryList.appendChild(categoryItem)
            categoryItem.appendChild(categoryName)

        }
    }
}

categoryList.addEventListener('click', (event) => {

    if(event.target.classList.contains('categoryOption')) {

        let categoryIndex = event.target.getAttribute('data-index')

        setVisibility(categoryCard,'hidden')
        setVisibility(interfaceOptions, 'visible')
        setVisibility(questionCard,'visibile')

        console.log(categoryIndex)
    }
})



if(isElement('answerSelector') && isVisible(interfaceOptions)){
    for(let i = 0; i < answerSelector.length; i++){
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