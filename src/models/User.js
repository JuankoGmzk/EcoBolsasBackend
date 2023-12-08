const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    primerNombre: String,
    segundoNombre: String,
    primerApellido: String,
    segundoApellido: String,
    cedula: String,
    cargo: String,
    rol:String,
    edad: String,
    fechaNacimiento:String,
    userPlanta: String,
    genero : String,
    user: String,
    password : String
}, {
    timestamps: true
});

module.exports = model('User', userSchema);