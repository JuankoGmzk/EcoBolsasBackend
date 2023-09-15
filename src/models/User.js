const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    primerNombre: String,
    segundoNombre: String,
    primerApellido: String,
    segundoApellidoegundoApellido: String,
    cedula: String,
    edad: String,
    cargo: String,
    rol:String,
    esPlanta: Boolean,
    genero : String,
    user: String,
    password : String
}, {
    timestamps: true
});

module.exports = model('User', userSchema);