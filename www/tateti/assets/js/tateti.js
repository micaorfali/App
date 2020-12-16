var valores_tablero = ["", "", "", "", "", "", "", "", ""];
var tablero = document.getElementById("tablero");
var p1 = Storage.get("jugador1");
var p2 = Storage.get("jugador2");
var quienempieza;
var combiancionesganadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var puedejugar = 0;

function dibujarTablero() {
    quienempieza = (Math.floor(Math.random() * 2));
    if (quienempieza === 0) {
        document.getElementById("turno").style.color = Storage.get("jugador1").color;
        document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("jugador1").apodo + " (O)";
    } else {
        document.getElementById("turno").style.color = Storage.get("jugador2").color;
        document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("jugador2").apodo + " (X)";
    }
    for (i = 0; i < 9; i++) {
        let casillero = document.createElement("div");
        casillero.setAttribute("class", "casillero");
        casillero.setAttribute("data-casillero-index", i);
        casillero.appendChild(document.createTextNode(" "));
        tablero.appendChild(casillero);
        casillero.onclick = evt => {
            if (casillero.getAttribute("data-jugador-index") == null && puedejugar === 0) {
                //1 jugador cruz, 0 jugador circulo
                if (quienempieza == 1) {
                    casillero.setAttribute("data-jugador-index", 1);
                    casillero.innerHTML = "X";
                    valores_tablero[evt.target.getAttribute("data-casillero-index")] = 1;
                    document.getElementById("turno").style.color = Storage.get("jugador1").color;
                    document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("jugador1").apodo + " (O)";

                    quienempieza = 0;
                    for (j = 0; j < 8; j++) {
                        let combinacionesseleccionadas = combiancionesganadoras[j];
                        let a = valores_tablero[combinacionesseleccionadas[0]];
                        let b = valores_tablero[combinacionesseleccionadas[1]];
                        let c = valores_tablero[combinacionesseleccionadas[2]];
                        if (a === "" || b === "" || c === "") {
                            continue;
                        }
                        if (a === b && b === c) {
                            document.getElementById("turno").style.color = Storage.get("jugador2").color;
                            document.getElementById("turno").innerHTML = "Ganó " + Storage.get("jugador2").apodo + " (X)";
                            p2.puntos = p2.puntos + 200;
                            Storage.put("jugador2", p2);
                            document.getElementById("mostrar").style.display = "inline-flex";
                            document.getElementById("tablero").classList.remove("marginbottom");
                            puedejugar = 1;
                            break;
                        }
                    }
                } else {
                    document.getElementById("turno").style.color = Storage.get("jugador2").color;
                    document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("jugador2").apodo + " (X)";
                    casillero.setAttribute("data-jugador-index", 0);
                    casillero.innerHTML = "O";
                    valores_tablero[evt.target.getAttribute("data-casillero-index")] = 0;
                    quienempieza = 1;
                    for (j = 0; j < 8; j++) {
                        let combinacionesseleccionadas = combiancionesganadoras[j];
                        let a = valores_tablero[combinacionesseleccionadas[0]];
                        let b = valores_tablero[combinacionesseleccionadas[1]];
                        let c = valores_tablero[combinacionesseleccionadas[2]];
                        if (a === "" || b === "" || c === "") {
                            continue;
                        }
                        if (a === b && b === c) {
                            document.getElementById("turno").style.color = Storage.get("jugador1").color;
                            document.getElementById("turno").innerHTML = "Ganó " + Storage.get("jugador1").apodo;
                            p1.puntos = p1.puntos + 200;
                            Storage.put("jugador1", p1);
                            document.getElementById("mostrar").style.display = "inline-flex";
                            document.getElementById("tablero").classList.remove("marginbottom");
                            puedejugar = 1;
                            break;
                        }
                    }
                }
            }
            if (!valores_tablero.includes("")) {
                document.getElementById("turno").style.color = "white";
                document.getElementById("turno").innerHTML = "Empate!"
                document.getElementById("mostrar").style.display = "inline-flex";
                document.getElementById("tablero").classList.remove("marginbottom");
                puedejugar = 1;
            }
        }
    }
}
