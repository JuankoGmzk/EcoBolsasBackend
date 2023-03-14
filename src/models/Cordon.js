const { Schema, model } = require('mongoose');

const CordonSchema = new Schema({
    nombreCordon: String,
    largoRollo:String,
    valorRollo:Number,
    valorMetro: Number
}, {
    timestamps: true
});

module.exports = model('cordon', CordonSchema);