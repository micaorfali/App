// "" es vacio, 1 es jugadorcruz, 0 es jugadorcirculo
let valores_tablero = ["", "", "", "", "", "", "", "", ""];
let tablero = document.getElementById("tablero");
//let JugadorCruz;
//let JugadorCirculo;
let quienempieza;
let combiancionesganadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function dibujarTablero() {
    quienempieza = (Math.floor(Math.random() * 2));
    console.log(quienempieza);
    if (quienempieza === 0) {
        document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("apodo");
        document.getElementById("turno").style.color = Storage.get("color");
    } else {
        document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("apodo2");
        document.getElementById("turno").style.color = Storage.get("color2");
    }
    for (i = 0; i < 9; i++) {
        let casillero = document.createElement("div");
        casillero.setAttribute("class", "casillero");
        casillero.setAttribute("data-casillero-index", i);
        casillero.appendChild(document.createTextNode(" "));
        tablero.appendChild(casillero);
        casillero.onclick = evt => {
            console.log(quienempieza);
            if (casillero.getAttribute("data-jugador-index") == null) {
                //1 jugador cruz, 0 jugador circulo
                if (quienempieza == 1) {
                    casillero.setAttribute("data-jugador-index", 1);
                    casillero.innerHTML = "X";
                    //casillero.appendChild(cruzocirculo);
                    valores_tablero[evt.target.getAttribute("data-casillero-index")] = 1;
                    document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("apodo");
                    document.getElementById("turno").style.color = Storage.get("color");
                    quienempieza = 0;
                    for (j = 0; j < 8; j++) {
                        let combinacionesseleccionadas = combiancionesganadoras[j];
                        let a = valores_tablero[combinacionesseleccionadas[0]];
                        let b = valores_tablero[combinacionesseleccionadas[1]];
                        let c = valores_tablero[combinacionesseleccionadas[2]];
                        console.log(a, b, c);
                        if (a === "" || b === "" || c === "") {
                            continue;
                        }
                        if (a === b && b === c) {
                            console.log("ganador");
                            tablero.setAttribute("class", "nodisp");
                            document.getElementById("turno").setAttribute("class", "nodisp");
                            document.getElementById("textocartel").innerHTML = "Ganó " + Storage.get("apodo2");
                            Storage.put("puntos2", (Storage.get("puntos2") + 200));
                            document.getElementById("mostrar").style.display = "block";

                            break;
                        }
                    }
                } else {
                    document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("apodo2");
                    document.getElementById("turno").style.color = Storage.get("color2");
                    casillero.setAttribute("data-jugador-index", 0);
                    casillero.innerHTML = "O";
                    //casillero.appendChild(cruzocirculo);
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
                            console.log("ganador");
                            tablero.setAttribute("class", "nodisp");
                            document.getElementById("turno").setAttribute("class", "nodisp");
                            document.getElementById("textocartel").innerHTML = "Ganó " + Storage.get("apodo");
                            Storage.put("puntos1", (Storage.get("puntos1") + 200));
                            document.getElementById("mostrar").style.display = "block";
                            break;
                        }
                    }
                }
            }
            if (!valores_tablero.includes("")) {
                console.log("empate");
                tablero.setAttribute("class", "nodisp");
                document.getElementById("turno").setAttribute("class", "nodisp");
                document.getElementById("textocartel").innerHTML = "Empate.";
                document.getElementById("mostrar").style.display = "block";
            }
        }
    }
}
