document.addEventListener('keydown', keyboardControls, false)

function keyboardControls(e) {
    switch(e.keyCode) {

        //Enter Key
        case 13:
            navConfirm()
            break;

        //Backspace
        case 8:
            history.back()
            break;

        //ESC
        case 27:
            history.back()
            break;

        //Arrow Keys
        case 37:
            // Left
            navLeft()
            break
        case 38:
            // Up
            navUp()
            break;
        case 39:
            // Right
            navRight()
            break;
        case 40:
            // Down
            navDown()
            break;

        //WASD

        case 87:
            //W
            navUp()
            break;
        case 65:
            //A
            navLeft()
            break;
        case 83:
            //S
            navDown()
            break;
        case 68:
            //D
            navRight()
            break;
    }
}
