# Bitmoji GIF server

Animated GIF server for a hackathon project.


## Development

Everything is in `app.rb`.

To run the server, run the following:

```
rackup -p 1337
```

Go to: http://localhost:1337/templates/:avatar_id

`avatar_id` can be any of the following:

- `104556134_20-s4-v1` Tina
- `3064769_20-s4-v1` (Jason)

Or anyone [here](https://docs.google.com/spreadsheets/d/1EAqBXEKVIpEMOYB3o0NAl2J0D8EI5AmsDXjAJBqonjU/edit#gid=0). Don't forget to include the style and version.

e.g. http://localhost:1337/templates/104556134_20-s4-v1
