function store1() {
    let nombre1 = document.getElementById("txtNombre").value;
    document.getElementById("txtNombre").required = true;
    let apodo1 = document.getElementById("txtApodo").value;
    document.getElementById("txtApodo").required = true;
    let color1 = document.getElementById("color").value;

    if (apodo1 === "" || nombre1 === "") {
        alert("Completá todos los campos :)");
    } else {
        if (color1 === "#000000" || color1 === "#FFFFFF") {
            alert("Elegí otro color que no sea negro o blanco");
        } else {
            if (document.getElementById("foto").src === "") {
                alert("Falta la foto!")
            } else {
                let jugador1 = {
                    nombre: document.getElementById("txtNombre").value,
                    apodo: document.getElementById("txtApodo").value,
                    color: document.getElementById("color").value,
                    foto: document.getElementById("foto").src,
                    puntos: 0
                }
                Storage.put("jugador1", jugador1);
                /*Storage.put("foto", foto);
                Storage.put("nombre", nombre);
                Storage.put("apodo", apodo);
                Storage.put("color", color);*/
                window.location.href = "index2.html";
            }
        }
    }
}

function store2() {
    let nombre2b = document.getElementById("txtNombre2").value;
    document.getElementById("txtNombre2").required = true;
    let apodo2b = document.getElementById("txtApodo2").value;
    document.getElementById("txtApodo2").required = true;
    let color2b = document.getElementById("color2").value;

    if (apodo2b === "" || nombre2b === "") {
        alert("Completá todos los campos :)");
    } else if (apodo2b === Storage.get("apodo")) {
        alert("Escribí otro apodo. No puede ser igual al del jugador anterior");
    } else if (color2b === "#000000" || color2b === "#FFFFFF") {
        alert("Elegí otro color que no sea negro o blanco");
    } else if (document.getElementById("foto").src === "") {
            alert("Falta la foto!")
        }
        else {
            //let foto2 = document.getElementById("foto").src;
            let jugador2 = {
                nombre: document.getElementById("txtNombre2").value,
                apodo: document.getElementById("txtApodo2").value,
                color: document.getElementById("color2").value,
                foto: document.getElementById("foto").src,
                puntos: 0
            }
            Storage.put("jugador2", jugador2);
            /*Storage.put("foto2", foto2);
            Storage.put("nombre2", nombre2);
            Storage.put("apodo2", apodo2);
            Storage.put("color2", color2);*/
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

function cargarUsuarios() {
    document.getElementById("nombre").value = Storage.get("jugador1").nombre;
    document.getElementById("apodo").value = Storage.get("jugador1").apodo;
    document.getElementById("color").value = Storage.get("jugador1").color;
    document.getElementById("foto").src = Storage.get("jugador1").foto;
    document.getElementById("nombre2").value = Storage.get("jugador2").nombre2;
    document.getElementById("apodo2").value = Storage.get("jugador2").apodo2;
    document.getElementById("color2").value = Storage.get("jugador2").color2;
    document.getElementById("foto2").src = Storage.get("jugador2").foto2;
}

function store1_2() {
    //let nombre = document.getElementById("nombre").value;
    //let apodo = document.getElementById("apodo").value;
    let color = document.getElementById("color").value;
    //let foto = document.getElementById("foto").src;
    if (color === "#000000" || color === "#FFFFFF") {
        alert("Elegí otro color que no sea negro o blanco");
    } else {
        let jugador1 = {
            nombre: document.getElementById("txtNombre").value,
            apodo: document.getElementById("txtApodo").value,
            color: document.getElementById("color").value,
            foto: document.getElementById("foto").src
        }
        Storage.put("jugador1", jugador1);
        /*Storage.put("foto", foto);
        Storage.put("nombre", nombre);
        Storage.put("apodo", apodo);
        Storage.put("color", color);*/
    }
}

function store2_2() {
    //let nombre2 = document.getElementById("nombre2").value;
    let apodo2 = document.getElementById("apodo2").value;
    let color2 = document.getElementById("color2").value;
    //let foto2 = document.getElementById("foto2").src;
    if (apodo2 === Storage.get("apodo")) {
        alert("Escribí otro apodo. No puede ser igual al del jugador anterior");
    } else if (color2 === "#000000" || color2 === "#FFFFFF") {
        alert("Elegí otro color que no sea negro o blanco");
    } else {
        let jugador2 = {
            nombre: document.getElementById("txtNombre2").value,
            apodo: document.getElementById("txtApodo2").value,
            color: document.getElementById("color2").value,
            foto: document.getElementById("foto2").src
        }
        Storage.put(jugador2);

        /*Storage.put("foto2", foto2);
        Storage.put("nombre2", nombre2);
        Storage.put("apodo2", apodo2);
        Storage.put("color2", color2);*/
    }
}

function jugadoresypuntos() {
    document.getElementById("p1").innerHTML = Storage.get("jugador1").apodo + ": " + Storage.get("jugador1").puntos;
    document.getElementById("p2").innerHTML = Storage.get("jugador2").apodo + ": " + Storage.get("jugador2").puntos;
    document.getElementById("p1").style.color = Storage.get("jugador1").color;
    document.getElementById("p2").style.color = Storage.get("jugador2").color;
}

function checkLocalStorage() {
    if (Storage.get("jugador1") == null || Storage.get("jugador2") == null) {
        Storage.kill();
        window.location.href = "index.html";
    } else if(Storage.get("jugador1") != null && Storage.get("jugador2") != null){
        window.location.href = "home.html"
    }
}

function checkLocalStorageHome(){
    if (Storage.get("jugador1") == null || Storage.get("jugador2") == null) {
        Storage.kill();
        window.location.href = "index.html";
    }
}