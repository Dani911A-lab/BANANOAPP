/*==================================================
    PRODUCCION.JS
    BANANO APP
    MODULO PRODUCCION
==================================================*/



// ================================================
// CARGAR MODULO PRODUCCION
// ================================================


async function cargarProduccion(){


    const contenedor = document.getElementById(
        "produccionContenido"
    );



    if(!contenedor){

        return;

    }



    contenedor.innerHTML = `

        <div class="panel">

            <h3>
                Cargando producción...
            </h3>

            <p>
                Consultando información
            </p>

        </div>

    `;



    await cargarDatosProduccion();





    const semana = document.getElementById(
        "numeroSemana"
    );



    if(semana){

        semana.textContent =
        semanaActual || "--";

    }






    if(

        !resumenProduccion ||

        resumenProduccion.length === 0

    ){


        contenedor.innerHTML = `


        <div class="panel">


            <h3>

                Sin datos de producción

            </h3>


            <p>

                No existen registros disponibles.

            </p>


        </div>


        `;


        return;


    }




    mostrarListaProduccion();



}









// ================================================
// LISTA PRINCIPAL
// ================================================


function mostrarListaProduccion(){



    const contenedor = document.getElementById(
        "produccionContenido"
    );



    const total = totalCajas();





    const kpi = document.getElementById(
        "kpiProduccion"
    );



    if(kpi){

        kpi.textContent =
        numero(total);

    }







    contenedor.innerHTML = `



    <div class="panel">


        <h3>

            Semana ${semanaActual}

        </h3>





        <div class="stats">


            <div class="stat">


                <span>

                    Total cajas

                </span>



                <strong>

                    ${numero(total)}

                </strong>


            </div>





            <div class="stat">


                <span>

                    Haciendas

                </span>



                <strong>

                    ${resumenProduccion.length}

                </strong>


            </div>



        </div>


    </div>








    <div class="panel">


        <h3>

            Producción por hacienda

        </h3>





        <div class="lista">


            ${crearListaProduccion()}


        </div>



    </div>



    `;



}









// ================================================
// LISTADO HACIENDAS
// ================================================


function crearListaProduccion(){



    if(
        resumenProduccion.length === 0
    ){

        return `

        <p>

            Sin información disponible

        </p>

        `;


    }






    const maximo = Math.max(

        ...

        resumenProduccion.map(
            item=>item.cajas
        )

    );








    return resumenProduccion

    .sort(

        (a,b)=>

        b.cajas - a.cajas

    )


    .map(item=>{



        const porcentajeBarra =

        maximo > 0

        ?

        (

            item.cajas /

            maximo

        )

        *100

        :

        0;







        return `



        <div class="lista-item">





            <div class="item-info">


                <h4>

                    ${item.finca}

                </h4>




                <span>

                    ${numero(item.cajas)}
                    cajas

                </span>





                <div class="progress">


                    <div

                    style="
                    width:${porcentajeBarra}%
                    ">

                    </div>


                </div>



            </div>








            <div class="historial-acceso">



                <span>

                    Historial completo

                </span>





                <button

                class="historial-btn"

                onclick="mostrarDetalleFinca('${item.finca}')">


                    <i class="fa-solid fa-chevron-right"></i>


                </button>



            </div>





        </div>



        `;



    })

    .join("");



}









// ================================================
// DETALLE POR FINCA
// ================================================


function mostrarDetalleFinca(finca){



    const contenedor = document.getElementById(
        "produccionContenido"
    );



    const historial = historialProduccion[finca];







    if(

        !historial ||

        historial.length === 0

    ){


        contenedor.innerHTML = `


        <div class="panel">


            <button

            class="back-btn"

            onclick="mostrarListaProduccion()">


                <i class="fa-solid fa-chevron-left"></i>


            </button>




            <h3 style="margin-top:20px">

                ${finca}

            </h3>



            <p>

                Sin historial disponible.

            </p>



        </div>


        `;


        return;


    }







    contenedor.innerHTML = `



    <div class="panel">


        <button

        class="back-btn"

        onclick="mostrarListaProduccion()">


            <i class="fa-solid fa-chevron-left"></i>


        </button>





        <h3 style="margin-top:20px">

            ${finca}

        </h3>



        <p>

            Historial completo

        </p>



    </div>








    <div class="panel">


        <div class="lista">



        ${

        historial

        .sort(

            (a,b)=>

            b.semana-a.semana

        )


        .map(item=>`



            <div class="lista-item">


                <div class="item-info">


                    <h4>

                        Semana ${item.semana}

                    </h4>


                </div>





                <div class="item-valor">


                    <strong>

                        ${numero(item.cajas)}

                    </strong>


                    <small>

                        cajas

                    </small>


                </div>



            </div>



        `)

        .join("")

        }



        </div>


    </div>



    `;



}