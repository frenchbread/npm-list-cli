#!/usr/bin/env node
'use strict';

const meow = require('meow');
const npmList = require('./lib/npmList');

const cli = meow(`

  Usage:

    $ npm-list
    $ npm-list --global

  Options

    --global  List global NPMs
`);

npmList(cli.flags.global || cli.flags.g);
