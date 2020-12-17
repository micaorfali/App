var contenedorDados = document.getElementById("contenedorDados");
var p1 = Storage.get("jugador1");
var p2 = Storage.get("jugador2");
var estadoDelJuego = {
    dados: [],
    dadosSeleccionados: [],
    jugador: Math.floor(Math.random() * 2) + 1,
    contTiros: 0,
    puntajes: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    jugadas: 0
};

function tirarDado() {
    return Math.floor(Math.random() * 6) + 1;
}

function nombresTabla() {
    document.getElementById("jugador1").innerHTML = p1.apodo;
    document.getElementById("jugador2").innerHTML = p2.apodo;
    document.getElementById("jugador1").style.color = p1.color;
    document.getElementById("jugador2").style.color = p2.color;
}

function tirarDados() {
    if (estadoDelJuego.dadosSeleccionados.length === 0) {
        estadoDelJuego.dadosSeleccionados = [0, 1, 2, 3, 4];
    }
    estadoDelJuego.dadosSeleccionados.forEach(indice => {
        estadoDelJuego.dados[indice] = tirarDado();
    });
    estadoDelJuego.dados.sort((a, b) => { return a - b; });
    estadoDelJuego.contTiros++;
    actualizarPantalla();
    if (estadoDelJuego.contTiros === 3) {
        forzarAnotarPuntos();
    }
}

function forzarAnotarPuntos() {
    habilitarBotonTirar(false);
    document.querySelectorAll("#contenedirDados div img").forEach(img => {
        img.onclick = null;
    });
}

function actualizarPantalla() {
    estadoDelJuego.dadosSeleccionados = [];
    if (estadoDelJuego.dados.length === 0) {
        dadosReset();
    } else {
        contenedorDados.innerHTML = null;
        for (let i = 0; i < 5; i++) {
            contenedorDados.appendChild(dibujarDado(i, estadoDelJuego.dados[i], true));
        }
        if (estadoDelJuego.jugador === 1) {
            document.getElementById("turno").innerHTML = p1.apodo;
            document.getElementById("turno").style.color = p1.color;
        } else {
            document.getElementById("turno").innerHTML = p2.apodo;
            document.getElementById("turno").style.color = p2.color;
        }
        document.getElementById("tiro").innerHTML = estadoDelJuego.contTiros;
        document.querySelectorAll("#puntajes td").forEach(celda => celda.classList.remove("jugando"));
        document.querySelectorAll("#puntajes td:nth-of-type(" + estadoDelJuego.jugador + ")").forEach(celda => celda.classList.add("jugando"));
        document.querySelectorAll("#puntajes th").forEach(celda => celda.classList.remove("jugando"));
        document.querySelectorAll("#puntajes th:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")").forEach(celda => celda.classList.add("jugando"));
    }
}

function anotarPuntos(juego) {
    let celda = document.querySelector("#puntajes tr:nth-of-type(" + (juego + 1) + ") td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
    if (!celda.classList.contains("anotado")) {
        let generalaForzadaPorDoble = false;
        let dobleForzadaPorGenerala = false;
        switch (juego) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = puntos(juego + 1);
                break;
            case 6:
                estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = esEscalera() ? puntosJuegoEspecial(20) : 0;
                break;
            case 7:
                estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = esFull() ? puntosJuegoEspecial(30) : 0;
                break;
            case 8:
                estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = esPoker() ? puntosJuegoEspecial(40) : 0;
                break;
            case 9:
                if (esGenerala()) {
                    if (estadoDelJuego.contTiros === 1) {
                        if (estadoDelJuego.jugador === 0) {
                            document.getElementById("mostrarganador").style.display = "inline-block";
                            document.getElementById("mostrarganador").innerHTML = "Ganó: " + p2.apodo;
                            p2.puntos = p2.puntos + 400;
                            Storage.put("jugador2", p2);
                            document.getElementById("botonTirarDados").style.display = "none";
                            document.getElementById("estadodeljuego").style.display = "none";
                            document.getElementById("contenedorDados").style.display = "none";
                            document.getElementById("tabla").style.display = "none";
                        } else {
                            document.getElementById("mostrarganador").style.display = "inline-block";
                            document.getElementById("mostrarganador").innerHTML = "Ganó: " + p1.apodo;
                            p1.puntos = p1.puntos + 400;
                            Storage.put("jugador1", p1);
                            document.getElementById("botonTirarDados").style.display = "none";
                            document.getElementById("estadodeljuego").style.display = "none";
                            document.getElementById("contenedorDados").style.display = "none";
                            document.getElementById("tabla").style.display = "none";
                        }
                        estadoDelJuego.puntajes[(estadoDelJuego.jugador - 1)][juego] = 400;
                        juegoTerminado();
                    } else {
                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = puntosJuegoEspecial(50);
                    }
                } else {
                    if (document.querySelector("#puntajes tr:nth-of-type(11) td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")").classList.contains("anotado")) {
                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = 0;
                    } else {
                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][10] = 0;
                        dobleForzadaPorGenerala = true;
                    }
                }
                break;
            case 10:
                if (!esGenerala()) {
                    estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = 0;
                } else {
                    if (estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][9] > 0) {
                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = puntosJuegoEspecial(100);
                    } else {
                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][9] = puntosJuegoEspecial(50);
                        generalaForzadaPorDoble = true;
                    }
                }
                break;
        }

        if (!generalaForzadaPorDoble && !dobleForzadaPorGenerala) {
            celda.innerHTML = estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] === 0 ? "X" : estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego];
            celda.classList.add("anotado");
        } else if (generalaForzadaPorDoble) {
            let celdaG = document.querySelector("#puntajes tr:nth-of-type(10) td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
            celdaG.innerHTML = estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][9] === 0 ? "X" : estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][9];
            celdaG.classList.add("anotado");
        } else if (dobleForzadaPorGenerala) {
            let celdaDG = document.querySelector("#puntajes tr:nth-of-type(11) td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
            celdaDG.innerHTML = "X";
            celdaDG.classList.add("anotado");
        }
        let celdaTotal = document.querySelector("#puntajes tr:nth-of-type(12) td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
        celdaTotal.innerHTML = totalPuntos();
        cambiarJugador();
    }
}

