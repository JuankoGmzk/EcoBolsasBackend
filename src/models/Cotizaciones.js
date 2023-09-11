const { Schema, model } = require('mongoose');

const cotizacionSchema = new Schema({
    NombreEmpresa: String,
    NombreContacto: String,
    Identificacion: String,
    TelContacto : String, 
    Email: String,
    FechaEntrega: String,
    Ciudad:String, 
    DireccionEntrega:String,
    TipoCogedera: String,
    TipoBolsa: String, 
    UnidadesRequeridas:String,
    Ancho_cm:String,
    Alto_cm:String, 
    Fuelle_cm:String,
    Asas_cm:String,
    Material:String,
    Color:String,
    Estampado:String,
    Caras:String,
    NumeroTintas:String,
    ColorTintas:String,
    ValorBolsa:String,
    Utilidad:String,
    PVSinIvaUnitario:String,
    PVSinIvaTotal:String,
    PVConIvaUnitario:String,
    PVConIvaTotal:String,
    NombreUsuario:String,
    _IdUsuario: String,
    _EstadoCotizacion: String,
    CheckCliente:Boolean,
    CheckDineroCliente:Boolean

}, {
    timestamps: true
});

module.exports = model('cotizaciones', cotizacionSchema);

