const { Router } = require('express');
const router = Router();

const pdf = require('html-pdf');

const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));

const nombreDeUsuario = __dirname+"/public"+"/img/patronHojas.png";
const content = `

<h1>Título en el PDF creado con el paquete html-pdf</h1>
<p>Generando un PDF con un HTML sencillo</p>

<div class="w3-col m6 w3-padding-large">
      <h1 class="w3-center">About Catering</h1><br>
      <h5 class="w3-center">Tradition since 1889</h5>
      <p class="w3-large">The Catering was founded in blabla by Mr. Smith in lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.We only use <span class="w3-tag w3-light-grey">seasonal</span> ingredients.</p>
      <p class="w3-large w3-text-grey w3-hide-medium">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </div>



  <table BORDER>
  <tr>
    <td>
      <!-- Columna izquierda con celdas -->
      <table>
        <TH COLSPAN=2>ESPECIFICACIONES DEL PRODUCTO</TH>
        <tr>
          <td>Material</td>
          <td style="text-align: right;">Kambrel - 70 gr</td>
        </tr>
        
        <tr>
          <td>TIPO BOLSA:</td>
          <td style="text-align: right;">Fuelle Completo</td>
        </tr>
        <tr>
          <td>COGEDERA:</td>
          <td style="text-align: right;">Asas</td>
        </tr>
        <tr>
          <td>COLOR TELA:</td>
          <td style="text-align: right;">NEGRAS</td>
        </tr>
        <tr>
          <td>MEDIDAS: </td>
          <td style="text-align: right;">50cm Alto X 50cm Ancho X 10cm Fuelle</td>
        </tr>
        <tr>
          <td>MARCACIÓN: :</td>
          <td style="text-align: right;">Tinta Plana - 1 cara(s) - 1 tinta(s)</td>
        </tr>
        <tr>
          <td>COLOR TINTAS</td>
          <td style="text-align: right;">ROJO</td>
        </tr>
        <tr>
          <td>CANTIDAD</td>
          <td style="text-align: right;">100</td>
        </tr>
      </table>
    </td>
    <td>
      <TH COLSPAN=2>IMAGEN</TH>
      <!-- Columna derecha con imagen -->
      <h1>Bienvenido, ${nombreDeUsuario}!</h1>
      <img src="${nombreDeUsuario}.png" alt="Descripción de la imagen">

      <img src="/img/patronHojas.png" alt="Logo de mi sitio web">

    </td>
  </tr>
</table>

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