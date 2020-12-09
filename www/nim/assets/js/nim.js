var quienempieza;
var juego = document.getElementById("filas");

var arrPalitosSel = [];
var contPalitos = 0;
var arrFilas = [];
var arrPalitos = [];

function empezarJuego() {
    quienempieza = (Math.floor(Math.random() * 2));
    console.log(quienempieza);
    if (quienempieza === 0) {
        document.getElementById("turno").style.color = Storage.get("jugador1").color;
        document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("jugador1").apodo;
    } else {
        document.getElementById("turno").style.color = Storage.get("jugador2").color;
        document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("jugador2").apodo;
    }
}

function seleccionado(id) {
    if (document.getElementById(id).getAttribute("src") != "assets/img/palito-seleccionado.png" && document.getElementById(id).getAttribute("src") != "assets/img/palito-tachado.png") {
        contPalitos++;
        console.log(document.getElementById(id));
        arrPalitosSel.push(id);
        arrFilas.push(document.getElementById(id).getAttribute("data-fila-index"));
        if (contPalitos > 1) {
            if (document.getElementById(id).getAttribute("data-fila-index") === arrFilas[0]) {
                document.getElementById(id).src = "assets/img/palito-seleccionado.png";
                console.log("se selecciono");
            } else {
                contPalitos--;
                arrPalitosSel.pop();
                arrFilas.pop();
            }
        } else if (contPalitos === 1) {
            document.getElementById(id).src = "assets/img/palito-seleccionado.png";
            console.log("se selecciono");
            document.getElementById(id).setAttribute("data-palito-index", contPalitos - 1);
        }
    } else if (document.getElementById(id).getAttribute("src") === "assets/img/palito-seleccionado.png") {
        document.getElementById(id).src = "assets/img/palito.png";
        console.log("se deselecciono");
        contPalitos--;
        arrPalitosSel.splice(arrPalitosSel.indexOf(document.getElementById(id).getAttribute("id")), 1);
        console.log(arrPalitosSel);
        arrFilas.splice(arrFilas.indexOf(document.getElementById(id).getAttribute("data-palito-index")), 1);
        console.log(arrFilas);
    }
}

function boton() {
    if (contPalitos > 1 && !arrPalitosSel.includes("1")) {
        for (i = 0; i < arrPalitosSel.length; i++) {
            if (document.getElementById(arrPalitosSel[i]).src != document.getElementById((parseInt(arrPalitosSel[i])+1).toString()).src && document.getElementById(arrPalitosSel[i]).src != document.getElementById((parseInt(arrPalitosSel[i])-1).toString()).src) {
                alert("Los palitos seleccionados tienen que ser consecutivos");
                break;
            }else if(document.getElementById(arrPalitosSel[i]).src === document.getElementById((parseInt(arrPalitosSel[i])+1).toString()).src || document.getElementById(arrPalitosSel[i]).src === document.getElementById((parseInt(arrPalitosSel[i])-1).toString()).src){
                cambiarJugadorNim();
                console.log("cambia jugador");
            }
        }
    }else if(contPalitos === 1){
        cambiarJugadorNim();
    }
}

function cambiarJugadorNim(){
    if (quienempieza === 0) {
        quienempieza = 1;
        document.getElementById("turno").style.color = Storage.get("jugador2").color;
        document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("jugador2").apodo;
    } else {
        quienempieza = 0;
        document.getElementById("turno").style.color = Storage.get("jugador1").color;
        document.getElementById("turno").innerHTML = "Turno de: " + Storage.get("jugador1").apodo;
    }
    for(i=0; i<arrPalitosSel.length; i++){
        document.getElementById(arrPalitosSel[i]).src = "assets/img/palito-tachado.png";
    }
    for(i=0; i<arrPalitosSel.length; i++){
        arrPalitos.push("1");
    }

    contPalitos = 0;
    arrPalitosSel= [];
    arrFilas = [];

    if(arrPalitos.length === 15){
        finalizarJuego();
    }
}

function finalizarJuego(){
    if(quienempieza === 0){
        document.getElementById("turno").style.color = Storage.get("jugador2").color;
        document.getElementById("turno").innerHTML = "Ganó: " + Storage.get("jugador2").apodo;
    } else{
        document.getElementById("turno").style.color = Storage.get("jugador1").color;
        document.getElementById("turno").innerHTML = "Ganó: " + Storage.get("jugador1").apodo;
    }
}