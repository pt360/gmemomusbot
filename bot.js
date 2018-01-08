const answer = require('./lib/answer');
const help = require('./lib/help');
const tell = require('./lib/tell');
const question = require('./lib/question');
const sendMessage = require('./lib/sendMessage');

function respond() {
  const input = JSON.parse(this.req.chunks[0]).text;

  this.res.writeHead(200);

  if (/^\/trebek tell.*$/.test(input)) {
    tell(input);
  } else if (/^\/trebek answer.*$/.test(input)) {
    answer(input);
  } else if (/^\/trebek question.*$/.test(input)) {
    question(input);
  } else if (/^\/trebek help.*$/.test(input)) {
    help(input);
  } else {
    console.log('No match for request. Doing nothing.');
  }

  this.res.end();
}

exports.respond = respond;
