const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    primerNombre: String,
    segundoNombre: String,
    primerApellido: String,
    segundoApellidoegundoApellido: String,
    cedula: String,
    edad: String,
    cargo: String,
    esPlanta: String,
    genero : String,
    user: String,
    password : String
}, {
    timestamps: true
});

module.exports = model('User', userSchema);