function puntosJuegoEspecial(puntosJuego) {
    return estadoDelJuego.contTiros === 1 ? puntosJuego + 5 : puntosJuego;
}

function totalPuntos() {
    return estadoDelJuego.puntajes[estadoDelJuego.jugador - 1].reduce((total, puntaje) => {
        return total + puntaje;
    }, 0);
}

let totalp1, totalp2;
function quienGano() {
    document.getElementById("cartelganador").style.display = "block";
    estadoDelJuego.puntajes[0].reduce((total, puntaje) => {
        totalp1 = total + puntaje;
        return total + puntaje;
    }, 0);
    estadoDelJuego.puntajes[1].reduce((total, puntaje) => {
        totalp2 = total + puntaje;
        return total + puntaje;
    }, 0);

    if (totalp1 < totalp2) {
        document.getElementById("mostrarganador").style.display = "inline-block";
        document.getElementById("mostrarganador").innerHTML = "Ganó: " + p2.apodo;
        document.getElementById("puntostotales2").style.display = "inline-block";
        document.getElementById("puntostotales2").style.color = p2.color;
        document.getElementById("puntostotales2").innerHTML = p2.apodo + " => " + totalp2 + " puntos";
        document.getElementById("puntostotales2").style.backgroundColor = "rgba(221, 212, 212, 0.8)";
        document.getElementById("puntostotales1").style.display = "inline-block";
        document.getElementById("puntostotales1").style.color = p1.color;
        document.getElementById("puntostotales1").innerHTML = p1.apodo + " => " + totalp1 + " puntos";
        document.getElementById("puntostotales1").style.backgroundColor = "rgba(221, 212, 212, 0.8)";
        p2.puntos = p2.puntos + 400;
        Storage.put("jugador2", p2);
        document.getElementById("botonTirarDados").style.display = "none";
        document.getElementById("estadodeljuego").style.display = "none";
        document.getElementById("contenedorDados").style.display = "none";
        document.getElementById("tabla").style.display = "none";
    } else if (totalp2 < totalp1) {
        document.getElementById("mostrarganador").style.display = "inline-block";
        document.getElementById("mostrarganador").innerHTML = "Ganó: " + p1.apodo;
        document.getElementById("puntostotales1").style.display = "inline-block";
        document.getElementById("puntostotales1").style.color = p1.color;
        document.getElementById("puntostotales1").innerHTML = p1.apodo + " => " + totalp1 + " puntos";
        document.getElementById("puntostotales1").style.backgroundColor = "rgba(221, 212, 212, 0.8)";
        document.getElementById("puntostotales2").style.backgroundColor = "rgba(221, 212, 212, 0.8)";
        document.getElementById("puntostotales2").style.display = "inline-block";
        document.getElementById("puntostotales2").style.color = p2.color;
        document.getElementById("puntostotales2").innerHTML = p2.apodo + " => " + totalp2 + " puntos";
        p1.puntos = p1.puntos + 400;
        Storage.put("jugador1", p1);
        document.getElementById("botonTirarDados").style.display = "none";
        document.getElementById("estadodeljuego").style.display = "none";
        document.getElementById("contenedorDados").style.display = "none";
        document.getElementById("tabla").style.display = "none";
    } else {
        document.getElementById("mostrarganador").style.display = "inline-block";
        document.getElementById("mostrarganador").innerHTML = "Empate!";
        document.getElementById("puntostotales1").style.display = "inline-block";
        document.getElementById("puntostotales1").style.color = p1.color;
        document.getElementById("puntostotales1").innerHTML = p1.apodo + " => " + totalp1 + " puntos";
        document.getElementById("puntostotales1").style.display = "inline-block";
        document.getElementById("puntostotales2").style.display = "inline-block";
        document.getElementById("puntostotales2").style.color = p2.color;
        document.getElementById("puntostotales2").innerHTML = p2.apodo + " => " + totalp2 + " puntos";
        document.getElementById("puntostotales2").style.backgroundColor = "rgba(221, 212, 212, 0.8)";
        document.getElementById("puntostotales1").style.backgroundColor = "rgba(221, 212, 212, 0.8)";
        document.getElementById("botonTirarDados").style.display = "none";
        document.getElementById("estadodeljuego").style.display = "none";
        document.getElementById("contenedorDados").style.display = "none";
        document.getElementById("tabla").style.display = "none";
    }
}

