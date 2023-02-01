/* eslint-disable @typescript-eslint/no-var-requires */
const delay = require('delay');
const shell = require('shelljs');
const { info, warning, success } = require('./logger');
const { mongoDockerScriptStart, mongoDockerScriptEnd } = require('./mongo-db');

async function run() {
  info('Hey and wellcome to backend setup wizard!');
  warning(
    'Please, check, if your .env file exists. If not, create it based on .env.example shape',
  );

  info('Cleaning node_modules cache..');
  shell.exec('rm -rf node_modules/.cache/');
  await delay(1000);

  mongoDockerScriptStart();
  await delay(5000);
  shell.exec('docker-compose up --build -d');
  info('Setup mongodb variables. Please, wait a little ;)');
  await delay(10000);
  mongoDockerScriptEnd();

  info('Install Prisma globally');
  shell.exec('npm install prisma -g');

  info('Create initial Prisma migration');
  shell.exec('npx prisma migrate dev --name init');

  info('Generate actual Prisma Client');
  shell.exec('prisma generate');

  info('Run Prisma migration');
  shell.exec('npx prisma db push');

  info('...and last one. Seed initial data to Postgres');
  shell.exec('npx prisma db seed');

  success('oh, it seems to be done!');
}

run();
