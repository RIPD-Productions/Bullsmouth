const categoryJSON = loadJSON('./assets/json/questions.json')
const videoJSON = loadJSON('./assets/json/video.json')

let categorySelection = pickArray(0,4)

let questionSelection = pickArray(0,4)
const qArray = [0,1]

let darts = 0

bullsmouthVideo.play()

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

            let question = category['question'][qArray[questionIndex]]

            questionCard.innerHTML = question.questionText

            let answers = question.answer

            answers.forEach(answer => {
                const answerDiv = document.createElement('div')
                answerDiv.setAttribute('class','optionsChild')

                const answerOption = document.createElement('a')
                answerOption.innerHTML = answer.answerText
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

        getQuestions(0,0)

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

                    bullsmouthVideo.src = './assets/vid/flowers.mp4'
                    bullsmouthVideo.play()

                    bullsmouthVideo.addEventListener('ended', () => {
                        interfaceVisibility('visible')
                        getQuestions(0,1)
                    })
                } else {
                    interfaceVisibility('hidden')

                    bullsmouthVideo.src = './assets/vid/flowers.mp4'
                    bullsmouthVideo.play()

                    bullsmouthVideo.addEventListener('ended', () => {
                        interfaceVisibility('visible')
                        getQuestions(0,1)
                    })

                }
            }
        })
    }
})
