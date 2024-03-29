const navSelector = document.getElementsByClassName('nav')
const categorySelector = document.getElementsByClassName('categoryOption')
const bullsmouthVideo = document.getElementById('bullsmouthVideo')
const userInterface = document.getElementById('interface')
const questionCard = document.getElementById('questionCard')
const answerSelector = document.getElementsByClassName('answer')
const interfaceOptions = document.getElementById('interfaceOptions')
const categoryCard = document.getElementById('categoryCard')
const categoryList = document.getElementById('categoryList')

function loadJSON(requestURL){
    const request = new XMLHttpRequest()

    request.open("GET", requestURL, true)

    request.timeout = 1000;
    request.responseType = 'json'

    request.send()

    return request
}

function isElement(uiElement){
    return uiElement.length > 0
}

function isVisible(uiElement){
    return window.getComputedStyle(uiElement).visibility === "visible"
}

function setVisibility(uiElement, visibility){
    return uiElement.style.visibility = visibility
}

function pickArray(min, max, totalPicks) {
    let numbers = [];
    for (let i = 0; i < totalPicks; i++) {
        let number =  Math.floor(Math.random() * (max - min + 1)) + min
        let check = numbers.includes(number)

        if(check === false) {
            numbers.push(number)
        } else {
            while(check === true){
                number = Math.floor(Math.random() * (max - min + 1)) + min
                check = numbers.includes(number)
                if(check === false){
                    numbers.push(number)
                }
            }
        }
    }

    return numbers
}
