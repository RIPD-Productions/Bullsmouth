const categoryJSON = loadJSON('./assets/json/questions.json')
const videoJSON = loadJSON('./assets/json/video.json')

let categorySelection = pickArray(0,3, 3)

let questionSelection = ["0","1"]/* pickArray(0,9,5)*/

let qIndex = 0

let darts = 0

bullsmouthVideo.loop = false;

window.addEventListener('load', () => {
    sessionStorage.setItem('round', '0')
    window.dispatchEvent( new Event('storage') )
}, {once: true})

window.addEventListener('storage', () => {
    let round = sessionStorage.getItem('round')

    function interfaceVisibility(visibility) {
        setVisibility(interfaceOptions, visibility)
        setVisibility(questionCard, visibility)
        setVisibility(userInterface, visibility)
    }

    function correctIncorrect1(correctAnswer){
        if (correctAnswer !== 'false') {
            interfaceVisibility('hidden')
            bullsmouthVideo.src = './assets/vid/correct.mp4'
            bullsmouthVideo.load()
            console.log('correct')

        } else {
            interfaceVisibility('hidden')
            bullsmouthVideo.src = './assets/vid/incorrect.mp4'
            bullsmouthVideo.load()
            console.log('incorrect')
        }

        bullsmouthVideo.play()

        qIndex++
    }

    function categories(JSON){
        JSON.onload = function () {
            const bullsmouthQuestions = JSON.response
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
    }

    function getQuestions(catIndex, questionIndex) {
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
                answerDiv.setAttribute('class', 'optionsChild')

                const answerOption = document.createElement('a')
                answerOption.innerText = answer.answerText
                answerOption.setAttribute('class', 'answer')
                answerOption.setAttribute('href', '#')
                answerOption.setAttribute('data-correct', answer.correct)

                interfaceOptions.appendChild(answerDiv)
                answerDiv.appendChild(answerOption)
            })
        }
    }

    function roundOne(event){
        if (event.target.classList.contains('answer')) {
            event.preventDefault()

            let correctAnswer = event.currentTarget.dataset.correct

            while (interfaceOptions.firstChild) {
                interfaceOptions.removeChild(interfaceOptions.firstChild);
            }

            correctIncorrect1(correctAnswer)

            if (qIndex >= 3) {
                bullsmouthVideo.addEventListener('ended', () => {
                    interfaceVisibility('hidden')
                    setVisibility(categoryCard, 'hidden')

                    bullsmouthVideo.src = './assets/vid/roundOneEnd.mp4'
                    bullsmouthVideo.load()
                    bullsmouthVideo.play()

                    bullsmouthVideo.addEventListener('ended', () => {
                        sessionStorage.setItem('round', '1')
                        window.dispatchEvent(new Event('storage'))
                        interfaceOptions.removeEventListener('click', roundOne)
                    }, {once: true, capture: true})
                }, {once: true, capture: true})
            } else {
                bullsmouthVideo.addEventListener('ended', () => {
                    interfaceVisibility('visible')
                    setVisibility(categoryCard, 'hidden')
                }, {once: true, capture: true})
            }

            getQuestions(0, qIndex)
        }

        event.stopPropagation();
    }

    function roundTwo(event){
        if (event.target.classList.contains('answer')) {
            event.preventDefault()

            let correctAnswer = event.currentTarget.dataset.correct

            while (interfaceOptions.firstChild) {
                interfaceOptions.removeChild(interfaceOptions.firstChild);
            }

            correctIncorrect1(correctAnswer)

            if (qIndex >= 3) {
                bullsmouthVideo.addEventListener('ended', () => {
                    interfaceVisibility('hidden')
                    setVisibility(categoryCard, 'hidden')

                    bullsmouthVideo.src = './assets/vid/roundTwoEnd.mp4'
                    bullsmouthVideo.load()
                    bullsmouthVideo.play()

                    bullsmouthVideo.addEventListener('ended', () => {
                        sessionStorage.setItem('round', '2')
                        window.dispatchEvent(new Event('storage'))
                        interfaceOptions.removeEventListener('click', roundTwo)
                    }, {once: true, capture: true})
                }, {once: true, capture: true})
            } else {
                bullsmouthVideo.addEventListener('ended', () => {
                    interfaceVisibility('visible')
                    setVisibility(categoryCard, 'hidden')
                }, {once: true, capture: true})
            }

            getQuestions(0, qIndex)
        }

        event.stopPropagation();
    }

    if (round === '0') {
        const categoryJSON = loadJSON('./assets/json/questions.json')

        setVisibility(userInterface, 'hidden')
        setVisibility(categoryCard, 'hidden')
        setVisibility(interfaceOptions, 'hidden')

        bullsmouthVideo.src = './assets/vid/flowers.mp4'
        bullsmouthVideo.load()
        bullsmouthVideo.play()

        bullsmouthVideo.addEventListener('ended', () => {
            setVisibility(userInterface, 'visible')
            setVisibility(categoryCard, 'visible')
        }, {once: true})

        categories(categoryJSON)

        categoryList.addEventListener('click', (event) => {

            if (event.target.classList.contains('categoryOption')) {
                event.preventDefault()

                setVisibility(categoryCard, 'hidden')
                setVisibility(interfaceOptions, 'visible')
                setVisibility(questionCard, 'visible')

                let catIndex = event.target.dataset.index

                getQuestions(0, 0)

                while (interfaceOptions.firstChild) {
                    interfaceOptions.removeChild(interfaceOptions.firstChild);
                }

                interfaceOptions.addEventListener('click', roundOne)
            }
        }, {once: true})
    } else if (round === '1') {
        qIndex = 0

        while (categoryList.firstChild) {
            categoryList.removeChild(categoryList.firstChild);
        }

        const categoryJSON = loadJSON('./assets/json/questions.json')

        setVisibility(userInterface, 'hidden')
        setVisibility(categoryCard, 'hidden')
        setVisibility(interfaceOptions, 'hidden')
        setVisibility(questionCard, 'hidden')

        bullsmouthVideo.src = './assets/vid/roundTwoStart.mp4'
        bullsmouthVideo.load()
        bullsmouthVideo.play()

        bullsmouthVideo.addEventListener('ended', () => {
            setVisibility(userInterface, 'visible')
            setVisibility(categoryCard, 'visible')
        }, {once: true})

        categories(categoryJSON)

        categoryList.addEventListener('click', (event) => {
            if (event.target.classList.contains('categoryOption')) {
                event.preventDefault()

                setVisibility(categoryCard, 'hidden')
                setVisibility(interfaceOptions, 'visible')
                setVisibility(questionCard, 'visible')

                let catIndex = event.target.dataset.index

                getQuestions(0, 0)

                while (interfaceOptions.firstChild) {
                    interfaceOptions.removeChild(interfaceOptions.firstChild);
                }

                interfaceOptions.addEventListener('click', roundTwo)

            }
        }, {once: true})

    } else if (round === '2') {

    }

    console.log(sessionStorage.getItem('round'))
})
