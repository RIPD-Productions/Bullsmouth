let navIndex = 0
let navLength = (navSelector.length - 1)

let answerIndex = 0
let answerLength = (answerSelector.length - 1)

let categoryIndex = 0
let categoryLength = (categorySelector.length - 1)

function navUp(){

    if(isElement('navSelector')){
        navIndex--

        if(navIndex < 0){
            navIndex = navLength
        }

        navSelector[navIndex].focus()
    }

    if(isElement('categorySelector') && isVisible(categoryCard)){
        categoryIndex--

        if(categoryIndex < 0){
            categoryIndex = categoryLength
        }

        categorySelector[categoryIndex].focus()
    }

    if(isElement('answerSelector') && isVisible(interfaceOptions)){
        answerIndex-=2

        if(answerIndex < 0){
            answerIndex = answerLength
        }

        answerSelector[answerIndex].focus()
    }
}

function navDown(){
    if(isElement('navSelector')){
        navIndex++

        if(navIndex > navLength){
            navIndex = 0
        }

        navSelector[navIndex].focus()
    }

    if(isElement('categorySelector') > 0 && isVisible(categoryCard)){
        categoryIndex++

        if(categoryIndex > categoryLength){
            categoryIndex = 0
        }

        categorySelector[categoryIndex].focus()
    }

    if(isElement('answerSelector') && isVisible(interfaceOptions)){
        answerIndex+=2

        if(answerIndex > answerLength){
            answerIndex = 0
        }

        answerSelector[answerIndex].focus()
    }
}

function navLeft(){
    if(isElement('answerSelector') && isVisible(interfaceOptions)){
        answerIndex--

        if(answerIndex < 0){
            answerIndex = answerLength
        }

        answerSelector[answerIndex].focus()
    }
}

function navRight(){
    if(isElement('answerSelector') && isVisible(interfaceOptions)){
        answerIndex++

        if(answerIndex > answerLength){
            answerIndex = 0
        }

        answerSelector[answerIndex].focus()
    }
}

function navConfirm(){
    if(isElement('navSelector')){
        navSelector[navIndex].click()
    }

    if(isElement('categorySelector')){
        categorySelector[categoryIndex].click()
    }

    if(isElement('answerSelector')){
        answerSelector[answerIndex].click()
    }
}

function gamepadInput(){

    let c = navigator.getGamepads()[0]
    let b = c.buttons;

    for (let i = 0; i < b.length; i++) {
        if(b[i].pressed === true){
            //D-Pad Up
            if(b[12].pressed === true){
                navUp()
            }
            //D-Pad Down
            if(b[13].pressed === true){
                navDown()
            }
            //D-Pad Left
            if(b[14].pressed === true){
                navLeft()
            }
            //D-Pad Right
            if(b[15].pressed === true){
                navRight()
            }
            //A
            if(b[0].pressed === true){
                navConfirm()
            }
            //B
            if(b[1].pressed === true){
                history.back()
            }
        }
    }

}

let loop;

window.addEventListener("gamepadconnected", function (){
    console.log("Gamepad Connected")
    loop = setInterval(gamepadInput, 250)
})

window.addEventListener("gamepaddisconnected", function() {
    console.log("Gamepad Disconnected")
    clearInterval(loop)
})








