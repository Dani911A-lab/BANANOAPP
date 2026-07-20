/*==================================================
    UTILS.JS
    FUNCIONES GENERALES
    BANANO APP
==================================================*/


/*==================================================
    FORMATO NUMEROS
==================================================*/


function numero(valor){

    return Number(valor || 0)
        .toLocaleString("es-EC");

}





/*==================================================
    FORMATO MONEDA
==================================================*/


function moneda(valor){

    return Number(valor || 0)
        .toLocaleString(
            "es-EC",
            {
                style:"currency",
                currency:"USD"
            }
        );

}





/*==================================================
    FORMATO PORCENTAJE
==================================================*/


function porcentaje(valor){

    return Number(valor || 0)
        .toFixed(2)
        +"%";

}





/*==================================================
    ESCAPAR TEXTO
==================================================*/


function limpiarTexto(texto){

    return String(texto)
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}