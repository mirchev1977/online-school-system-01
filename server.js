
(function(){
"use strict";

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 9000 });

server.register([
    { register: require('./libs/plugins/hapi') }

], (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server started at: ' + server.info.uri);
    });
});



}());