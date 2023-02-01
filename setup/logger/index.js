/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');

const { log } = console;
const { green, red, blue, yellow } = chalk;

function info(message) {
  log(blue(`ℹ️ INFO: ${message}`));
}

function success(message) {
  log(green(`🙌 SUCCESS: ${message}`));
}

function error(message) {
  log(red(`❌ ERROR: ${message}`));
}

function warning(message) {
  log(yellow(`⚠️ WARNING: ${message}`));
}

module.exports = { info, success, error, warning };
