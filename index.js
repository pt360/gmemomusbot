const http = require('http');
const director = require('director');
const bot = require('./bot.js');

function ping() {
  this.res.writeHead(200);
  this.res.end('Trebek Health: OK');
}

const router = new director.http.Router({
  '/': {
    post: bot.respond,
    get: ping,
  },
});

const port = Number(process.env.PORT || 3000);
const server = http.createServer((req, res) => {
  req.chunks = [];

  req.on('data', (chunk) => {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, (err) => {
    res.writeHead(err.status, { 'Content-Type': 'text/plain' });
    res.end(err.message);
  });
});

server.listen(port);
