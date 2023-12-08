const { Schema, model } = require('mongoose');

const materialSchema = new Schema({
    nombreMaterial: String,
    material: String,
    largo_m: Number,
    ancho_m : Number, 
    grm_m2: String,
    Mtr_Detal: String,
    costo_sinIva_Rollo: Number
}, {
    timestamps: true
});

module.exports = model('materials', materialSchema);