const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const Material = require('../models/Material');
const Cotizador = require('../models/Cotizaciones');
const HistoricoMateriales = require('../models/HistoricoMateriales');

router.post('/CrearCotizacion', async (req, res) => {


    try {

        const { NombreEmpresa, NombreContacto, Identificacion, TelContacto,
            Email, FechaEntrega, Ciudad, DireccionEntrega,
            TipoCogedera, TipoBolsa, UnidadesRequeridas, Ancho_cm,
            Alto_cm, Fuelle_cm, Asas_cm, Material, Color, Estampado,
            Caras, NumeroTintas, ColorTintas, ValorBolsa, Utilidad, PVSinIvaUnitario, PVSinIvaTotal,
            PVConIvaUnitario, PVConIvaTotal, NombreUsuario, _IdUsuario, _EstadoCotizacion, CheckCliente, CheckDineroCliente
        } = req.body;

        const newCotizacion = new Cotizaciones({
            NombreEmpresa, NombreContacto, Identificacion, TelContacto,
            Email, FechaEntrega, Ciudad, DireccionEntrega,
            TipoCogedera, TipoBolsa, UnidadesRequeridas, Ancho_cm,
            Alto_cm, Fuelle_cm, Asas_cm, Material, Color, Estampado,
            Caras, NumeroTintas, ColorTintas, ValorBolsa, Utilidad, PVSinIvaUnitario, PVSinIvaTotal,
            PVConIvaUnitario, PVConIvaTotal, NombreUsuario, _IdUsuario, _EstadoCotizacion, CheckCliente, CheckDineroCliente
        });

        await newCotizacion.save();

        const objResp = {
            respCotizacion: newCotizacion,
            resp: true,
            message: 'Creación de cotización con éxito'
        }

        return res.status(200).json(objResp);
    }
    catch (error) {

        const objResp = {
            respCotizacion: null,
            resp: false,
            message: error.message
        }

        return res.status(400).json(objResp);
    }




});


//#region Material
router.post('/crearMaterial', async (req, res) => {

    for (let i = 0; i < req.body.length; i++) {

        const elemento = req.body[i];

        nombreMaterial = elemento.nombreMaterial;
        material = elemento.material;
        largo_m = elemento.largo_m;
        ancho_m = elemento.ancho_m;
        grm_m2 = elemento.grm_m2;
        Mtr_Detal = elemento.Mtr_Detal
        costo_sinIva_Rollo = elemento.costo_sinIva_Rollo;

        const newTask = new Material({ nombreMaterial, material, largo_m, ancho_m, grm_m2, Mtr_Detal, costo_sinIva_Rollo });

        await newTask.save();

    }

    return res.status(200).json({ message: req.body.length + ' Datos guardados exitosamente' });
});

router.get('/AllMateriales', (req, res) => {

    Material.find().then((result) => {

        const materialesConParametros = result.map((material) => {
            const strResultMtrXRollo = Math.ceil(parseInt(material.costo_sinIva_Rollo) / parseInt(material.largo_m))
            const strResultMtrXRolloDetal = Math.ceil(strResultMtrXRollo * parseFloat(material.Mtr_Detal))
            return {
                ...material.toObject(),
                resultMtrXRollo: strResultMtrXRollo,
                resultMtrXRolloDetal: strResultMtrXRolloDetal,
                costoAnterior:material.costo_sinIva_Rollo
            };
        });
        res.send(materialesConParametros)
    }).catch((err) => {
        console.log(err)
    });
});
router.post('/MaterialById', (req, res) => {
    const { nombreMaterial } = req.body;

    Material.findOne({ nombreMaterial: nombreMaterial }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
    });
});
router.put('/actualizarMaterial', (req, res) => {

    const { _id, nombreMaterial, material, largo_m, ancho_m, grm_m2, costo_sinIva_Rollo, costoAnterior, nombreAsesor } = req.body;

    console.log("req.body ",req.body)
    Material.updateOne(
        { _id: _id },
        {
            $set: {
                nombreMaterial: nombreMaterial,
                material: material,
                largo_m: largo_m,
                ancho_m: ancho_m,
                grm_m2: grm_m2,
                costo_sinIva_Rollo: costo_sinIva_Rollo
            }
        },
        async (err, result) => {
            if (err) throw err;
            console.log(`${result.modifiedCount} registro(s) actualizado(s)`);

            const newHistorico = new HistoricoMateriales({ _id, costo_sinIva_Rollo,costoAnterior,nombreAsesor});

            await newHistorico.save();

            res.status(201).json(`${result.modifiedCount} registro(s) actualizado(s)`);
        }
    );

});
//#endregion Material

