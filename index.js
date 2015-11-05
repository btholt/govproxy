var express = require('express'),
    morgan = require('morgan'),
    proxy = require('json-proxy'),
    cors = require('cors'),
    fs = require('fs');

var app = express();

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

app.use(cors());

app.use(morgan('combined', {stream: accessLogStream}));
app.use(proxy.initialize({
  proxy: {
    'forward': {
      '/': 'http://api.usa.gov/'
    }
  }
}));

app.listen(5000);
console.log('listening on http://localhost:5000');