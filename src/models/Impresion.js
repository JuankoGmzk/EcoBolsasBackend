const { Schema, model } = require('mongoose');

const impresionSchema = new Schema({
    nombreImpresion: String,
    costoImpresion: Number
}, {
    timestamps: true
});

module.exports = model('impresion', impresionSchema);