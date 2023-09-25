const { Schema, model } = require('mongoose');

const HistoricoMaterialesSchema = new Schema({
    _idMaterial: String,
    costoAnterior: Number,
    costoNuevo: Number,
    nombreAsesorCambio: String
}, {
    timestamps: true
});

module.exports = model('historicoMateriales', HistoricoMaterialesSchema);