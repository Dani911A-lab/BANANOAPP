/*==================================================
    API.JS
    CONEXION GOOGLE SHEETS
    BANANO APP
==================================================*/


// ================================================
// LINK GOOGLE SHEETS PRODUCCION
// ================================================


const URL_PRODUCCION =

"https://docs.google.com/spreadsheets/d/e/2PACX-1vThTjhPWi5vKcw5tbiWhPvN4DNoKXocZ_gmICf1Exbiq8JJMvNlf7CiQRviLOAsT5yDBw1FT9dVKy0A/pub?output=csv";






// ================================================
// OBTENER PRODUCCION DESDE SHEETS
// ================================================


async function obtenerProduccion(){


    try{


        const respuesta = await fetch(
            URL_PRODUCCION
        );



        const csv = await respuesta.text();




        const datos = convertirCSV(csv);



        console.log(
            "Producción cargada:",
            datos
        );



        return datos;



    }


    catch(error){


        console.error(
            "Error conectando Google Sheets:",
            error
        );



        return [];

    }



}







// ================================================
// CONVERTIR CSV A OBJETOS
// ================================================


function convertirCSV(csv){



    const filas = csv
        .trim()
        .split("\n");





    const encabezados = filas[0]
        .split(",");





    const datos = filas
        .slice(1)
        .map(fila=>{



            const valores = fila
                .split(",");





            let registro = {};






            encabezados.forEach(
                (campo,index)=>{


                    registro[
                        campo.trim().toUpperCase()
                    ] = valores[index]
                    ? valores[index].trim()
                    : "";



                }
            );





            return registro;



        });






    return datos;



}








// ================================================
// OBTENER ULTIMA SEMANA DISPONIBLE
// ================================================


function obtenerUltimaSemana(datos){



    const semanas = datos.map(
        item => Number(item.SEMANA)
    );



    return Math.max(
        ...semanas
    );



}