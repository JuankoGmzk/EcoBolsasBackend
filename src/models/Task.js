const { Schema, model } = require('mongoose');

const taskSchema = new Schema({

    empresa: String,
    fecha_entrega: String,
    fecha: String,
    supervisor: String,
    material: String,
    tipo_bolsa: String,
    cogedera: String,
    color_tela: String,
    medidas: String,
    marcacion: String,
    color_tintas: String,
    cantidad: String
}, {
    timestamps: true
});

module.exports = model('Task', taskSchema);