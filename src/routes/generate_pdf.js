const { Router } = require('express');
const router = Router();

const pdf = require('html-pdf');

const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));

const nombreDeUsuario = __dirname+"/public"+"/img/patronHojas.png";
const content = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orden de Trabajo</title>
    <style>
        /* Estilo para el marco de líneas */
        .marco {
            border: 2px solid black;
            padding: 20px;
            margin: 20px;
        }

        /* Estilo para los separadores */
       .separador {
            width: 100%;
            border: 1px solid black;
            margin-left: -5px; /* Ajusta el margen izquierdo para tocar las líneas laterales del marco */
            margin-right: -15px; /* Ajusta el margen derecho para tocar las líneas laterales del marco */
        }


        /* Estilos para el encabezado */
        .encabezado {
            text-align: center;
            font-size: 20px;
        }

        /* Estilos para la información de la empresa */
        .info-empresa {
            font-size: 14px;
            margin-bottom: 20px;
        }

        /* Estilos para la sección de detalles del pedido */
        .detalle-pedido {
            font-size: 14px;
            margin-bottom: 20px;
        }

        /* Estilos para la sección de nota importante */
        .nota-importante {
            font-size: 14px;
            margin-bottom: 20px;
        }

        /* Estilos para la sección de observaciones */
        .observaciones {
            font-size: 14px;
            margin-bottom: 20px;
        }

        /* Estilos para la sección de forma de pago */
        .forma-pago {
            font-size: 14px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="marco">
   
        <div class="imagenes">
            <p>AcrearPublicidad</p>
            <p>Ecobolsas</p>
        </div>
        <hr class="separador">
           <hr class="separador">
          
          <div class="encabezado">
            <p>EMPRESA LAURA GUERRERO</p>
            <p>Fecha 31/ago/2023</p>
            <p>NIT. / C.C. 0</p>
        </div>
        <div class="info-empresa">
            <p>DIRECCION CRA 75 D # 2 B SUR 320</p>
            <p>CONTACTO</p>
            <p>CIUDAD MEDELLIN</p>
            <p>TELEFONO</p>
            <p>E-MAIL 0</p>
        </div>
        <div class="detalle-pedido">
            <p>FECHA DE ENTREGA 1 de septiembre de 2023</p>
            <p>ASESOR</p>
            <p>MATERIAL: Lienzo - gr</p>
            <p>DISEÑO: Fuelle Completo</p>
            <p>COGEDERA: Asas - 53 cm</p>
            <p>COLOR: CRUDO NATURAL</p>
            <p>MEDIDAS: 40 Alto X 35 Ancho X 15 Fuelle</p>
            <p>MARCACIÓN: Policromia - 1 cara(s) - tinta(s)</p>
            <p>COLOR TINTAS 0</p>
            <p>CANTIDAD 100</p>
            <p>VALOR UNITARIO $ 11.200</p>
            <p>SUBTOTAL $ 1.120.000</p>
            <p>IVA 19% $ 212.800</p>
        </div>
        <hr class="separador">
        <div class="nota-importante">
            <p>NOTA IMPORTANTE:</p>
            <ol>
                <li>Con la firma de este, el cliente autoriza el diseño de la bolsa, diseño de arte, color de estampación y valor total.</li>
                <li>El valor del envío es asumido por el cliente.</li>
                <li>Por favor, envíe la correspondencia relacionada con esta orden de trabajo a: ventas@ecobolsas.co</li>
                <li>En toda su correspondencia, por favor refiérase a la O.T./ Orden de Trabajo No. No. 230831-7082</li>
            </ol>
        </div>
        <hr class="separador">
        <div class="forma-pago">
            <p>Autorizado / Recibe : Fecha: 31/ago/2023</p>
            <p>ENTIDADES BANCARIAS - El pago se puede realizar en:</p>
            <p>OBSERVACIONES</p>
            <p>Jennifer de Agrella</p>
            <p>Cada pequeño paso hace una gran diferencia para salvar el medio ambiente.</p>
            <p>FORMA DE PAGO: $940.000 - (70%) para iniciar la producción / $392.800 - (30%) antes del despacho</p>
            <p>COTIZACIÓN / OT</p>
        </div>
    </div>
</body>
</html>

`;



router.get('/GeneratePdf', (req, res) => {
    const result = pdf.create(content).toFile('./html-pdf.pdf', function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
    res.status(200).json(result);
});


module.exports = router;