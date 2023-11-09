
const board = document.getElementById("board")
const battleBoard = document.getElementById("battleBoard")

const showHearts = document.getElementById("showHearts")
const boardSize = 64

//Array con el que compararemos las posiciones siendo 1 un muro y 0 un suelo 
//El 3 es el inicio y el 4 el final
const boardArray = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [4, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 3, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1]
]

//Lives of the player
const lives = 5
let livesActual = 0

//Var to save the tiles of the board
let arrayFichas = board.getElementsByTagName("SECTION")

//Variable to save the position of the player
let playerPositionI
let playerPositionJ
let tileId

//Variable to save the size of the board
const boardWidth = boardArray[0].length
const boardHeight = boardArray.length;


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

const loadEnemies = () =>{
    let randomTileI, randomTileJ
    
    //We search the tile until is a valid one
    do{
        randomTileI = Math.floor(Math.random()*boardHeight )
        randomTileJ = Math.floor(Math.random()*boardWidth )
    }
    while(checkValidCreationEnemieTile(randomTileI, randomTileJ) )

    createEnemieCharacter(randomTileI, randomTileJ)
    
}

const checkValidCreationEnemieTile = (tileI, tileJ) =>{

    //We check if the tile is a wall or the end line or start line
    if(boardArray[tileI][tileJ]===1 || boardArray[tileI][tileJ]===3 || boardArray[tileI][tileJ]===4){
        return true
    }
    return false
}

const createEnemieCharacter = (posI, posJ)  =>{
    //We create the enemie minotaur
    let enemieCharacter = document.createElement("DIV")
    enemieCharacter.classList.add("characterMinotaur")

    //Generate the enemie in the tile 
    arrayFichas[calculateIndex(posI, posJ) ].append(enemieCharacter)
}

/**
 * Function to calculate the position in the grid based of the array with walls
 * 
 * @param {*} i //Position of the array i
 * @param {*} j //Position of the array j
 * @returns //The number of the position of grid
 */
const calculateIndex = (i, j)=>{
    return (i * boardWidth) + j
}

/**
 * Function that resets the boards showing the board and quitting the battle one
 */
const resetBoards = () =>{
    board.classList.remove("displayNone")
    battleBoard.classList.add("displayNone")
}

//FUNCIONES DEL JUGADOR
/**
 * Function to move detect where the player is moving
 * 
 * @param {*} event 
 */
const moveCharacter = (event) => {
  
    //We declare the variable of the key that have been pushed
    let keyPushed = event.key
    
    //Check if theres an nemy in the next tile
    if(checkEnemieInNextTile(keyPushed) ){

        startBattle()
    }

    //If player pushes rigth arrow or letter D it moves rigth
    if (keyPushed === "ArrowRight" || keyPushed === "d") {
        //We search if the player can move to that tile
        if (canPlayerMoveRigth()) {
            moveCharacterRight()
        }
    }
    if(keyPushed === "ArrowLeft" || keyPushed === "a"){
        if(canPlayerMoveLeft() ){
            moveCharacterLeft()
        }
    }
    if(keyPushed === "ArrowUp" || keyPushed === "w"){
        if(canPlayerMoveTop() ){
            moveCharacterTop()
        } 
    }
    if(keyPushed === "ArrowDown" || keyPushed === "s"){
        if(canPlayerMoveBottom() ){
            moveCharacterBottom()
        } 
    }
    
}

const checkEnemieInNextTile = (key) =>{

    //Check the movement 
    switch (key) {
        //Move left
        case "ArrowLeft":
        case "a":
            //Check if the left tile has an enemie
            if(arrayFichas[tileId-1].hasChildNodes() ){
                return true
            }
            break;
        //Move rigth
        case "ArrowRight":
        case "d":
            if(arrayFichas[tileId+1].hasChildNodes() ){
                return true
            }
            break;
        //Move up
        case "ArrowUp":
        case "w":
            if (arrayFichas[tileId-boardWidth].hasChildNodes()) {
                return true
            }
            break;
        //Move down
        case "ArrowDown":
        case "s":
            if (arrayFichas[tileId+boardWidth].hasChildNodes()) {
                return true
            }
            break;
    }
}

/**
 * Function that starts when you found an enemy
 */
const startBattle = ()=> {
    //We quit the maze board
    unshowMazeBoard()

    //Show the battle board
    createBattleBoard()
}

