const dartCounter = document.getElementById('dartCounter')

let questionSelection = pickArray(0,9,5)
let qIndex = 0
let darts = 0

setVisibility(dartCounter,'hidden')
dartCounter.innerText = darts.toString()

bullsmouthVideo.loop = false;

window.addEventListener('load', () => {
    sessionStorage.setItem('round', '0')
    sessionStorage.setItem('category', null)
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
            setVisibility(dartCounter,'visible')
            interfaceVisibility('hidden')
            darts++

            dartCounter.innerText = darts.toString()

            let outcome = pickArray(0,3,1)

            let videos = [
                './assets/vid/correct/correct1.mp4',
                './assets/vid/correct/correct2.mp4',
                './assets/vid/correct/correct3.mp4',
                './assets/vid/correct/correct4.mp4'
            ]

            bullsmouthVideo.src = videos[outcome[0]]

            bullsmouthVideo.load()
            console.log('correct')

        } else {
            setVisibility(dartCounter,'visible')
            interfaceVisibility('hidden')

            let outcome = pickArray(0,3,1)

            let videos = [
                './assets/vid/incorrect/incorrect1.mp4',
                './assets/vid/incorrect/incorrect2.mp4',
                './assets/vid/incorrect/incorrect3.mp4',
                './assets/vid/incorrect/incorrect4.mp4'
            ]

            bullsmouthVideo.src = videos[outcome[0]]

            bullsmouthVideo.load()
            console.log('incorrect')
        }

        bullsmouthVideo.play()

        qIndex++
    }

    function categories(JSON, categorySelection){
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

            let correctAnswer = event.target.dataset.correct

            while (interfaceOptions.firstChild) {
                interfaceOptions.removeChild(interfaceOptions.firstChild);
            }

            correctIncorrect1(correctAnswer)

            if (qIndex >= 5) {
                bullsmouthVideo.addEventListener('ended', () => {
                    interfaceVisibility('hidden')
                    setVisibility(categoryCard, 'hidden')

                    bullsmouthVideo.src = './assets/vid/roundOneEnd.mp4'
                    bullsmouthVideo.load()
                    bullsmouthVideo.play()
                    console.log(darts)

                    bullsmouthVideo.addEventListener('ended', () => {
                        interfaceVisibility('hidden')
                        setVisibility(categoryCard, 'hidden')

                        sessionStorage.setItem('round', '1')
                        window.dispatchEvent(new Event('storage'))
                        interfaceOptions.removeEventListener('click', roundOne)
                    }, {once: true})
                }, {once: true})
            } else {
                bullsmouthVideo.addEventListener('ended', () => {
                    let outcome = pickArray(0,4,1)

                    let videos = [
                        './assets/vid/nextQuestion/nextQuestion1.mp4',
                        './assets/vid/nextQuestion/nextQuestion2.mp4',
                        './assets/vid/nextQuestion/nextQuestion3.mp4',
                        './assets/vid/nextQuestion/nextQuestion4.mp4',
                        './assets/vid/nextQuestion/nextQuestion5.mp4',
                    ]

                    bullsmouthVideo.src = videos[outcome[0]]
                    bullsmouthVideo.load()
                    bullsmouthVideo.play()

                    bullsmouthVideo.addEventListener("ended", ()=> {
                        interfaceVisibility('visible')
                        setVisibility(categoryCard, 'hidden')
                    }, {once: true})

                }, {once: true})
            }

            let sessionCat = sessionStorage.getItem('category')

            getQuestions(sessionCat, questionSelection[qIndex])
        }

    }

    function roundTwo(event){
        if (event.target.classList.contains('answer')) {
            event.preventDefault()

            let correctAnswer = event.target.dataset.correct

            while (interfaceOptions.firstChild) {
                interfaceOptions.removeChild(interfaceOptions.firstChild);
            }

            correctIncorrect1(correctAnswer)

            if (qIndex >= 5) {
                bullsmouthVideo.addEventListener('ended', () => {
                    interfaceVisibility('hidden')
                    setVisibility(categoryCard, 'hidden')

                    bullsmouthVideo.src = './assets/vid/roundTwoEnd.mp4'
                    bullsmouthVideo.load()
                    bullsmouthVideo.play()
                    console.log(darts)

                    bullsmouthVideo.addEventListener('ended', () => {
                        setVisibility(categoryCard, 'hidden')

                        sessionStorage.setItem('round', '2')
                        window.dispatchEvent(new Event('storage'))
                        interfaceOptions.removeEventListener('click', roundTwo)
                    }, {once: true})
                }, {once: true})
            } else {
                bullsmouthVideo.addEventListener('ended', () => {
                    let outcome = pickArray(0,4,1)

                    let videos = [
                        './assets/vid/nextQuestion/nextQuestion1.mp4',
                        './assets/vid/nextQuestion/nextQuestion2.mp4',
                        './assets/vid/nextQuestion/nextQuestion3.mp4',
                        './assets/vid/nextQuestion/nextQuestion4.mp4',
                        './assets/vid/nextQuestion/nextQuestion5.mp4',
                    ]

                    bullsmouthVideo.src = videos[outcome[0]]
                    bullsmouthVideo.load()
                    bullsmouthVideo.play()

                    bullsmouthVideo.addEventListener("ended", ()=> {
                        interfaceVisibility('visible')
                        setVisibility(categoryCard, 'hidden')
                    }, {once: true})

                }, {once: true})
            }

            let sessionCat = sessionStorage.getItem('category')

            getQuestions(sessionCat, questionSelection[qIndex])
        }

    }

    function roundThree(event){
        if (event.target.classList.contains('dartOption')) {
            event.preventDefault()

            let dartOption = event.target.dataset.dartoption

            if (dartOption === "TopLeft") {

                let prize4 = localStorage.getItem('prize4')

                if(darts === 1 && prize4 === null){
                    localStorage.setItem('prize4', '1')
                    bullsmouthVideo.src = './assets/vid/prizes/prize4.mp4'
                } else {
                    let outcome = pickArray(0,3,1)

                    if(prize4 !== null){
                        outcome = pickArray(1,3,1)
                    }

                    let videos = [
                        './assets/vid/prizes/prize4.mp4',
                        './assets/vid/miss/miss1.mp4',
                        './assets/vid/miss/miss2.mp4',
                        './assets/vid/miss/miss3.mp4'
                    ]

                    if(videos[outcome[0]] === './assets/vid/prize4.mp4'){
                        localStorage.setItem('prize4', '1')
                    }

                    bullsmouthVideo.src = videos[outcome[0]]
                }

            } else if (dartOption === "TopRight") {

                let prize3 = localStorage.getItem('prize3')

                if(darts === 1 && prize3 === null){
                    localStorage.setItem('prize3', '1')
                    bullsmouthVideo.src = './assets/vid/prizes/prize3.mp4'
                } else {
                    let outcome = pickArray(0,3,1)

                    if(prize3 !== null){
                        outcome = pickArray(1,3,1)
                    }

                    let videos = [
                        './assets/vid/prizes/prize3.mp4',
                        './assets/vid/miss/miss1.mp4',
                        './assets/vid/miss/miss2.mp4',
                        './assets/vid/miss/miss3.mp4'
                    ]

                    if(videos[outcome[0]] === './assets/vid/prize3.mp4'){
                        localStorage.setItem('prize3', '1')
                    }

                    bullsmouthVideo.src = videos[outcome[0]]
                }
            } else if (dartOption === "BottomLeft") {

                let prize2 = localStorage.getItem('prize2')

                if(darts === 1 && prize2 === null){
                    localStorage.setItem('prize2', '1')
                    bullsmouthVideo.src = './assets/vid/prizes/prize2.mp4'
                } else {
                    let outcome = pickArray(0,3,1)

                    if(prize2 !== null){
                        outcome = pickArray(1,3,1)
                    }

                    let videos = [
                        './assets/vid/prizes/prize2.mp4',
                        './assets/vid/miss/miss1.mp4',
                        './assets/vid/miss/miss2.mp4',
                        './assets/vid/miss/miss3.mp4'
                    ]

                    if(videos[outcome[0]] === './assets/vid/prize2.mp4'){
                        localStorage.setItem('prize2', '1')
                    }

                    bullsmouthVideo.src = videos[outcome[0]]
                }
            } else if (dartOption === "BottomRight") {

                let prize1 = localStorage.getItem('prize1')

                if(darts === 1 && prize1 === null){
                    localStorage.setItem('prize1', '1')
                    bullsmouthVideo.src = './assets/vid/prizes/prize1.mp4'
                } else {
                    let outcome = pickArray(0,3,1)

                    if(prize1 !== null){
                        outcome = pickArray(1,3,1)
                    }

                    let videos = [
                        './assets/vid/prizes/prize1.mp4',
                        './assets/vid/miss/miss1.mp4',
                        './assets/vid/miss/miss2.mp4',
                        './assets/vid/miss/miss3.mp4'
                    ]

                    bullsmouthVideo.src = videos[outcome[0]]

                    if(videos[outcome[0]] === './assets/vid/prize1.mp4'){
                        localStorage.setItem('prize1', '1')
                    }
                }
            }

            darts--

            if(darts <= 0){
                setVisibility(dartCounter,'hidden')

                bullsmouthVideo.load()
                bullsmouthVideo.play()

                setVisibility(interfaceOptions, 'hidden')

                bullsmouthVideo.addEventListener('ended', () => {
                    bullsmouthVideo.src = './assets/vid/conclusion.mp4'
                    bullsmouthVideo.load()
                    bullsmouthVideo.play()

                    bullsmouthVideo.addEventListener('ended', () => {
                        window.location.href = './score.html'
                    }, {once: true})

                }, {once: true})
            } else {

                dartCounter.innerText = darts.toString();

                bullsmouthVideo.load()
                bullsmouthVideo.play()

                setVisibility(interfaceOptions, 'hidden')

                bullsmouthVideo.addEventListener('ended', () => {
                    if(bullsmouthVideo.currentSrc !== './assets/vid/prizes/prize1.mp4' || './assets/vid/prizes/prize2.mp4' || './assets/vid/prizes/prize3.mp4' || './assets/vid/prizes/prize4.mp4'){
                        bullsmouthVideo.src = './assets/vid/nextThrow.mp4'

                        bullsmouthVideo.load()
                        bullsmouthVideo.play()

                        bullsmouthVideo.addEventListener('ended', () => {
                            setVisibility(interfaceOptions, 'visible')
                        })

                    }
                }, {once: true})

            }
        }
    }

    if (round === '0') {
        interfaceVisibility('hidden')
        setVisibility(categoryCard, 'hidden')

        let categorySelection = pickArray(0,4, 3)

        const categoryJSON = loadJSON('./assets/json/questions.json')

        bullsmouthVideo.src = './assets/vid/introduction.mp4'

        bullsmouthVideo.load()
        bullsmouthVideo.play()

        bullsmouthVideo.addEventListener('ended', () => {
            setVisibility(userInterface, 'visible')
            setVisibility(categoryCard, 'visible')
        }, {once: true})

        categories(categoryJSON, categorySelection)

        categoryList.addEventListener('click', (event) => {

            if (event.target.classList.contains('categoryOption')) {
                event.preventDefault()

                setVisibility(categoryCard, 'hidden')
                setVisibility(interfaceOptions, 'visible')
                setVisibility(questionCard, 'visible')

                let catIndex = event.target.dataset.index

                sessionStorage.setItem('category', catIndex)
                let sessionCat = sessionStorage.getItem('category')

                getQuestions(sessionCat, questionSelection[qIndex])

                while (interfaceOptions.firstChild) {
                    interfaceOptions.removeChild(interfaceOptions.firstChild);
                }

                interfaceOptions.addEventListener('click', roundOne)
            }
        }, {once: true})
    } else if (round === '1') {
        qIndex = 0

        interfaceVisibility('hidden')
        setVisibility(categoryCard, 'hidden')

        bullsmouthVideo.src = './assets/vid/roundTwoStart.mp4'
        bullsmouthVideo.load()
        bullsmouthVideo.play()

        bullsmouthVideo.addEventListener('ended', () => {
            setVisibility(userInterface, 'visible')
            setVisibility(categoryCard, 'visible')
        }, {once: true})

        while (categoryList.firstChild) {
            categoryList.removeChild(categoryList.firstChild);
        }

        let categorySelection = pickArray(5,9, 3)

        const categoryJSON = loadJSON('./assets/json/questions.json')

        categories(categoryJSON, categorySelection)

        categoryList.addEventListener('click', (event) => {
            if (event.target.classList.contains('categoryOption')) {
                event.preventDefault()

                setVisibility(categoryCard, 'hidden')
                setVisibility(interfaceOptions, 'visible')
                setVisibility(questionCard, 'visible')

                let catIndex = event.target.dataset.index

                sessionStorage.setItem('category', catIndex)
                let sessionCat = sessionStorage.getItem('category')

                getQuestions(sessionCat, questionSelection[qIndex])

                while (interfaceOptions.firstChild) {
                    interfaceOptions.removeChild(interfaceOptions.firstChild);
                }

                interfaceOptions.addEventListener('click', roundTwo)

            }
        }, {once: true})

    } else if (round === '2') {

        localStorage.setItem('totalDarts', darts.toString())

        setVisibility(categoryCard, 'hidden')
        setVisibility(userInterface, 'hidden')
        setVisibility(interfaceOptions, 'hidden')

        bullsmouthVideo.src = './assets/vid/roundThreeStart.mp4'
        bullsmouthVideo.load()
        bullsmouthVideo.play()

        bullsmouthVideo.addEventListener('ended', () => {
            setVisibility(interfaceOptions, 'visible')
        }, {once: true})

        const options = [
            "Top Left", "Top Right", "Bottom Left", "Bottom Right"
        ]

        options.forEach(option => {
            const answerDiv = document.createElement('div')
            answerDiv.setAttribute('class', 'optionsChild')

            const answerOption = document.createElement('a')
            answerOption.innerText = option
            answerOption.setAttribute('class', 'dartOption')
            answerOption.setAttribute('href', '#')
            answerOption.setAttribute('data-dartOption', option.split(" ").join("")
            )

            interfaceOptions.appendChild(answerDiv)
            answerDiv.appendChild(answerOption)
        })

        interfaceOptions.addEventListener('click', roundThree)
    }
})