function cambiarJugador() {
    //actualizar estado del juego
    estadoDelJuego.contTiros = 0;
    estadoDelJuego.dados = [];
    estadoDelJuego.dadosSeleccionados = [];
    estadoDelJuego.jugador = estadoDelJuego.jugador === 2 ? 1 : 2;
    estadoDelJuego.jugadas++;
    document.getElementById("turno").innerHTML = "";
    document.getElementById("tiro").innerHTML = "";
    actualizarPantalla();
    if (estadoDelJuego.jugadas === 11 * estadoDelJuego.puntajes.length) {
        juegoTerminado();
    }
    habilitarBotonTirar(true);
}

function habilitarBotonTirar(habilitar) {
    let boton = document.querySelector("#botonTirarDados");
    if (habilitar) {
        boton.setAttribute("onclick", "tirarDados();");
        boton.classList.remove("disabled");
    } else {
        boton.setAttribute("onclick", "");
        boton.classList.add("disabled");
    }
}

function dadosReset() {
    contenedorDados.innerHTML = null;
    for (let i = 0; i < 5; i++) {
        contenedorDados.appendChild(dibujarDado(i, 0));
    }
}

function dibujarDado(i, valor, setupHandler) {
    let dado = document.createElement("div");
    let imgdado = document.createElement("img");
    imgdado.setAttribute("src", "assets/img/dados" + valor + ".png");
    imgdado.setAttribute("data-dado-index", i);
    dado.appendChild(imgdado);

    if (setupHandler) {
        imgdado.onclick = evt => {
            let dadoSeleccionado = parseInt(evt.target.getAttribute("data-dado-index"));
            if (estadoDelJuego.dadosSeleccionados.indexOf(dadoSeleccionado) === -1) {
                estadoDelJuego.dadosSeleccionados.push(dadoSeleccionado);
                evt.target.classList.add("seleccionado");
            } else {
                estadoDelJuego.dadosSeleccionados.splice(estadoDelJuego.dadosSeleccionados.indexOf(dadoSeleccionado), 1);
                evt.target.classList.remove("seleccionado");
            }
        };
    }
    return dado;
}

function juegoTerminado() {
    quienGano();
    habilitarBotonTirar(false);
    document.getElementById("reiniciar").style.display = "block";
}

function esEscalera() {
    return (/12345|23456|13456/).test(dadosComoString());
}

function esFull() {
    return (/1{3}(22|33|44|55|66)|2{3}(33|44|55|66)|3{3}(44|55|66)|4{3}(55|66)|5{3}(66)|1{2}(222|333|444|555|666)|2{2}(333|444|555|666)|3{2}(444|555|666)|4{2}(555|666)|5{2}(666)/).test(dadosComoString());
}

function esPoker() {
    return (/1{4}|2{4}|3{4}|4{4}|5{4}|6{4}/).test(dadosComoString());
    //return (/1{4}(2|3|4|5|6)|2{4}(1|3|4|5|6)|3{4}(1|2|4|5|6)|4{4}(1|2|3|5|6)|5{4}(1|2|3|4|6)|6{4}(1|2|3|4|5)/).test(dadosComoString());
}

function esGenerala() {
    return (/1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/).test(dadosComoString());
}

function puntos(elDado) {
    let puntosSumados = 0;
    estadoDelJuego.dados.forEach(dado => {
        puntosSumados += (elDado === dado) ? elDado : 0;
    });
    return puntosSumados;
}

function dadosComoString() {
    return estadoDelJuego.dados.join('');
}