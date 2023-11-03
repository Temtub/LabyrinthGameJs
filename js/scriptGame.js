import "./gameFunctions"

const boardGrid = document.getElementById("board")
const boardSize = 64

//Array con el que compararemos las posiciones siendo 1 un muro y 0 un suelo 
//El 3 es el inicio y el 4 el final
const boardArray = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [4, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 3, 1]
  ];

//Flujo del juego
document.addEventListener("DOMContentLoaded", () =>{
    cargarSuelo()
    cargarParedes()
    cargarMetaInicio()
})
////////////////////////////////////////////////////////////////////////////////////////////////
//PREGUNTAS: se puede hacer un find a un array bidimensional?, como unir varios ficheros JS?
////////////////////////////////////////////////////////////////////////////////////////////////