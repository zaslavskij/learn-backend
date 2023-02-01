/* eslint-disable @typescript-eslint/no-var-requires */
const replace = require('replace-in-file');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const envMap = {
  'process.env.MONGO_INITDB_DATABASE': process.env.MONGO_INITDB_DATABASE,
  'process.env.MONGO_INITDB_USERNAME': process.env.MONGO_INITDB_USERNAME,
  'process.env.MONGO_INITDB_PASSWORD': process.env.MONGO_INITDB_PASSWORD,
};
const mongoPath = path.resolve('./mongo-init.js');

function mongoDockerScriptStart() {
  Object.keys(envMap).forEach((key) => {
    replace.sync({
      files: mongoPath,
      from: `'${key}'`,
      to: `'${envMap[key]}'`,
    });
  });
}

function mongoDockerScriptEnd() {
  Object.keys(envMap).forEach((key) => {
    replace.sync({
      files: mongoPath,
      from: `'${envMap[key]}'`,
      to: `'${key}'`,
    });
  });
}

module.exports = { mongoDockerScriptStart, mongoDockerScriptEnd };
