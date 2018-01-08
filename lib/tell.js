const sendMessage = require('./sendMessage');

function help(input) {
  const user = input.split(' ')[2];
  const message = input.split(' ').slice(3).join(' ');

  sendMessage(`${user}, ${message}`);
}

module.exports = help;
