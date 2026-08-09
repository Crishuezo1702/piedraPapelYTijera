//Section 
const sectionBotones = document.getElementById("section-botones-modo")
const sectionSeleccionarOpciones = document.getElementById("seleccionar-opciones")
const sectionCombate = document.getElementById("combate")

//Botones
const botonCpu = document.getElementById("boton-solo")
const botonVersus = document.getElementById("boton-versus")
const botonSeleccion = document.getElementById("boton-seleccion")
const botonVolverJugar = document.getElementById("volver-jugar")
const botonNuevaPartida = document.getElementById("nueva-partida")
const botonMute = document.getElementById("boton-mute")

//texto-modficar-variables
const subtituloOpciones = document.getElementById("subtitulo-opciones")
const tituloJugador = document.getElementById("titulo-jugador")
const tituloRival = document.getElementById("titulo-rival")
const textoJugador = document.getElementById("texto-jugador")
const textoRival = document.getElementById("texto-rival")
const resultado = document.getElementById("resultado")

const nombreOpcionJugador = document.getElementById("nombre-opcion-jugador")
const nombreOpcionComputadora = document.getElementById("nombre-opcion-computadora")

//imagen-modificar
const imagenOpcionJugador = document.getElementById("imagen-opcion-jugador")
const imagenOpcionComputadora = document.getElementById("imagen-opcion-computadora")


const piedra = document.getElementById("piedra")
const papel = document.getElementById("papel")
const tijera = document.getElementById("tijera")


// modificar puntos
const puntosJugadorSpan = document.getElementById("puntos-jugador")
const puntosComputadoraSpan= document.getElementById("puntos-computadora")


//variables let 
let modoJuego = ""
let puntosJugador = 0 
let puntosComputadora = 0
let eleccionJugador1 = null

//sonidos
const sonidoSeleccion = new Audio("./assets/seleccion.mp3")
const sonidoClick = new Audio("./assets/click.mp3")
const sonidoVictoriaRonda = new Audio("./assets/victoriaRonda.mp3")
const sonidoDerrotaRonda = new Audio("./assets/derrota-ronda.mp3")
const sonidoDerrotaFinal = new Audio("./assets/derrotaFinal.mp3")
const sonidoEmpate = new Audio("./assets/empate.mp3")
const sonidoVictoriaFinal = new Audio("./assets/victoriaFinal.mp3")

//musica de fondo 
const sonidoFondo = new Audio("./assets/musicaFondo.mp3")
sonidoFondo.loop= true
sonidoFondo.volume = 0.3

window.addEventListener("click",()=> {
    sonidoFondo.play()
}, { once:true})

botonCpu.addEventListener("click", partidaCpu)

botonSeleccion.addEventListener("click", jugar)

botonVersus.addEventListener("click", partidaVersus)


botonVolverJugar.addEventListener("click", volverAJugar)

botonNuevaPartida.addEventListener("click", nuevaPartida)



function partidaVersus(){

    modoJuego = "versus";

    subtituloOpciones.textContent = "Jugador 1: Selecciona tu opcion";
    tituloJugador.textContent = "Jugador 1"
    tituloRival.textContent = "Jugador 2"

    textoJugador.textContent = "Jugador 1"
    textoRival.textContent = "Jugador 2"
    eleccionJugador1 = null;

    
    sectionSeleccionarOpciones.style.display = "flex";
    sectionBotones.style.display = "none";
}

function partidaCpu(){

    modoJuego = "cpu";

    subtituloOpciones.textContent ="Elige tu opcion:"
    tituloJugador.textContent = "Tú"
    tituloRival.textContent = "Computadora"

    textoJugador.textContent = "Jugador"
    textoRival.textContent = "Computadora"

    sectionSeleccionarOpciones.style.display = "flex";
    sectionBotones.style.display = "none";
}

function nuevaPartida(){
    
    puntosJugador = 0
    puntosComputadora = 0
    puntosJugadorSpan.textContent = puntosJugador
    puntosComputadoraSpan.textContent = puntosComputadora

    resultado.textContent =""

    imagenOpcionJugador.src = ""
    imagenOpcionComputadora.src =""

    piedra.checked = false
    papel.checked = false
    tijera.checked = false

    sectionBotones.style.display ="flex"
    sectionSeleccionarOpciones.style.display = "none"
    sectionCombate.style.display = "none"

    botonNuevaPartida.style.display ="none"
    botonVolverJugar.style.display ="flex"

}

