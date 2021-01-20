const navSelector = document.getElementsByClassName('nav')

let navIndex = 0
let navLength = (navSelector.length - 1)

function gamepadInput(){

    let c = navigator.getGamepads()[0]
    let b = c.buttons;

    for (let i = 0; i < b.length; i++) {
        if(b[i].pressed === true){
            if(b[12].pressed === true){
                navSelector[navIndex--].classList.remove('red')
            }
            if(b[13].pressed === true){
                navIndex++

                if(navIndex > navLength){
                    navIndex = 0
                }

                navSelector[navIndex].classList.add('red')

                if(navIndex === 0){
                    navSelector[navLength].classList.remove('red')
                } else {
                    navSelector[navIndex - 1].classList.remove('red')
                }

                console.log(navIndex)

            }
            if(b[0].pressed === true){
                navSelector[navIndex].click()
            }
            if(b[1].pressed === true){
                history.back()
            }
        }
    }

}

let loop;

window.addEventListener("gamepadconnected", function (){
    console.log("Gamepad Connected");
    loop = setInterval(gamepadInput, 250);
})

window.addEventListener("gamepaddisconnected", function() {
    console.log("Gamepad Disconnected");
    clearInterval(loop)
})








