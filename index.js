'use strict';

const Hapi             = require('hapi');
const HapiSwagger      = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');
const pack = require('./package.json');

const templatesHandler = require('./src/templates-handler');

// Template data
const TEMPLATE_URL = 'https://da8lb468m8h1w.cloudfront.net/v2/cpanel/%s-104556134_20-s4-v1.png?palette=1';
const data = require('./src/data');

const server = new Hapi.Server();
server.connection({ port: 1337 });

// Routes
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.redirect(server.info.uri + '/documentation');
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
// server.start(() => console.log('Server running at:', server.info.uri));

server.register([ inert, vision, {
  register: HapiSwagger,
  options: { apiVersion: pack.version }
} ], function (err) {
  server.start( () => console.log('Server running at:', server.info.uri));
});
