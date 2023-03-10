/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');

const { log } = console;
const { green, red, blue, yellow } = chalk;

function info(message) {
  log(blue(`âšī¸ INFO: ${message}`));
}

function success(message) {
  log(green(`đ SUCCESS: ${message}`));
}

function error(message) {
  log(red(`â ERROR: ${message}`));
}

function warning(message) {
  log(yellow(`â ī¸ WARNING: ${message}`));
}

module.exports = { info, success, error, warning };
