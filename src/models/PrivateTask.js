const { Schema, model } = require('mongoose');

const privateTaskSchema = new Schema({
    name: String,
    description: String,
    date: String
}, {
    timestamps: true
});

module.exports = model('privateTask', privateTaskSchema);