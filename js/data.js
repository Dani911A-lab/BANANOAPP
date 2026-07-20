/*==================================================
    DATA.JS
    BANANO APP
    CONTROL DE DATOS
==================================================*/



// ================================================
// VARIABLES GLOBALES
// ================================================


// Datos completos recibidos desde Google Sheets

let datosProduccion = [];



// Semana actual detectada automáticamente

let semanaActual = 0;



// Producción agrupada por finca

let resumenProduccion = [];



// Histórico por finca

let historialProduccion = {};







// ================================================
// CARGAR DATOS PRODUCCION
// ================================================


async function cargarDatosProduccion(){



    datosProduccion = await obtenerProduccion();





    if(
        datosProduccion.length === 0
    ){

        console.warn(
            "No existen datos de producción"
        );

        return;


    }





    // Detectar última semana disponible


    semanaActual = obtenerUltimaSemana(
        datosProduccion
    );





    // Crear resumen semana actual


    generarResumenProduccion();





    // Crear histórico


    generarHistorialProduccion();






    console.log(
        "Semana actual:",
        semanaActual
    );



}







// ================================================
// RESUMEN SEMANA ACTUAL
// ================================================


function generarResumenProduccion(){



    resumenProduccion = [];




    datosProduccion.forEach(item=>{





        if(
            Number(item.SEMANA)
            ===
            semanaActual
        ){



            resumenProduccion.push({


                finca:item.FINCA,


                cajas:Number(item.CAJAS)



            });



        }



    });




}








// ================================================
// HISTORIAL POR FINCA
// ================================================


function generarHistorialProduccion(){



    historialProduccion = {};




    datosProduccion.forEach(item=>{



        const finca =
        item.FINCA;





        if(
            !historialProduccion[finca]
        ){


            historialProduccion[finca]=[];


        }






        historialProduccion[finca].push({



            semana:Number(item.SEMANA),


            cajas:Number(item.CAJAS)



        });





    });






}







// ================================================
// TOTAL CAJAS SEMANA ACTUAL
// ================================================


function totalCajas(){



    return resumenProduccion.reduce(

        (total,item)=>

        total + item.cajas,


        0

    );



}