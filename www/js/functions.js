function store1() {
    let nombre = document.getElementById("txtNombre").value;
    let apodo = document.getElementById("txtApodo").value;
    let color = document.getElementById("color").value;

    if (color === "#000000" || color === "#FFFFFF") {
        alert("Elegí otro color que no sea negro o blanco");
    } else {
        Storage.put("nombre", nombre);
        Storage.put("apodo", apodo);
        Storage.put("color", color);

        window.location.href = "index2.html";
    }
}

function store2() {
    let nombre2 = document.getElementById("txtNombre2").value;
    let apodo2 = document.getElementById("txtApodo2").value;
    let color2 = document.getElementById("color2").value;

    if (apodo2 === Storage.get("apodo")) {
        alert("Escribí otro apodo. No puede ser igual al del jugador anterior");
    } else if (color2 === "#000000" || color2 === "#FFFFFF") {
        alert("Elegí otro color que no sea negro o blanco");
    } else {
        Storage.put("nombre2", nombre2);
        Storage.put("apodo2", apodo2);
        Storage.put("color2", color2);

        window.location.href = "home.html";
    }
}

function clear() {
    Storage.kill();
}

function killStorage() {
    Storage.kill();
    window.location.href = "index.html";
}

function cargarUsuarios(){
    document.getElementById("nombre").value = Storage.get("nombre");
    document.getElementById("apodo").value = Storage.get("apodo");
    document.getElementById("color").value = Storage.get("color");
    document.getElementById("nombre2").value = Storage.get("nombre2");
    document.getElementById("apodo2").value = Storage.get("apodo2");
    document.getElementById("color2").value = Storage.get("color2"); 
}

function store1_2(){
    let nombre= document.getElementById("nombre").value;
    let apodo = document.getElementById("apodo").value;
    let color = document.getElementById("color").value;
    if (color === "#000000" || color === "#FFFFFF") {
        alert("Elegí otro color que no sea negro o blanco");
    } else {
        Storage.put("nombre", nombre);
        Storage.put("apodo", apodo);
        Storage.put("color", color);
    }
}

function store2_2(){
    let nombre2 = document.getElementById("nombre2").value;
    let apodo2 = document.getElementById("apodo2").value;
    let color2 = document.getElementById("color2").value;
    if (apodo2 === Storage.get("apodo")) {
        alert("Escribí otro apodo. No puede ser igual al del jugador anterior");
    } else if (color2 === "#000000" || color2 === "#FFFFFF") {
        alert("Elegí otro color que no sea negro o blanco");
    } else {
        Storage.put("nombre2", nombre2);
        Storage.put("apodo2", apodo2);
        Storage.put("color2", color2);
    }
}

function jugadoresypuntos() {
    document.getElementById("p1").innerHTML = Storage.get("apodo") + ": " + Storage.get("puntos1");
    document.getElementById("p2").innerHTML = Storage.get("apodo2") + ": " + Storage.get("puntos2");
    document.getElementById("p1").style.color = Storage.get("color");
    document.getElementById("p2").style.color = Storage.get("color2");
    document.getElementById("p1").style.backgroundColor = "black";
    document.getElementById("p2").style.backgroundColor = "black";
}

function checkLocalStorage() {
    if (Storage.get("apodo") === null) {
        let puntos1 = 0;
        Storage.put("puntos1", puntos1);
        let puntos2 = 0;
        Storage.put("puntos2", puntos2);
    }else{
        window.location.href = "home.html"
    }
}