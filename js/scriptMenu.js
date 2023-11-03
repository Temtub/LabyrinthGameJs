let playButton = document.getElementById("playButton")

const createAnimation = () =>{

    //Si contiene la clase para desinclinarlo la quitamos
    if(playButton.classList.contains("buttonPlay__animationUnincline")){
        playButton.classList.remove("buttonPlay__animationUnincline")
    }

    //Le añadimos la clase de la animación
    playButton.classList.add("buttonPlay__animationIncline")

    // Añadimos un temporizador de 1 sec para que vuelva a su posicion original
    setTimeout(() => {
        playButton.classList.remove("buttonPlay__animationIncline")
        playButton.classList.add("buttonPlay__animationUnincline")
    }, "1000");

    setTimeout(() => { }, "1000");
    
}

//Cuando pase la animacion creamos la funcion
playButton.addEventListener("mouseover", createAnimation)