const Impresion = require('../models/Impresion');
//#region Impresion 
router.post('/crearImpresion', async (req, res) => {
    const { nombreImpresion, costoImpresion } = req.body;
    const newImpresion = new Impresion({ nombreImpresion, costoImpresion });
    await newImpresion.save();

    res.status(200).json(newImpresion)
});

router.get('/AllImpresiones', (req, res) => {

    Impresion.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});

router.post('/ImpresionById', (req, res) => {
    const { nombreImpresion } = req.body;

    Impresion.findOne({ nombreImpresion: nombreImpresion }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
    });
});

router.put('/actualizarImpresion', (req, res) => {

    const { _id, nombreImpresion, costoImpresion } = req.body;

    Impresion.updateOne(
        { _id: _id },
        {
            $set: {
                nombreImpresion: nombreImpresion,
                costoImpresion: costoImpresion
            }
        },
        (err, result) => {
            if (err) throw err;
            console.log(`${result.modifiedCount} registro(s) actualizado(s)`);
            res.status(201).json(`${result.modifiedCount} registro(s) actualizado(s)`);
        }
    );

});

//#endregion Impresion

const Confeccion = require('../models/Confeccion');

//#region Confeccion

router.post('/crearConfeccion', async (req, res) => {
    const { nombreConfeccion, costoConfeccion } = req.body;
    const newConfeccion = new Confeccion({ nombreConfeccion, costoConfeccion });
    await newConfeccion.save();

    res.status(200).json(newConfeccion)
});

router.get('/AllConfecciones', (req, res) => {

    Confeccion.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});


router.post('/ConfeccionById', (req, res) => {

    const { nombreConfeccion } = req.body;

    Confeccion.findOne({ nombreConfeccion: nombreConfeccion }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
    });
});

router.put('/actualizarConfeccion', (req, res) => {

    const { _id, nombreConfeccion, costoConfeccion } = req.body;

    Confeccion.updateOne(
        { _id: _id },
        {
            $set: {
                nombreConfeccion: nombreConfeccion,
                costoConfeccion: costoConfeccion
            }
        },
        (err, result) => {
            if (err) throw err;
            console.log(`${result.modifiedCount} registro(s) actualizado(s)`);
            res.status(201).json(`${result.modifiedCount} registro(s) actualizado(s)`);
        }
    );

});

//#endregion Confeccion

const Cordon = require('../models/Cordon');
//#region Cordon

router.post('/crearCordon', async (req, res) => {
    const { nombreCordon, largoRollo, valorRollo, valorMetro } = req.body;
    const newCordon = new Cordon({ nombreCordon, largoRollo, valorRollo, valorMetro });
    await newCordon.save();

    res.status(200).json(newCordon)
});

router.get('/AllCordones', (req, res) => {

    Cordon.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});

router.put('/actualizarCordon', (req, res) => {

    const { _id, nombreCordon, largoRollo, valorRollo, valorMetro } = req.body;

    Cordon.updateOne(
        { _id: _id },
        {
            $set: {
                nombreCordon: nombreCordon,
                largoRollo: largoRollo,
                valorRollo: valorRollo,
                valorMetro: valorMetro
            }
        },
        (err, result) => {
            if (err) throw err;
            console.log(`${result.modifiedCount} registro(s) actualizado(s)`);
            res.status(201).json(`${result.modifiedCount} registro(s) actualizado(s)`);
        }
    );

});


//#endregion Cordon

//#region Cogedera
const Cogedera = require('../models/Cogedera');
const Cotizaciones = require('../models/Cotizaciones');

router.post('/crearCogedera', async (req, res) => {
    const { nombreCogedera, costoCogedera } = req.body;
    const newCogedera = new Cogedera({ nombreCogedera, costoCogedera });
    await newCogedera.save();

    res.status(200).json(newCogedera)
});

router.get('/AllCogederas', (req, res) => {

    Cogedera.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});

router.post('/CogederaById', (req, res) => {
    const { nombreCogedera } = req.body;

    Cogedera.findOne({ nombreCogedera: nombreCogedera }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
    });
});

router.put('/actualizarCogedera', (req, res) => {

    const { _id, nombreCogedera, costoCogedera } = req.body;

    Cogedera.updateOne(
        { _id: _id },
        {
            $set: {
                nombreCogedera: nombreCogedera,
                costoCogedera: costoCogedera
            }
        },
        (err, result) => {
            if (err) throw err;
            console.log(`${result.modifiedCount} registro(s) actualizado(s)`);
            res.status(201).json(`${result.modifiedCount} registro(s) actualizado(s)`);
        }
    );

});

