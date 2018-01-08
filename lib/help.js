const sendMessage = require('./sendMessage');

function help() {
  sendMessage(`
    The available commands are: \n
    /trebek question: Get a random question \n
    /trebek answer: Get the answer to previous question \n
  `);
}

module.exports = help;
