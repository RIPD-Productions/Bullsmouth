const categoryJSON = loadJSON('./assets/json/questions.json')
const videoJSON = loadJSON('./assets/json/video.json')

let categorySelection = pickArray(0,4)

let questionSelection = ["0","1"]/* pickArray(0,3)*/

let qIndex = 0

let darts = 0

setVisibility(userInterface,'hidden')
setVisibility(categoryCard,'hidden')
setVisibility(interfaceOptions, 'hidden')

playVideo('./assets/vid/flowers.mp4')
/*playVideo('./assets/vid/introduction.mp4')*/

bullsmouthVideo.addEventListener('ended', () => {
    setVisibility(userInterface,'visible')
    setVisibility(categoryCard,'visible')
})


categoryJSON.onload = function () {
    const bullsmouthQuestions = categoryJSON.response
    const categories = bullsmouthQuestions['bullsmouthQuestions']['category']

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

categoryList.addEventListener('click', (event) =>{

    function getQuestions(catIndex, questionIndex){
        const questionsJSON = loadJSON('./assets/json/questions.json')

        questionsJSON.onload = function () {
            const bullsmouthQuestions = questionsJSON.response
            let category = bullsmouthQuestions['bullsmouthQuestions']['category'][catIndex]

            let question = category['question'][questionIndex]

            questionCard.innerHTML = question.questionText

            const answers = question.answer

            console.log(answers)

            answers.forEach(answer => {
                const answerDiv = document.createElement('div')
                answerDiv.setAttribute('class','optionsChild')

                const answerOption = document.createElement('a')
                answerOption.innerText = answer.answerText
                answerOption.setAttribute('class','answer')
                answerOption.setAttribute('href', '#')
                answerOption.setAttribute('data-correct', answer.correct)

                interfaceOptions.appendChild(answerDiv)
                answerDiv.appendChild(answerOption)
            })
        }
    }

    if(event.target.classList.contains('categoryOption')) {
        event.preventDefault()

        setVisibility(categoryCard,'hidden')
        setVisibility(interfaceOptions, 'visible')
        setVisibility(questionCard,'visible')

        let catIndex = event.target.dataset.index

        getQuestions(0, 0)

        interfaceOptions.addEventListener('click', (event)=> {
            if(event.target.classList.contains('answer')) {
                event.preventDefault()

                let correctAnswer = event.target.dataset.correct

                function interfaceVisibility(visibility){
                    setVisibility(interfaceOptions, visibility)
                    setVisibility(questionCard, visibility)
                    setVisibility(userInterface, visibility)
                }

                while (interfaceOptions.firstChild) {
                    interfaceOptions.removeChild(interfaceOptions.firstChild);
                }

                if(correctAnswer !== 'false'){
                    interfaceVisibility('hidden')
                    playVideo('./assets/vid/correct.mp4')
                } else {
                    interfaceVisibility('hidden')
                    playVideo('./assets/vid/incorrect.mp4')
                }

                qIndex++

                bullsmouthVideo.addEventListener('ended', () => {
                    if(qIndex >= 3) {
                        interfaceVisibility('hidden')
                        setVisibility(categoryCard,'hidden')
                        playVideo('./assets/vid/roundOneEnd.mp4')
                    } else {
                        interfaceVisibility('visible')
                        setVisibility(categoryCard,'hidden')
                    }
                })

                getQuestions(0,qIndex)
            }
        })
    }
})
