#!/usr/bin/env node

"use strict";
let command_1 = require('@2fd/command');
let command_2 = require('../lib/command');

(new command_2.GraphQLDocumentor)
    .handle(new command_1.ArgvInput(process.argv), new command_1.ColorConsoleOutput);
