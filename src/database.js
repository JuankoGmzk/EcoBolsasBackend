const mongoose = require('mongoose');

mongoose.set('strictQuery', true);


//mongodb://127.0.0.1/EcoBolsasDev
//mongoose.connect('mongodb://ecocosmos:mfK6LvEvG1AcI2qDPhFaMKV4kQtbcU6Ykg9In8zzpNYoiMbs90LkKs1WsUWW1UPgzijAJGFwbDIgACDbjIbdYg==@ecocosmos.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@ecocosmos@', {
mongoose.connect('mongodb://127.0.0.1/EcoBolsasDev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log('Database is connected');
}).catch(err => {
    console.error('Unable to connect to the database:', err.message);
});


