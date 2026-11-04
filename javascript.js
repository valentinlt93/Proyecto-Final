function validarLuhn(numero) {

    let suma = 0;                                       

    let duplicar = false;                               



    for (let i = numero.length - 1; i >= 0; i--) {        

        let digito = Number(numero[i]);                 

        

        if (duplicar) {                                 

            digito *= 2;                                

            if (digito > 9) {                           

                digito -= 9;

            }

        } 



        suma += digito;                                      

        duplicar = !duplicar;                               

    }

    return suma % 10 === 0;                             

}



function validarTarjeta(numero){

    if (!/^\d+$/.test(numero)) {     // verifica que son solo numeros                     

        return false;                                   

    }

    return validarLuhn(numero);                         

}





//console.log("¿Es válida?: ", validarTarjeta("4000-1234-ABCD"));    profe esto es para validar si da false 

//console.log("¿Es válida 4000123456789017?: ", validarTarjeta("4000123456789017"));  y esta tiene que dar true es una visa



// =====================================================================
// AGREGADO (aprobado): conexión con la página.
// El código de arriba (validarLuhn y validarTarjeta) no se modificó.
// =====================================================================

const LARGO_POR_MARCA = { visa: 16, mastercard: 16, amex: 15 };
const NOMBRE_MARCA = { visa: "Visa", mastercard: "Mastercard", amex: "American Express" };
const PLACEHOLDER_TARJETA = "•••• •••• •••• ••••";

// Detecta la marca por los primeros dígitos
function detectarMarca(numero) {
    if (/^4/.test(numero)) return "visa";
    if (/^3[47]/.test(numero)) return "amex";
    if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d\d|27[01]\d|2720)/.test(numero)) return "mastercard";
    return "none";
}

function esPrefijoCompatible(numero) {
    if (numero === "" || numero.startsWith("4")) return true;

    const prefijosPosibles = ["34", "37"];
    for (let prefijo = 51; prefijo <= 55; prefijo++) {
        prefijosPosibles.push(String(prefijo));
    }
    for (let prefijo = 2221; prefijo <= 2720; prefijo++) {
        prefijosPosibles.push(String(prefijo));
    }

    return prefijosPosibles.some(function (prefijo) {
        return prefijo.startsWith(numero) || numero.startsWith(prefijo);
    });
}

// Agrupa los dígitos: American Express 4-6-5, el resto de a 4
function formatearNumero(numero, marca) {
    if (marca === "amex") {
        return [numero.slice(0, 4), numero.slice(4, 10), numero.slice(10, 15)]
            .filter(Boolean)
            .join(" ");
    }
    return numero.match(/.{1,4}/g).join(" ");
}

function enmascararNumero(numero, marca) {
    const numeroEnmascarado = numero.length <= 4
        ? "•".repeat(numero.length)
        : "•".repeat(numero.length - 4) + numero.slice(-4);
    return formatearNumero(numeroEnmascarado, marca);
}

// Reúne todas las comprobaciones y devuelve el mensaje a mostrar
function verificar(numero) {
    const marca = detectarMarca(numero);

    if (numero === "") {
        return { ok: false, titulo: "Campo vacío", descripcion: "Ingrese el número de la tarjeta." };
    }
    if (marca === "none") {
        return { ok: false, titulo: "Tarjeta no válida", descripcion: "Solo se aceptan Visa, American Express y Mastercard." };
    }
    if (numero.length !== LARGO_POR_MARCA[marca]) {
        return { ok: false, titulo: "Tarjeta no válida", descripcion: "Una " + NOMBRE_MARCA[marca] + " debe tener " + LARGO_POR_MARCA[marca] + " dígitos." };
    }
    if (!validarTarjeta(numero)) {
        return { ok: false, titulo: "Tarjeta no válida", descripcion: "El número no cumple con el algoritmo de Luhn." };
    }
    return { ok: true, titulo: "Tarjeta válida", descripcion: "Es una " + NOMBRE_MARCA[marca] + " y cumple con el algoritmo de Luhn." };
}

// Solo se ejecuta en una página (así sigue funcionando en la consola)
if (typeof document !== "undefined") {
    const contenedor = document.getElementById("contenedor");
    const formulario = document.getElementById("form-tarjeta");
    const campo = document.getElementById("numero-tarjeta");
    const numeroVisual = document.getElementById("numero-visual");
    const estado = document.getElementById("estado");
    const estadoIcono = document.getElementById("estado-icono");
    const estadoTitulo = document.getElementById("estado-titulo");
    const estadoDesc = document.getElementById("estado-desc");

    // tipo: "neutral", "valid" o "invalid"
    function mostrarResultado(tipo, titulo, descripcion) {
        const iconos = { neutral: "?", valid: "✓", invalid: "✕" };

        estado.className = "status-box" + (tipo === "neutral" ? "" : " " + tipo);
        estadoIcono.textContent = iconos[tipo];
        estadoTitulo.textContent = titulo;
        estadoDesc.textContent = descripcion;
        campo.setAttribute("aria-invalid", tipo === "invalid" ? "true" : "false");

        // reinicia la clase para que la animación de error se repita
        contenedor.classList.remove("has-error");
        void contenedor.offsetWidth;
        contenedor.classList.toggle("has-error", tipo === "invalid");
        campo.classList.toggle("input-error", tipo === "invalid");
    }

    // Sanitización: elimina todo lo que no sea dígito apenas se escribe o pega
    function actualizarCampo() {
        campo.value = campo.value.replace(/[^0-9]/g, "").slice(0, 19);

        const marca = detectarMarca(campo.value);
        contenedor.dataset.brand = marca;
        numeroVisual.textContent = campo.value === ""
            ? PLACEHOLDER_TARJETA
            : enmascararNumero(campo.value, marca);

        if (campo.value !== "" && !esPrefijoCompatible(campo.value)) {
            mostrarResultado("invalid", "Tarjeta no válida", "El prefijo no corresponde a Visa, American Express ni Mastercard.");
            return;
        }

        mostrarResultado("neutral", "Esperando verificación", "Ingrese un número y presione Verificar.");
    }

    campo.addEventListener("input", actualizarCampo);
    campo.addEventListener("change", actualizarCampo);
    actualizarCampo();

    // Verificación al presionar el botón (todo en memoria, sin enviar nada)
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        campo.value = campo.value.replace(/[^0-9]/g, "").slice(0, 19);
        const resultado = verificar(campo.value);
        mostrarResultado(resultado.ok ? "valid" : "invalid", resultado.titulo, resultado.descripcion);
    });
}
