const navSelector = document.getElementsByClassName('nav')
const categorySelector = document.getElementsByClassName('categoryOption')

let navIndex = 0
let navLength = (navSelector.length - 1)

let answerIndex = 0
let answerLength = (answerSelector.length - 1)

let categoryIndex = 0
let categoryLength = (categorySelector.length - 1)

console.log(categorySelector)

function gamepadInput(){

    let c = navigator.getGamepads()[0]
    let b = c.buttons;

    for (let i = 0; i < b.length; i++) {
        if(b[i].pressed === true){
            //D-Pad Up
            if(b[12].pressed === true){

                if(navSelector.length > 0){

                    navIndex--

                    if(navIndex < 0){
                        navIndex = navLength
                    }

                    navSelector[navIndex].focus()
                }

                if(categorySelector.length > 0 && window.getComputedStyle(categoryCard).visibility === "visible"){

                    categoryIndex--

                    if(categoryIndex < 0){
                        categoryIndex = categoryLength
                    }

                    categorySelector[categoryIndex].focus()
                }

/*                if(categorySelector.length > 0 && window.getComputedStyle(categoryCard).visibility === "hidden"){

                    console.log('I am invisible')
                }*/

                if(answerSelector.length > 0){
                    answerIndex--

                    if(answerIndex < 0){
                        answerIndex = answerLength
                    }

                    answerSelector[answerIndex].focus()
                }

            }
            //D-Pad Down
            if(b[13].pressed === true){

                if(navSelector.length > 0){

                    navIndex++

                    if(navIndex > navLength){
                        navIndex = 0
                    }

                    navSelector[navIndex].focus()
                }

                if(categorySelector.length > 0){

                    categoryIndex++

                    if(categoryIndex > categoryLength){
                        categoryIndex = 0
                    }

                    categorySelector[categoryIndex].focus()
                }

                if(answerSelector.length > 0){

                    answerIndex++

                    if(answerIndex > answerLength){
                        answerIndex = 0
                    }

                    answerSelector[answerIndex].focus()
                }

            }
            //A
            if(b[0].pressed === true){

                if(navSelector.length > 0){
                    navSelector[navIndex].click()
                }

                if(answerSelector.length > 0){
                    answerSelector[answerIndex].click()
                }

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








