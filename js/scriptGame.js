//BOARDS
const board = document.getElementById("board")
const battleBoard = document.getElementById("battleBoard")
const winningBoard = document.getElementById("winningBoard")
const losingBoard = document.getElementById("losingBoard")
const replay = document.getElementById("replay")


//Box of the squares to attack
const attacksBox = document.getElementById("attacksBox")
const showHearts = document.getElementById("showHearts")
const boardSize = 64

//Show the results as a log
const logText = document.getElementById("logText")

//Array that contains all the mazes
const mazeAllArrays = []

//Array that will save the actual maze
let boardArray = []
//Array that we use to compare the positions wich 1 is wall and 0 is floor
//The 3 is the beggining and the 4 is the end
const boardArray1 = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 4, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
]
const boardArray2 = [
    [1, 1, 1, 1, 1, 3, 1, 1],
    [4, 0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
]
const boardArray3 = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 4, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ]
mazeAllArrays.push(boardArray1)
mazeAllArrays.push(boardArray2)
mazeAllArrays.push(boardArray3)

//Lives of the player
const lives = 3
let livesActual = 0

//Var to save the tiles of the board
let arrayFichas = board.getElementsByTagName("SECTION")
/**
 * Function to save in the varaible boardArray the a random maze from the array that contains all the arrays
 */
const chooseMaze = () =>{
    let randomMaze = Math.floor(Math.random()*mazeAllArrays.length)

    boardArray = mazeAllArrays[randomMaze]
}

chooseMaze()


//Variable to save the size of the board
const boardWidth = boardArray[0].length
const boardHeight = boardArray.length

//Variable to save the position of the player
let playerPositionI
let playerPositionJ
let tileId

//Variable of the character
let character

let numberOfEnemies = 3



//Functions of the game
/**
 * Funcion que carga las fichas del tablero que son suelos formado por divs y grids
 */
const loadFloor = () => {

    let fragment = document.createDocumentFragment()

    for (let i = 0; i < boardSize; i++) {

        let floor = document.createElement("SECTION")
        floor.classList.add("floorTile")
        floor.id = i

        fragment.append(floor)

    }

    board.append(fragment)
}

const loadWalls = () => {


    let contadorFichas = 0

    //Recorremos el array
    for (let i = 0; i < boardArray.length; i++) {

        for (let j = 0; j < boardArray.length; j++) {

            //Comprobamos si es un muro
            if (boardArray[i][j] == 1) {
                //Si es un muro cambiamos el aspecto de pared a muro
                arrayFichas[contadorFichas].classList.remove("floorTile")
                arrayFichas[contadorFichas].classList.add("wallTile")

            }
            contadorFichas++
        }
    }

}


/**
* Funcion para cargar la linea de meta y la linea de salida
*/
const loadEndStarPlayer = () => {

    let contadorFichas = 0

    for (let i = 0; i < boardArray.length; i++) {

        for (let j = 0; j < boardArray.length; j++) {

            if (boardArray[i][j] == 4) {
                arrayFichas[contadorFichas].classList.remove("floorTile")
                arrayFichas[contadorFichas].classList.add("endTile")
            }
            if (boardArray[i][j] == 3) {
                arrayFichas[contadorFichas].classList.remove("floorTile")
                arrayFichas[contadorFichas].classList.add("endTile")

                //We save the position of the player
                playerPositionI = i
                playerPositionJ = j
                tileId = contadorFichas

                createPlayer(tileId)
            }
            contadorFichas++
        }
    }
}

const loadEnemies = () => {
    let randomTileI, randomTileJ

    //We search the tile until is a valid one
    do {
        randomTileI = Math.floor(Math.random() * boardHeight)
        randomTileJ = Math.floor(Math.random() * boardWidth)
    }
    while (checkValidCreationEnemieTile(randomTileI, randomTileJ))

    createEnemieCharacter(randomTileI, randomTileJ)

}

