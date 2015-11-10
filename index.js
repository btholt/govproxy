var express = require('express'),
    morgan = require('morgan'),
    proxy = require('json-proxy'),
    cors = require('cors');

var app = express();

app.use(function(req, res, next) {
  if (req.headers['x-forwarded-proto'] != 'https') {
    console.log(req.path);
    res.redirect('https://' + req.headers.host + req.originalUrl);
  }
  else {
    return next();
  }
});

app.use(cors());

app.use(morgan('dev'));
app.use(proxy.initialize({
  proxy: {
    'forward': {
      '/': 'http://api.usa.gov/'
    }
  }
}));

app.listen(80);
console.log('listening on http://localhost');