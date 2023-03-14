const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1/EcoBolsasDev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));

    