const checkValidCreationEnemieTile = (tileI, tileJ) => {

    //We check if the tile is a wall or the end line or start line
    if (boardArray[tileI][tileJ] === 1 || boardArray[tileI][tileJ] === 3 || boardArray[tileI][tileJ] === 4 || arrayFichas[calculateIndex(tileI, tileJ)].hasChildNodes() ) {
        return true
    }
    return false
}

const createEnemieCharacter = (posI, posJ) => {
    //We create the enemie minotaur
    let enemieCharacter = document.createElement("DIV")
    enemieCharacter.classList.add("characterMinotaur")

    //Generate the enemie in the tile 
    arrayFichas[calculateIndex(posI, posJ)].append(enemieCharacter)
}

/**
 * Function to calculate the position in the grid based of the array with walls
 * 
 * @param {*} i //Position of the array i
 * @param {*} j //Position of the array j
 * @returns //The number of the position of grid
 */
const calculateIndex = (i, j) => {
    return (i * boardWidth) + j
}

/**
 * Function that resets the boards showing the board and quitting the battle one
 */
const resetBoards = () => {
    board.classList.remove("displayNone")
    battleBoard.classList.add("displayNone")
    winningBoard.classList.add("displayNone")
    losingBoard.classList.add("displayNone")
}

//FUNCIONES DEL JUGADOR
/**
 * Function to move detect where the player is moving
 * 
 * @param {String} event 
 */
const moveCharacter = (event) => {

    //We declare the variable of the key that have been pushed
    let keyPushed = event.key

    //Check if theres an nemy in the next tile
    if (checkEnemieInNextTile(keyPushed)) {
        console.log("startBattle")
        startBattle()
    }

    //Check if the player has reached the end line
    if(checkEndNextTile(keyPushed)){
        endGameWin()
    }

    //If player pushes rigth arrow or letter D it moves rigth
    if (keyPushed === "ArrowRight" || keyPushed === "d") {
        //We search if the player can move to that tile
        if (canPlayerMoveRigth()) {
            moveCharacterRight()
            changePlayerDirection("Right")
        }
    }
    if (keyPushed === "ArrowLeft" || keyPushed === "a") {
        if (canPlayerMoveLeft()) {
            moveCharacterLeft()
            changePlayerDirection("Left")
        }
    }
    if (keyPushed === "ArrowUp" || keyPushed === "w") {
        if (canPlayerMoveTop()) {
            moveCharacterTop()
            changePlayerDirection("Up")
        }
    }
    if (keyPushed === "ArrowDown" || keyPushed === "s") {
        if (canPlayerMoveBottom()) {
            moveCharacterBottom()
            changePlayerDirection("Down")

        }
    }

}


/**
 * Function to change the sprite of the character looking side
 * 
 * @param {*} key 
 */
const changePlayerDirection = (key) =>{

    character.style.backgroundImage = " url(../assets/images/character/character"+key+".png)"

}


/**
 * Function to check if theres an enemy in the next tile
 * 
 * @param {string} key 
 * @returns 
 */
const checkEnemieInNextTile = (key) => {

    //Check the movement 
    switch (key) {
        //Move left
        case "ArrowLeft":
        case "a":
            //Check if the left tile has an enemie
            if (arrayFichas[tileId - 1].hasChildNodes()) {
                return true
            }
            break;
        //Move rigth
        case "ArrowRight":
        case "d":
            if (arrayFichas[tileId + 1].hasChildNodes()) {
                return true
            }
            break;
        //Move up
        case "ArrowUp":
        case "w":
            if (arrayFichas[tileId - boardWidth].hasChildNodes()) {
                return true
            }
            break;
        //Move down
        case "ArrowDown":
        case "s":
            if(canPlayerMoveBottom()){

                if (arrayFichas[tileId + boardWidth].hasChildNodes()) {
                    return true
                }
            }
            break;
    }
}

/**
 * Function to check if the player has reached the end line
 * 
 * @returns 
 */
const endGameWin = () =>{
    
    //Quit the maze
    unshowMazeBoard()

    //Show the winning board
    showWinningBoard()
}


