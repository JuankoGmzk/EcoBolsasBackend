const express = require('express');
const app = express();

const cors = require('cors');

require('./database');
//SCM_DO_BUILD_DURING_DEPLOYMENT
// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api', require('./routes/index'));
app.use('/pdf', require('./routes/generate_pdf'));
app.use('/cotizador', require('./routes/cotizador'));

const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));

     // Obtener la dirección IP del servidor (puede variar según el entorno de despliegue)
     const address = server.address();
     const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
     console.log("servidor:", bind)
});


//WebSockets
const io = require('socket.io')(server, {
    cors: {
        origins: ['*']
    }
});

// io.on('connection',(socket) => {

//     const idHandShake = socket.id;

//     const {name} = socket.handShake.query;

//     console.log(`Hola nuevo dispositivo: ${idHandShake} se unio el query ${name}`);

// });

io.on('connection', (socket) => {
    const idHandShake = socket.id;
    console.log('a user connected', idHandShake);
    socket.on('disconnect', () => {
        console.log('user disconnected', idHandShake);
    });

    socket.on('chat:message', (data) => {
        io.emit('evento', data);
    });

    socket.on('oTsGeneradasBack', (data) => {
        io.emit('oTsGeneradas',data);
    });


    socket.on('evento', (res) => {
        // Emite el mensaje a todos lo miembros de las sala menos a la persona que envia el mensaje   
        socket.to().emit('evento', 'Esto viene desde el back on socket');

    })



});