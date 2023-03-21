const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const Material = require('../models/Material');

router.post('/crearMaterial', async (req,res) => {
    const {nombreMaterial,material,largo_m,ancho_m,grm_m2,costo_sinIva_Rollo} = req.body;
    const newTask = new Material({ nombreMaterial,material,largo_m,ancho_m,grm_m2,costo_sinIva_Rollo});
    await newTask.save();

    res.status(200).json(newTask)
});
router.get('/AllMateriales',(req,res) =>{

    Material.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});
router.post('/MaterialById', (req,res) => {
    console.log(req.body);
    const {nombreMaterial} = req.body;
    console.log(nombreMaterial);

    Material.findOne({nombreMaterial:nombreMaterial}).then((result) =>{
        res.status(200).json(result)
    }).catch((err) =>{
        console.log(err)
    });


});
router.put('/actualizarMaterial', (req,res) => {

    const {_id,nombreMaterial,material,largo_m,ancho_m,grm_m2,costo_sinIva_Rollo} = req.body;

    Material.updateOne(
        { _id: _id },
        { $set: { nombreMaterial: nombreMaterial,
            material:material,
            largo_m:largo_m,
            ancho_m:ancho_m,
            grm_m2:grm_m2,
            costo_sinIva_Rollo:costo_sinIva_Rollo
        } },
        (err, result) => {
          if (err) throw err;
          console.log(`${result.modifiedCount} registro(s) actualizado(s)`);
          res.status(201).json(`${result.modifiedCount} registro(s) actualizado(s)`);
        }
      );

});

const Impresion = require('../models/Impresion');
//#region Impresion 
router.post('/crearImpresion', async (req,res) => {
    const {nombreImpresion,costoImpresion} = req.body;
    const newImpresion = new Impresion({ nombreImpresion,costoImpresion});
    await newImpresion.save();

    res.status(200).json(newImpresion)
});

router.get('/AllImpresiones',(req,res) =>{

    Impresion.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});

//#endregion Impresion

const Confeccion = require('../models/Confeccion');

//#region Confeccion

router.post('/crearConfeccion', async (req,res) => {
    const {nombreConfeccion,costoConfeccion} = req.body;
    const newConfeccion = new Confeccion({ nombreConfeccion,costoConfeccion});
    await newConfeccion.save();

    res.status(200).json(newConfeccion)
});

router.get('/AllConfecciones',(req,res) =>{

    Confeccion.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});

//#endregion Confeccion

const Cordon = require('../models/Cordon');
//#region Cordon

router.post('/crearCordon', async (req,res) => {
    const {nombreCordon,largoRollo,valorRollo,valorMetro} = req.body;
    const newCordon = new Cordon({ nombreCordon,largoRollo,valorRollo,valorMetro});
    await newCordon.save();

    res.status(200).json(newCordon)
});

router.get('/AllCordones',(req,res) =>{

    Cordon.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});

//#endregion Cordon



module.exports = router;