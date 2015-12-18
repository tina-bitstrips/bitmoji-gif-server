'use strict';

const Hapi        = require('hapi');
const server      = new Hapi.Server();

const HapiSwagger = require('hapi-swagger');
const inert       = require('inert');
const vision      = require('vision');
const pack        = require('./package.json');

const templatesHandler = require('./src/templates-handler');


server.connection({ port: process.env.PORT || 1337 });

// Routes
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.redirect('/documentation');
  }
});

server.route({
  method: 'GET',
  path: '/templates',
  config: {
    handler: templatesHandler,
    tags: ['api'],
    description: 'Get GIFs',
    notes: 'Returns an array of GIF URLs'
  }
});


// Start server
server.register([ inert, vision, {
  register: HapiSwagger,
  options: { apiVersion: pack.version }
} ], function (err) {
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
});
