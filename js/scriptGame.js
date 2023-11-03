
const boardGrid = document.getElementById("board")
const boardSize = 64

//Array con el que compararemos las posiciones siendo 1 un muro y 0 un suelo 
//El 3 es el inicio y el 4 el final
const boardArray = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [4, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 3, 0 , 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1]
]

//Variable para guardar la posicion del jugador
let playerPosition

//Functions of the game
/**
 * Funcion que carga las fichas del tablero que son suelos formado por divs y grids
 */
const cargarSuelo = () =>{

  let fragment = document.createDocumentFragment()

  for(let i=0; i< boardSize; i++){

      let floor=document.createElement("DIV")
      floor.classList.add("floorTile")
      floor.id = i
      
      fragment.append(floor)

  }

  boardGrid.append(fragment)
}

const cargarParedes = () =>{
  //Array que contiene todas las fichas en un array
  let arrayFichas = boardGrid.getElementsByTagName("DIV")
  let contadorFichas=0

  //Recorremos el array
  for(let i = 0; i<boardArray.length; i++){

      for(let j=0; j<boardArray.length; j++){

          //Comprobamos si es un muro
          if(boardArray[i][j]== 1){
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
const cargarMetaInicioJugador = () =>{
  let arrayFichas = boardGrid.getElementsByTagName("DIV")
  let contadorFichas=0

  for(let i = 0; i<boardArray.length; i++){

      for(let j=0; j<boardArray.length; j++){

          if(boardArray[i][j] == 4){
              arrayFichas[contadorFichas].classList.remove("floorTile")
              arrayFichas[contadorFichas].classList.add("endTile")
          }
          if(boardArray[i][j] == 3){
              arrayFichas[contadorFichas].classList.remove("floorTile")
              arrayFichas[contadorFichas].classList.add("endTile")

              //Creacion del jugador y colocación en su ficha inicial
              let character = document.createElement("DIV")
              //Le damos sus estilos
              character.classList.add("character")
              //Guardamos la posicion del jugador
              playerPosition = boardArray[i][j]
              //Lo incluimos en su ficha
              arrayFichas[contadorFichas].append(character)
              
          }
          contadorFichas++
      }
  }
}


//FUNCIONES DEL JUGADOR

const moveCharacter =(event) =>{
  console.log(event)
  let key = event.target

  if(key == "ArrowRight")
  
}
//Creacion del tablero
document.addEventListener("DOMContentLoaded", () =>{
    cargarSuelo()
    cargarParedes()
    cargarMetaInicioJugador()
})

//Movimiento del jugador
document.addEventListener("keydown", moveCharacter)