const checkEndNextTile = (key) =>{
    switch (key) {
        //Move left
        case "ArrowLeft":
        case "a":
            //Check if the left tile is the end
            if (playerPositionJ - 1 >= 0 && boardArray[playerPositionI][playerPositionJ - 1] === 4){
                return true
            }
            break;
        //Move rigth
        case "ArrowRight":
        case "d":
            if (playerPositionJ + 1 < boardWidth && boardArray[playerPositionI][playerPositionJ + 1] === 4){
                return true
            }
            break;
        //Move up
        case "ArrowUp":
        case "w":
            if (playerPositionI - 1 >= 0 && boardArray[playerPositionI - 1][playerPositionJ] === 4) {
                
                    return true;
                
            }
            break;
        //Move down
        case "ArrowDown":
        case "s":
            if(playerPositionI + 1 < boardHeight && boardArray[playerPositionI + 1][playerPositionJ] === 4) {
                
                return true;
                
            }
            break;
    }
}
/**
 * Function that starts when you found an enemy
 */
const startBattle = () => {
    //We quit the maze board
    unshowMazeBoard()

    //Show the battle board
    createBattleBoard()
}

/**
 * Function to create the battle board
 */
const createBattleBoard = () => {

    //Show the board
    showBattleBoard()

    //We show the number of lives
    showLives(showHearts)

}

//FUNCTIONS TO SHOW OR UNSHOW THE BOARDS
/**
 * Function to quit the main board
 */
const unshowMazeBoard = () => {
    board.classList.add("displayNone")
}

/**
 * Function to show the battle maze
 */
const showBattleBoard = () => {
    battleBoard.classList.remove("displayNone")
    cleanLog()
}

/**
 * Function to quit the battle maze
 */
const unshowBattleBoard = () =>{
    battleBoard.classList.add("displayNone")
}

/**
 * Function to add the normal maze
 */
const showMazeBoard = () =>{
    board.classList.remove("displayNone")
}

/**
 * Function to create the winning board
 */
const showWinningBoard = () =>{
    winningBoard.classList.remove("displayNone")
}

/**
 * Function to show the losing board
 */
const showLosingBoard = () =>{
    losingBoard.classList.remove("displayNone")
}
///////////////////////////////////////////////////

/**
 * Function to fille the hearts of the player
 */
const fillLives = () => {
    livesActual = lives
}

/**
 * Function to show the lives of the player
 */
const showLives = (container) => {

    let fragment = document.createDocumentFragment()

    container.textContent = ""

    for (let i = 1; i <= lives; i++) {

        let heart
        //If theres less lives than the original ones, then it creates an empty heart
        if (livesActual < lives && i > livesActual) {
            heart = document.createElement("IMG")
            heart.setAttribute("src", "../assets/images/hearts/emptyHeart.png")
            heart.classList.add("heart")

            fragment.append(heart)
        }
        //If not it creates a normal heart
        else {
            heart = document.createElement("IMG")
            heart.setAttribute("src", "../assets/images/hearts/fullHeart.png")
            heart.classList.add("heart")

            fragment.append(heart)
        }

    }

    //We put the hearts in the specified container
    container.append(fragment)
}


//MOVEMENT TOP
/**
 * Function to check if the player can move to the bottom tile
 * 
 * @returns true || false
 */
const canPlayerMoveBottom = () => {

    //Check if the rigth tile is a wall or not and checks if its the end of the maze
    if (playerPositionI + 1 < 0) {
        return false
    }
    if (boardArray[playerPositionI + 1][playerPositionJ] === 1) {
        return false
    }
    else {
        return true
    }

}
/**
 * Function to move the player to the bottom tile 
 */
const moveCharacterBottom = () => {
    //We quit one to the position of the player
    playerPositionI++
    //We delete the character from his actual tile
    deleteCharacter()

    //We quit the size of the board to the tile Id
    tileId = tileId + boardWidth
    createPlayer(tileId)
}


//MOVEMENT TOP
/**
 * Function to check if the player can move to the top tile
 * 
 * @returns true ||false
 */
const canPlayerMoveTop = () => {

    //Check if the rigth tile is a wall or not and checks if its the end of the maze
    if (boardArray[playerPositionI - 1][playerPositionJ] === 1) {
        return false
    }
    if (playerPositionI - 1 < 0) {
        return false
    }
    else {
        return true
    }

}
/**
 * Function to move the character to the top tile
 */