//#endregion Cogedera


//#region Cotizador
router.post('/Cotizar', async (req, res) => {

    const MaterialMongoose = require('../models/Material');
    const ImpresionMongoose = require('../models/Impresion');
    const ConfeccionMongoose = require('../models/Confeccion');
    const CogederaMongoose = require('../models/Cogedera');

    const { TipoCogedera, TipoBolsa, UnidadesRequeridas, Ancho, Alto, Fuelle, Asas, Material, Color, Estampado, Caras, NumeroTintas, ColorTintas, AjusteCot } = req.body;
    const consultaMaterial = await MaterialMongoose.findById(Material);

    const consultaImpresion = await ImpresionMongoose.findById(Estampado);

    const consultaConfeccion = await ConfeccionMongoose.findById(TipoBolsa);

    const cogederaTroquelid = '64f9085a3cc1ec0dec57252d';
    const consultaCogedera = await CogederaMongoose.findById(cogederaTroquelid);

    if (consultaMaterial == null) {
        console.log(" consultaMaterial acá devemos devoler el error ")
    }

    if (consultaImpresion == null) {
        console.log(" consultaImpresion acá devemos devoler el error ")
    }

    if (consultaConfeccion == null) {
        console.log(" consultaConfeccion acá devemos devoler el error ")
    }

    if (consultaCogedera == null) {
        console.log(" consultaCogedera acá devemos devoler el error ")
    }

    consultaMaterial.ancho_m = consultaMaterial.ancho_m * 100;
    let ValorAsas = 0;
    let SobranteFuelleCompletoH = 0;
    let SobranteFuelleCompletoV = 0;

    let sumaPorcentaje = (parseInt(UnidadesRequeridas) * 2) / 100;
    let TotalUnidades = parseInt(UnidadesRequeridas) + sumaPorcentaje;

    let CortesPorRollo = 0;
    let RollosRequeridos = 0;
    //Calculo Bolsa
    let TamañoCorteBolsa = 0;
    const ValorHolguraAlto = TipoCogedera == 'Troquel' ? 8 : 5;

    let DimensionesCorteBolsaAncho = parseInt(Ancho) + 2 + 0;
    let DimensionesCorteBolsaAlto = (parseInt(Alto) * 2) + parseInt(ValorHolguraAlto) + parseInt(Fuelle);

    //#region Calculo de cortes H|V

    //CorteHorizontal
    let CorteAnchoRolloH = Math.floor(consultaMaterial.ancho_m / DimensionesCorteBolsaAlto);
    let UsoMaterialH = CorteAnchoRolloH * DimensionesCorteBolsaAlto;
    let SobranteH = consultaMaterial.ancho_m - UsoMaterialH;
    let CortesRequeridosH = Math.ceil(TotalUnidades / CorteAnchoRolloH)
    let MetrosRequeridosH = Math.ceil((CortesRequeridosH * DimensionesCorteBolsaAncho) / 100)

    //CorteVertical 

    let CorteAnchoRolloV = Math.floor(consultaMaterial.ancho_m / DimensionesCorteBolsaAncho);
    let UsoMaterialV = CorteAnchoRolloV * DimensionesCorteBolsaAncho;
    let SobranteV = consultaMaterial.ancho_m - UsoMaterialV;
    let CortesRequeridosV = Math.ceil(TotalUnidades / CorteAnchoRolloV)
    let MetrosRequeridosV = Math.ceil((CortesRequeridosV * DimensionesCorteBolsaAlto) / 100)


    //#endregion Calculo de cortes H|V

    if (Fuelle.length != 0) {
        SobranteFuelleCompletoH = CalcularSobranteFuelleComleto(MetrosRequeridosH, Fuelle, Alto, SobranteH, TotalUnidades)
        SobranteFuelleCompletoV = CalcularSobranteFuelleComleto(MetrosRequeridosV, Fuelle, Alto, SobranteV, TotalUnidades, true)
    }

    if (Asas.length != 0) {
        ValorAsas = CalcularAsas(Asas, TotalUnidades, consultaMaterial.ancho_m)
    }

    const ValorMetrosH = MetrosRequeridosH + SobranteFuelleCompletoH + ValorAsas;
    const ValorMetrosV = MetrosRequeridosV + SobranteFuelleCompletoV + ValorAsas;
    const MinimoValorMetros = ValorMetrosH < ValorMetrosV ? ValorMetrosH : ValorMetrosV;
    const RutaImagen = ValorMetrosH < ValorMetrosV ? 'rolloHorizontal' : 'rolloVertical';


    CortesPorRollo = MetrosRequeridosH;
    RollosRequeridos = redondearAlDecimo(MinimoValorMetros / parseInt(consultaMaterial.largo_m))

    //#region  ValoresFinales

    const ValorSubtotalMaterial = Math.ceil(parseInt(consultaMaterial.costo_sinIva_Rollo) * RollosRequeridos);
    const IvaMaterial = Math.ceil(ValorSubtotalMaterial * 0.19);
    const ValorTransporte = 50000;
    const ValorFinalMaterial = parseInt(ValorSubtotalMaterial + IvaMaterial + ValorTransporte);


    const ValorFinalConfeccion = parseInt(consultaConfeccion.costoConfeccion) * TotalUnidades;
    const ValorFinalCorte = 50000 * RollosRequeridos;
    const TotalResumenCostos = ValorFinalMaterial + ValorFinalConfeccion + ValorFinalCorte;
    const ValorPorBolsa = Math.ceil(TotalResumenCostos / parseInt(UnidadesRequeridas));

    const objResumenCostos = {
        PTMaterial: ValorFinalMaterial,
        PTConfeccion: ValorFinalConfeccion,
        PTCorte: ValorFinalCorte,
        PTImpresion: null,
        PTAccesorios: null,
        PTOtros: null,
        SumaTotalCostos: TotalResumenCostos,
        ValorPorBolsa: ValorPorBolsa
    }

    //#endregion ValoresFinales

    //#region  PrecioVenta

    let Ajuste = parseInt(AjusteCot);
    let AjusteSumaPorcentaje = (parseInt(ValorPorBolsa) * Ajuste) / 100;
    const PrecioVentaUnitarioSinIVA = Math.ceil(ValorPorBolsa + AjusteSumaPorcentaje);
    const PrecioVentaTotalSinIVA = PrecioVentaUnitarioSinIVA * parseInt(UnidadesRequeridas);

    const PrecioVentaUnitariaMasIVA = Math.ceil(PrecioVentaUnitarioSinIVA * 0.19);
    const PrecioVentaTotalMasIVA = Math.ceil(PrecioVentaTotalSinIVA * 0.19);

    const TotalVentaBolsaUnitaria = Math.ceil(PrecioVentaUnitarioSinIVA + PrecioVentaUnitariaMasIVA);
    const TotalVentaBolsas = Math.ceil(PrecioVentaTotalSinIVA + PrecioVentaTotalMasIVA);


    const objPrecioVenta = {
        PVSinIvaUnitario: PrecioVentaUnitarioSinIVA,
        PVSinIvaTotal: PrecioVentaTotalSinIVA,
        PVConIvaUnitario: TotalVentaBolsaUnitaria,
        PVConIvaTotal: TotalVentaBolsas,
        IVA19Unitario: PrecioVentaUnitariaMasIVA,
        IVA19Total: PrecioVentaTotalMasIVA
    }

    const objResp = {
        message: "Datos guardados exitosamente",
        resp: true,
        rutaImagen: RutaImagen,
        PreciosVenta: objPrecioVenta,
        ResumenCosto: objResumenCostos
    };

    //#endregion PrecioVenta

    return res.status(200).json(objResp);
});

