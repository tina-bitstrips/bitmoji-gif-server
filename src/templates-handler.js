'use strict';

const request     = require('request');
const fs          = require('fs');
const mkdirp      = require('mkdirp');

const imageMagick = require('imagemagick');


// Template data
let TEMPLATE_URL = 'https://da8lb468m8h1w.cloudfront.net/v2/cpanel/%s-104556134_20-s4-v1.png?palette=1';
const data         = require('./data');

let templatesHandler = function (req, reply) {

  data.forEach((set, index) => {
    console.log('>> set:');
    console.log(set);

    // make the directory
    let directoryPath = `${__dirname}/../tmp/${index}`;
    
    mkdirp(directoryPath, (err) => {
      if (err) {
        console.error(err)
      }
    });

    set.forEach((templateId) => {
      let template = TEMPLATE_URL.replace('%s', templateId);

      // Get the image and write to the file system
      request
        .get(template)
        .pipe(fs.createWriteStream(`${directoryPath}/${templateId}.png`))
      
      // TODO: use ImageMagick to create a GIF
      console.log(template);
    });
  });

  // console.log(imageMagick)
  reply('hello world!!!')
};

module.exports = templatesHandler;
