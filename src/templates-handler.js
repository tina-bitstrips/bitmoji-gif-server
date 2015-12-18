'use strict';

const request = require('request');
const fs      = require('fs');
const mkdirp  = require('mkdirp');
const exec    = require('exec');

const gm      = require('gm').subClass({ imageMagick: true });


// Template data
const tinaAvatarIdForDebugging = '104556134_20-s4-v1';

let TEMPLATE_URL = 'https://da8lb468m8h1w.cloudfront.net/v2/cpanel/[TEMPLATE_ID]-[AVATAR_ID].png?palette=1';
const data       = require('./data');

let templatesHandler = function (req, reply) {

  data.forEach((set, index) => {
    // make the directory
    let directoryPath = `${__dirname}/../tmp/${index}`;
    
    mkdirp(directoryPath, (err) => {
      if (err) {
        console.error(err)
      }
    });

    let imagesToGif = set.map((templateId) => {
      let template = TEMPLATE_URL
                        .replace('[TEMPLATE_ID]', templateId)
                        .replace('[AVATAR_ID]', tinaAvatarIdForDebugging);

      // Get the image and write to the file system
      let filePath = `${directoryPath}/${templateId}.png`;

      request
        .get(template)
        .pipe(fs.createWriteStream(filePath))

      return filePath;
    });
    
    // TODO: use ImageMagick to create a GIF on imagesToGif
    let options = imagesToGif.map((option) => ' -page +0+0 ' + option ).join();

    let inputOptions = `-delay 50  -size 398x398 -dispose previous`;
    inputOptions += options;
    inputOptions += ` -loop 0 animation.gif`;
    
    // gm(filePath).command('convert').in(gifCommand)
    // gm().command('convert').in(inputOptions).outputDirectory(directoryPath)
    // gm().command('convert').in(inputOptions)
    
    // if (exec(inputOptions).code !== 0) {
    //   echo('Error: fail');
    //   exit(1);
    // }
  });

  reply('hello world!!!')
};

module.exports = templatesHandler;