router.post('/GenerarOT', async (req, res) => {

    const Cotizador = require('../models/Cotizaciones');
    const { _idCotizacion } = req.body;

    Cotizador.updateOne(
        { _id: _idCotizacion },
        {
            $set: {
                _EstadoCotizacion: 'OT'
            }
        },
        (err, result) => {
            if (err) throw err;
            console.log(`${result.modifiedCount} registro(s) actualizado(s)`);
            res.status(201).json(`${result.modifiedCount} registro(s) actualizado(s)`);
        }
    );

});

router.get('/ObtenerOtActivas', (req, res) => {
    Cotizador.find({ _EstadoCotizacion: 'OT' }).then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});

//MetrosRequeridosAncho:MR
//Alto Fuelle : AF
//Alto Bolsa : AB
//Sobrante : S
//Metros Requeridos Horizontal:MRH

function CalcularSobranteFuelleComleto(strMR, strAF, strAB, strS, intTotalUnidades, isVertical = false) {

    let sobranteV = Math.floor(Number(strS) / Number(strAF)) * Math.floor((Number(strMR) * 100) / Number(strAB));
    let sobranteH = Math.floor(Number(strS) / Number(strAB)) * Math.floor((Number(strMR) * 100) / Number(strAF));

    let UnidadesRequeridas = intTotalUnidades * 2 - Math.max(sobranteV, sobranteH);
    if (UnidadesRequeridas < 0) {
        return 0;
    }

    let CortesxAR;
    let UsoMaterial;
    let Desperdicio;
    let CortesRequeridos;
    let MetrosRequeridos;

    if (isVertical) {
        CortesxAR = Math.floor(Number(strMR) / Number(strAF));
        UsoMaterial = CortesxAR * Number(strAF);
        Desperdicio = Number(strMR) - UsoMaterial;
        CortesRequeridos = Math.ceil(UnidadesRequeridas / CortesxAR);
        MetrosRequeridos = Math.ceil((CortesRequeridos * Number(strAB)) / 100);
    }
    else {
        CortesxAR = Math.floor(Number(strMR) / Number(strAB));
        UsoMaterial = CortesxAR * Number(strAB);
        Desperdicio = Number(strMR) - UsoMaterial;
        CortesRequeridos = Math.ceil(UnidadesRequeridas / CortesxAR);
        MetrosRequeridos = Math.ceil((CortesRequeridos * Number(strAF)) / 100);
    }

    return MetrosRequeridos;
}