/**
 * Function to create the battle board
 */
const createBattleBoard = () =>{

    //Show the board
    showBattleBoard()

    //We fill the lives
    fillLives()

    //We show the number of lives
    showLives(showHearts)

    
}

/**
 * Function to quit the main board
 */
const unshowMazeBoard=()=>{
    board.classList.add("displayNone")
}

const showBattleBoard = () =>{
    battleBoard.classList.remove("displayNone")
}

/**
 * Function to fille the hearts of the player
 */
const fillLives = () =>{
    livesActual = lives
}

/**
 * Function to show the lives of the player
 */
const showLives = (container) =>{

    let fragment = document.createDocumentFragment()

    for(let i=0; i < lives; i++){

        let heart
        //If theres less lives than the original ones, then it creates an empty heart
        if(livesActual<=lives && i>livesActual){
            heart = document.createElement("IMG")
            heart.setAttribute("src", "../assets/images/hearts/emptyHeart.png")
            heart.classList.add("heart")

            fragment.append(heart)
        }
        //If not it creates a normal heart
        else{
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
const canPlayerMoveBottom = () =>{
    
    //Check if the rigth tile is a wall or not and checks if its the end of the maze
    if (boardArray[playerPositionI+1][playerPositionJ] === 1  ) {
        return false
    }
    if (playerPositionI+1 < 0) {
        return false
    }
    else {
        return true
    }
    
}
/**
 * Function to move the player to the bottom tile 
 */
const moveCharacterBottom =()=>{
    //We quit one to the position of the player
    playerPositionI++
    //We delete the character from his actual tile
    deleteCharacter()

    //We quit the size of the board to the tile Id
    tileId = tileId+boardWidth
    createPlayer(tileId)
}


//MOVEMENT TOP
/**
 * Function to check if the player can move to the top tile
 * 
 * @returns true ||false
 */
const canPlayerMoveTop = () =>{
    
    //Check if the rigth tile is a wall or not and checks if its the end of the maze
    if (boardArray[playerPositionI-1][playerPositionJ] === 1  ) {
        return false
    }
    if (playerPositionI-1 < 0) {
        return false
    }
    else {
        return true
    }
    
}
/**
 * Function to move the character to the top tile
 */
const moveCharacterTop =()=>{
    //We quit one to the position of the player
    playerPositionI--
    //We delete the character from his actual tile
    deleteCharacter()

    //We quit the size of the board to the tile Id
    tileId = tileId-boardWidth
    createPlayer(tileId)
}


//MOVEMETN LEFT
/**
 * Function to searh if the player can move to the left
 * 
 * @returns true ||false
 */
const canPlayerMoveLeft = () =>{

    //Check if the rigth tile is a wall or not and checks if its the end of the maze
    if (boardArray[playerPositionI][playerPositionJ-1] === 1  ) {

        return false
    }
    if (playerPositionJ-1 < 0) {
        return false
    }
    return true
    

}
//Function to move the character to the left
const moveCharacterLeft =()=>{
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
    if (boardArray[playerPositionI][playerPositionJ+1] === 1  ) {

        return false
    }
    if (playerPositionJ+1>=boardWidth) {
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
const deleteCharacter = () =>{

    //Search the childs of the tile that the player is in 
    let childsToDelete = arrayFichas[tileId].getElementsByTagName("DIV")

    //We delete it from there
    arrayFichas[tileId].removeChild(childsToDelete[0])
}

/**
 * Function to create the character in the visible board 
 * 
 * @param {int} tileId //Tile where the character is going to be created
 */
const createPlayer = (tileId) =>{
    //Creation of the player 
    let character = document.createElement("DIV")

    //Give the style to the character
    character.classList.add("character")

    //We add the player to his tile
    arrayFichas[tileId].append(character)
}

////////////////////////////////////////////////////////////////////////////////
//FLUJO DEL JUEGO
//Creation of the 
document.addEventListener("DOMContentLoaded", () => {
    //Reset the boards so it shows the maze one and not the battle
    resetBoards()
    //We charge the grid with the tiles depending of the array generated
    loadFloor()
    loadWalls()
    //We also create the start tile, the end and the player 
    loadEndStarPlayer()
    //We load enemies random
    loadEnemies()
})

//Movimiento del jugador
document.addEventListener("keydown", (event) => {

    //We make the action of the movement of the player
    moveCharacter(event)

})
