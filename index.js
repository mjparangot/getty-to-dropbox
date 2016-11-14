'use strict';

const Hapi = require('hapi'),
      getty = require('./lib/getty'),
      dropbox = require('./lib/dropbox'),
      server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {
        return reply('hello world');
    }
});

server.route({
    method: 'GET',
    path:'/api/getty/{phrase}',
    handler: function (request, reply) {
        getty.getImages(request.params.phrase).then(function (data) {
            reply(data);
        });
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);

    dropbox.deleteImages('/Images');
    dropbox.uploadImages('city skyline');
});