function CalcularAsas(strLA, strTU, strAR) {
    const AnchoAsas = 6;
    const LonAsasBolsa = parseInt(strLA) * 2;
    const LargoTotal = (LonAsasBolsa * parseInt(strTU) / 100)
    const CortesAnchoRollo = Math.floor(parseInt(strAR) / AnchoAsas);
    const MetrosAsas = Math.ceil(LargoTotal / CortesAnchoRollo);

    return MetrosAsas;
}

function redondearAlDecimo(numero) {
    return Math.ceil(numero * 10) / 10;
}

//#endregion Cotizador

//#region MisSolicitudes


router.post('/MisCotizaciones', (req, res) => {
    const { idUser, statusCotizacion } = req.body;

    Cotizador.find({ _IdUsuario: idUser, _EstadoCotizacion: statusCotizacion }).then((result) => {
        res.status(200).json(result)

    }).catch((err) => {
        console.log(err)
    });
});

router.post('/DetalleCotizacion', async (req, res) => {

    const { IdSolicitud } = req.body;

    const consultaDetalleCotizacion = await Cotizador.findById(IdSolicitud);

    res.status(200).json(consultaDetalleCotizacion)

});

router.post('/ActualizarMiCotizacion', (req, res) => {

    const { _idCotizacion, NombreEmpresa, NombreContacto, Identificacion, TelContacto,
        Email, FechaEntrega, Ciudad, DireccionEntrega,
        TipoCogedera, TipoBolsa, UnidadesRequeridas, Ancho_cm,
        Alto_cm, Fuelle_cm, Asas_cm, Material, Color, Estampado,
        Caras, NumeroTintas, ColorTintas, ValorBolsa, Utilidad, PVSinIvaUnitario, PVSinIvaTotal,
        PVConIvaUnitario, PVConIvaTotal, NombreUsuario, _IdUsuario, _EstadoCotizacion, CheckCliente, CheckDineroCliente
    } = req.body;

    Cotizaciones.updateOne(
        { _id: _idCotizacion },
        {
            $set: {
                NombreEmpresa: NombreEmpresa,
                NombreContacto: NombreContacto,
                Identificacion: Identificacion,
                TelContacto: TelContacto,
                Email: Email,
                FechaEntrega: FechaEntrega,
                Ciudad: Ciudad,
                DireccionEntrega: DireccionEntrega,
                TipoCogedera: TipoCogedera,
                TipoBolsa: TipoBolsa,
                UnidadesRequeridas: UnidadesRequeridas,
                Ancho_cm: Ancho_cm,
                Alto_cm: Alto_cm,
                Fuelle_cm: Fuelle_cm,
                Asas_cm: Asas_cm,
                Material: Material,
                Color: Color,
                Estampado: Estampado,
                Caras: Caras,
                NumeroTintas: NumeroTintas,
                ColorTintas: ColorTintas,
                ValorBolsa: ValorBolsa,
                Utilidad: Utilidad,
                PVSinIvaUnitario: PVSinIvaUnitario,
                PVSinIvaTotal: PVSinIvaTotal,
                PVConIvaUnitario: PVConIvaUnitario,
                PVConIvaTotal: PVConIvaTotal,
                _EstadoCotizacion: _EstadoCotizacion,
                CheckCliente: CheckCliente,
                CheckDineroCliente: CheckDineroCliente

            }
        },
        (err, result) => {
            if (err) throw err;
            console.log(`${result.modifiedCount} registro(s) actualizado(s)`);
            res.status(201).json(`${result.modifiedCount} registro(s) actualizado(s)`);
        }
    );
});


//#endregion MisSolicitudes


module.exports = router;