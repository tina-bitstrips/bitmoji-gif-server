# Bitmoji GIF server

Animated GIF server for a hackathon project.


## Development

Template data is in `data.js`.

To run the server, run the following:

```
node index
```

Open http://localhost:1337 to see the docs.


## GIFs

Example from `./tmp/1`: 

```
cd tmp/1
```

Run this:

```
convert -delay 50  -size 398x398 \
          -dispose previous \
          -page +0+0 9449032.png   -page +0+0 9462306.png  \
          -page +0+0 9462322.png   -page +0+0 9462338.png  \
          -loop 0  animation.gif
```

## Deployment 

- Heroku build pack with ImageMagick: https://github.com/ello/heroku-buildpack-imagemagick-cedar-14