const moveCharacterTop = () => {
    //We quit one to the position of the player
    playerPositionI--
    //We delete the character from his actual tile
    deleteCharacter()

    //We quit the size of the board to the tile Id
    tileId = tileId - boardWidth
    createPlayer(tileId)
}


//MOVEMETN LEFT
/**
 * Function to searh if the player can move to the left
 * 
 * @returns true ||false
 */
const canPlayerMoveLeft = () => {

    //Check if the rigth tile is a wall or not and checks if its the end of the maze
    if (boardArray[playerPositionI][playerPositionJ - 1] === 1) {

        return false
    }
    if (playerPositionJ - 1 < 0) {
        return false
    }
    return true


}
//Function to move the character to the left
const moveCharacterLeft = () => {
    //We quit one to the position of the player
    playerPositionJ--
    //We delete the character from his actual tile
    deleteCharacter()

    //We quit one to the tile id
    tileId--

    createPlayer(tileId)
}


//MOVEMENT RIGHT
/**
 * Function to check if the right tile is a wall or not
 * 
 * @returns true || false
 */
const canPlayerMoveRigth = () => {

    //Check if the rigth tile is a wall or not and checks if its the end of the maze
    if (boardArray[playerPositionI][playerPositionJ + 1] === 1) {

        return false
    }
    if (playerPositionJ + 1 >= boardWidth) {
        return false
    }
    return true

}

/**
 * Function that moves the player
 * 
 */
const moveCharacterRight = () => {
    //We sum one to the position of the player
    playerPositionJ++
    //We delete the character from his actual tile
    deleteCharacter()

    //We sum one to the tile id
    tileId++

    createPlayer(tileId)

}

//CREATION AND DESTRUCTION OF CHARACTER
/**
 * Function to delete the character from his actual tile
 * 
 */
const deleteCharacter = () => {

    //Search the childs of the tile that the player is in 
    let childsToDelete = arrayFichas[tileId].getElementsByTagName("DIV")

    //We delete it from there
    arrayFichas[tileId].removeChild(childsToDelete[0] )
}

/**
 * Function to create the character in the visible board 
 * 
 * @param {int} tileId //Tile where the character is going to be created
 */
const createPlayer = (tileId) => {
    //Creation of the player 
    character = document.createElement("DIV")

    //Give the style to the character
    character.classList.add("character")

    //We add the player to his tile
    arrayFichas[tileId].append(character)
}

/**
 * Function to check the type of the attack has clicked
 * 
 * @param {*} event //Clicked box
 * @returns String //Type of attack
 */
const checkAttackType = (event) => {
    console.log(event.target)
    if (event.target.id === "fire" || event.target.id === "fireImg") {
        return "fire"
    }
    if (event.target.id === "water" || event.target.id === "waterImg") {
        return "water"
    }
    if (event.target.id === "leaf" || event.target.id === "leafImg") {
        return "leaf"
    }
    else {
        return "noType"
    }
}

/**
 * Function to generate the enemy attack
 * 
 * @returns //Type of the enemy attack
 */
const generateEnemiAttack = () => {    
    let random = Math.floor(Math.random() * 3)
    
    

    //We check what type has been created
    switch (random) {
        case 0:
            return "fire"
    
        case 1:
            return "water"
    
        case 2:
            return "leaf"
        
    }
}

/**
 * Function to compare the attacks of the enemy and the character
 * 
 * @param {*} char //Attack of the character
 * @param {*} enemy //Attack of the enemy
 */
const compareAttacks = (char, enemy) => {
    var tipos = {
        fire: 'leaf',
        leaf: 'water',
        water: 'fire'
    }

    console.log("t"+tipos[char] + "c"+char +"e"+ enemy)
    if (tipos[char] === enemy) {
        return "player"
    } 
    if (tipos[enemy] === char) {
        return "enemy"
    } 
    else{
        return "same"
    }

    
    

}

