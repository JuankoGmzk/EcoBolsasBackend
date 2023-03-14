const { Schema, model } = require('mongoose');

const ConfeccionSchema = new Schema({
    nombreConfeccion: String,
    costoConfeccion: Number
}, {
    timestamps: true
});

module.exports = model('confeccion', ConfeccionSchema);