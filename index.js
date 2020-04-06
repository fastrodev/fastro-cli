#!/usr/bin/env node

const path = require('path');
const{ execSync } = require('child_process');
const cwd = process.cwd();
const gitCommand = `git clone git@github.com:fastrolib/fastro-web.git ${cwd}`;
execSync(gitCommand, {stdio: [0, 1, 2], cwd});
execSync('rm -rf .git', {stdio: [0, 1, 2], cwd});
execSync('npm install', {stdio: [0, 1, 2], cwd});
