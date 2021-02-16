//servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        //configuraciones de sockets
        this.io = socketio(this.server, { /**/ });
    }

    middlewares () {
        //desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        //CORS
        this.app.use(cors());
    }

    configSockets () {
        new Sockets(this.io);
    }

    execute () {
        //incializar middlewares
        this.middlewares();

        //incializar sockets
        this.configSockets();

        //inicializar servidor
        this.server.listen(this.port, () =>{
            console.log(`servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;