function jugar(){

    if(modoJuego === "cpu"){
         const opcionJugador = seleccionarOpcion()

         if(opcionJugador === null){
            return
         }
         sonidoSeleccion.currentTime = 0
         sonidoSeleccion.play()

           const opcionComputadora = seleccionarOpcionComputadora()

           nombreOpcionJugador.textContent = opcionJugador
           nombreOpcionComputadora.textContent = opcionComputadora

            mostrarImagen(opcionJugador,imagenOpcionJugador)
            mostrarImagen(opcionComputadora, imagenOpcionComputadora)

            sectionSeleccionarOpciones.style.display = "none"
            sectionCombate.style.display = "flex"

            combate(opcionJugador,opcionComputadora, "!Ganaste¡","¡La computadora gano la partida!")
    }

    else if(modoJuego === "versus"){
        
    
        if(eleccionJugador1 === null){
            const eleccion = seleccionarOpcion();
            if(eleccion === null) {
              return  
            }
            sonidoSeleccion.currentTime = 0
            sonidoSeleccion.play()
            eleccionJugador1  = eleccion;

            piedra.checked = false
            papel.checked = false
            tijera.checked = false

            subtituloOpciones.textContent = "Jugador 2: Selecciona tu opción";
        }
        else{
            const eleccionJugador2 = seleccionarOpcion()
            if (eleccionJugador2 === null){
                return
            }
            sonidoSeleccion.currentTime = 0
            sonidoSeleccion.play()

            nombreOpcionJugador.textContent = eleccionJugador1
            nombreOpcionComputadora.textContent = eleccionJugador2

            textoJugador.textContent = "Jugador 1"
            textoRival.textContent = "Jugador 2"

            mostrarImagen(eleccionJugador1,imagenOpcionJugador)
            mostrarImagen(eleccionJugador2, imagenOpcionComputadora)

            sectionSeleccionarOpciones.style.display = "none"
            sectionCombate.style.display = "flex"

            combate(eleccionJugador1,eleccionJugador2,"¡Gana Jugador 1!","¡El jugador 2 gano la partida!")

            eleccionJugador1 = null;

        }
    }
   
}

function volverAJugar(){
    sectionSeleccionarOpciones.style.display = "flex"
    sectionCombate.style.display = "none"

    piedra.checked = false
    papel.checked = false
    tijera.checked = false

    resultado.textContent =""

    imagenOpcionJugador.src = ""
    imagenOpcionComputadora.src =""


    nombreOpcionJugador.textContent = ""
    nombreOpcionComputadora.textContent = ""

    subtituloOpciones.textContent =
    modoJuego === "versus"
        ? "Jugador 1: Selecciona tu opción"
        : "Selecciona tu opción";

}


function seleccionarOpcion(){


   if (piedra.checked) {
    return "Piedra"
    }

    if (papel.checked) {
        return "Papel"
    }

    if (tijera.checked) {
        return "Tijera"
    }

    alert("Debes seleccionar una opción")
    return null

}



function seleccionarOpcionComputadora(){

    const numero = aleatorio(1,3)

    if(numero === 1){
        return "Piedra"
    }
    if(numero === 2){
        return "Papel"
    }
    return "Tijera"

}

function combate(jugador, computadora, mensajeGanaJ1, mensajeGanaJ2){
    
    if(jugador === computadora){
         resultado.textContent = "EMPATE"
         sonidoEmpate.currentTime = 0
         sonidoEmpate.play()
         return
    }
    if(
        (jugador === "Piedra" && computadora === "Tijera") ||
        (jugador === "Papel" && computadora === "Piedra") ||
        (jugador === "Tijera" && computadora === "Papel")

    ){
        resultado.textContent = modoJuego === "versus" ? "¡Jugador 1 gana la ronda!" : "¡Ganaste!"
        puntosJugador++
        puntosJugadorSpan.textContent = puntosJugador

        functionSonidoRondaVictoria()

        if(puntosJugador === 3){
            resultado.textContent = "🎉 " + mensajeGanaJ1
            botonVolverJugar.style.display ="none"
            botonNuevaPartida.style.display ="flex"

            functionSonidoVictoriaFinal()
        }
        return
    }
        resultado.textContent = modoJuego === "versus" ? "¡Jugador 2 gana la ronda!" : "¡Perdiste!"
        puntosComputadora++
        puntosComputadoraSpan.textContent = puntosComputadora
        if(modoJuego === "versus"){
            functionSonidoRondaVictoria()
        }
        else{
            sonidoDerrotaRonda.currentTime = 0
            sonidoDerrotaRonda.play()
        }

        if(puntosComputadora ===3){
            resultado.textContent = 
                modoJuego === "cpu"
                    ?"🖥️ " + mensajeGanaJ2
                    : "🏆 " + mensajeGanaJ2
            if(modoJuego ==="versus"){
                functionSonidoVictoriaFinal()
            }
            else{
                sonidoDerrotaFinal.currentTime = 0
                sonidoDerrotaFinal.play()
            }        
            botonVolverJugar.style.display ="none"
            botonNuevaPartida.style.display ="flex"
        }
        
}

function mostrarImagen(opcion,imagen){

    if(opcion ==="Piedra"){
        imagen.src = "./assets/Piedra.png"
    }
    else if( opcion === "Papel"){
        imagen.src =  "./assets/papel-arrugado.png"
    }
    else{
        imagen.src ="./assets/cortar-con-tijeras.png"
    }
}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max-min + 1)+ min)
}

function reproducirClick(){
    sonidoClick.currentTime = 0
    sonidoClick.play()
}

function functionSonidoRondaVictoria(){
    sonidoVictoriaRonda.currentTime=0
    sonidoVictoriaRonda.play()
}

function functionSonidoVictoriaFinal(){
    sonidoVictoriaFinal.currentTime = 0
    sonidoVictoriaFinal.play()
}

botonCpu.addEventListener("click",reproducirClick)
botonVersus.addEventListener("click", reproducirClick)
botonVolverJugar.addEventListener("click", reproducirClick)
botonNuevaPartida.addEventListener("click", reproducirClick)

botonMute.addEventListener("click", () => {

    sonidoFondo.muted = !sonidoFondo.muted

    if(sonidoFondo.muted){
        botonMute.textContent = "🔇"
    }else{
        botonMute.textContent = "🔊"
    }

})

