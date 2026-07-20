/*==================================================
    APP.JS
    BANANO APP
    NAVEGACION PRINCIPAL
==================================================*/


document.addEventListener(
    "DOMContentLoaded",
    iniciarApp
);





/*==================================================
    VARIABLES
==================================================*/


let pantallaActual = "dashboard";



const pantallas = document.querySelectorAll(
    ".pantalla"
);



const tarjetas = document.querySelectorAll(
    ".modulo"
);



const botonesBack = document.querySelectorAll(
    ".back-btn"
);







/*==================================================
    INICIO APP
==================================================*/


function iniciarApp(){


    obtenerSemana();


    configurarTarjetas();


    configurarBotonesBack();


    actualizarDashboard();



}







/*==================================================
    SEMANA ACTUAL
==================================================*/


function obtenerSemana(){


    const fecha = new Date();


    const inicio = new Date(
        fecha.getFullYear(),
        0,
        1
    );


    const diferencia =

        Math.floor(

            (fecha - inicio)

            /

            86400000

        );



    const semana = Math.ceil(

        (

            diferencia

            +

            inicio.getDay()

            +

            1

        )

        /

        7

    );



    const elemento = document.getElementById(
        "numeroSemana"
    );



    if(elemento){

        elemento.textContent = semana;

    }



}







/*==================================================
    TARJETAS DASHBOARD
==================================================*/


function configurarTarjetas(){


    tarjetas.forEach(card=>{


        card.addEventListener(
            "click",
            ()=>{


                const pantalla = 
                card.dataset.screen;


                abrirPantalla(
                    pantalla
                );


            }
        );



    });


}









/*==================================================
    BOTONES REGRESAR
==================================================*/


function configurarBotonesBack(){


    botonesBack.forEach(btn=>{


        btn.addEventListener(
            "click",
            ()=>{


                abrirPantalla(
                    "dashboard"
                );


            }
        );


    });


}









/*==================================================
    CAMBIO DE PANTALLA
==================================================*/


function abrirPantalla(nombre){



    pantallas.forEach(p=>{


        p.classList.remove(
            "activa"
        );


    });





    const nueva = document.getElementById(
        nombre
    );



    if(nueva){


        nueva.classList.add(
            "activa"
        );


    }



    pantallaActual = nombre;



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



    cargarModulo(
        nombre
    );


}









/*==================================================
    CARGAR MODULOS
==================================================*/


function cargarModulo(nombre){



    switch(nombre){



        case "produccion":


            if(
                typeof cargarProduccion === "function"
            ){

                cargarProduccion();

            }


        break;





        case "rechazos":


            if(
                typeof cargarRechazos === "function"
            ){

                cargarRechazos();

            }


        break;





        case "gastos":


            if(
                typeof cargarGastos === "function"
            ){

                cargarGastos();

            }


        break;





        case "liquidaciones":


            if(
                typeof cargarLiquidaciones === "function"
            ){

                cargarLiquidaciones();

            }


        break;



    }



}







/*==================================================
    ACTUALIZAR DASHBOARD
==================================================*/


function actualizarDashboard(){



    const produccion = document.getElementById(
        "kpiProduccion"
    );



    if(produccion){

        produccion.textContent =
        numero(totalCajas());

    }







    const gastos = document.getElementById(
        "kpiGastos"
    );



    if(gastos){

        gastos.textContent =
        moneda(totalGastos());

    }







    const rechazo = document.getElementById(
        "kpiRechazos"
    );



    if(rechazo){

        rechazo.textContent =
        porcentajeRechazo();

    }







    const liquidacion = document.getElementById(
        "kpiLiquidaciones"
    );



    if(liquidacion){

        liquidacion.textContent =
        moneda(totalLiquidado());

    }



}