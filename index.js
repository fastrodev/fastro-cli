#!/usr/bin/env node

const path = require('path');
const { execSync } = require('child_process');
const cwd = process.cwd();

const msg = `
Usage: 
- fastro init       : clone template, create .env, install deps & build all typescript files
- fastro --version  : get fastro-cli version
`

const init = () => {
  const gitCommand = `git clone git@github.com:fastrodev/fastro-web.git ${cwd}`;
  const envCommand = `
  echo 'APP_PORT=8080' > ${cwd}/.env
  echo 'DB_HOST=localhost' >> ${cwd}/.env
  echo 'DB_PORT=3306' >> ${cwd}/.env
  echo 'DB_USER=root' >> ${cwd}/.env
  echo 'DB_PASSWORD=root' >> ${cwd}/.env
  echo 'DB_DATABASE=test' >> ${cwd}/.env
  echo 'DB_SYNCHRONIZE=true' >> ${cwd}/.env
  echo 'DB_LOGGING=false' >> ${cwd}/.env
  `
  execSync(gitCommand, {stdio: [0, 1, 2], cwd});
  execSync(envCommand, {stdio: [0, 1, 2], cwd});
  execSync('rm -rf .git', {stdio: [0, 1, 2], cwd});
  execSync('npm install', {stdio: [0, 1, 2], cwd});
  execSync('npm run build', {stdio: [0, 1, 2], cwd});
}

const printVersion = () => {
  var pjson = require('./package.json');
  console.log(`fastro-cli v${pjson.version}`);
}

const [node, cmd, arg] = process.argv
if (!arg) {
  console.log(msg)
  printVersion()
}

if (arg === 'init') init()
if (arg === '--version') printVersion()

