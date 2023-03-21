const { Schema, model } = require('mongoose');

const CogederaSchema = new Schema({
    nombreCogedera: String,
    costoCogedera: Number
}, {
    timestamps: true
});

module.exports = model('cogedera', CogederaSchema);