//FUNCTIONS OF THE BATTLE BOARD WHEN WINNING OR LOOOSING
const endBattle = () =>{
    //Stop showing the battle board
    unshowBattleBoard()

    //Start showing the maze board
    showMazeBoard()
}

/**
 * Function to quit one hp to the player
 */
const quitLife = () =>{
    //One life less
    livesActual--
}

/**
 * Function to show that the player has made a tie
 */
const showTie = () =>{
    logText.textContent = "Guau, ¡Empate!"
}
const showWin = () =>{
    logText.textContent = "ENHORABUENA, ¡Has ganado!"
}
const showLosed = () =>{
    logText.textContent = "Has perdidio una vida..."
}
/**
 * Function to clean the log
 */
const cleanLog = () => {
    logText.textContent = ""
}

/**
 * Function to check if the game has ended
 * 
 * @returns boolean //Returns if the game has ended
 */
const checkLosedGame = () =>{
    if(livesActual <= 0){

        return true
    }

    return false
}

const showLogLosedGame = () =>{
    logText.textContent = "Has muerto... 💀💀💀"
}
const endGameLose = () =>{
    //Delete the normal board
    unshowBattleBoard()

    //Show the losing board
    showLosingBoard()
}

/**
 * Function to disable clicks of the attacks
 */
const disableClicks = () =>  {
    //Select elements from the box
    const clickableElements = attacksBox.querySelectorAll("*")

    clickableElements.forEach(element => {
        element.style.pointerEvents = 'none'
    });
}

/**
 * Function to enable clicks of the attacks
 */
const enableClicks = () =>{
    //Select elements from the attack box
    const clickableElements = attacksBox.querySelectorAll('*')

    clickableElements.forEach(element => {
        element.style.pointerEvents = 'auto';
    });
}


////////////////////////////////////////////////////////////////////////////////
//FLUJO DEL JUEGO
//Creation of the 
document.addEventListener("DOMContentLoaded", () => {
    //Choose what maze is it goingto be used
    chooseMaze()
    //Reset the boards so it shows the maze one and not the battle
    resetBoards()
    //We charge the grid with the tiles depending of the array generated
    loadFloor()
    loadWalls()
    //We also create the start tile, the end and the player 
    loadEndStarPlayer()
    //We load enemies random
    for(let i = 0; i<numberOfEnemies; i++){
        loadEnemies()
    }
      
    //We fill the lives
    fillLives()
    //Clean the log so it doesnt show nothing
    cleanLog()
})

//Movimiento del jugador
document.addEventListener("keydown", (event) => {

    //We make the action of the movement of the player
    moveCharacter(event)

})

//When you press in an attack
attacksBox.addEventListener("click", (event) => {

    //Check the attack type 
    let characterAttack = checkAttackType(event)

    //Generate the enemy type to compare with your attack
    let enemyAttack = generateEnemiAttack()
    

    //Check the attacks and check who wins
    let winner = compareAttacks(characterAttack, enemyAttack)
    
    console.log(winner)


    //If the wiiner is the player the battle ends
    if(winner === "player"){

        //Disable the clicks so the player can attack its enemies
        disableClicks()

        //Show in the log that the player has winned
        showWin()
        
        setTimeout(() => {
            //Finishe the battle
            endBattle()
            enableClicks()
        }, 2000)
        
        //Delete the two characters that there are in the tiles
        deleteCharacter()
        deleteCharacter()

        //We recreate the character 
        createPlayer(tileId)
           
    }
    //If the winner is the enemy 
    if(winner === "enemy"){
        
        quitLife()
        //Show another time the lives now reseted
        showLives(showHearts)
        //Show in the log that you have losed
        showLosed()

    }
    //A tie
    if(winner === "same"){
        console.log("empate")
        cleanLog()
        showTie()
    }

    //Check if player have losed all lives
    if(checkLosedGame()){
        //Disable the clicks so the player can attack its enemies
        disableClicks()
        showLogLosedGame()
        setTimeout(() => {
            endGameLose()
            enableClicks()
        }, 2000)
    }
})

//Button to recharge the game
replay.addEventListener("click",() => {
    location.reload()
})

