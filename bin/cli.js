#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { startServer } = require('../lib/server');
const { exportExtension } = require('../lib/export');

yargs(hideBin(process.argv))
  .command(
    'start',
    'Start the local port detector server',
    (yargs) => {
      return yargs.option('port', {
        alias: 'p',
        type: 'number',
        description: 'Port to run the server on',
        default: 9999
      });
    },
    (argv) => {
      startServer(argv.port);
    }
  )
  .command(
    'export',
    'Export the Chrome extension to a specified directory',
    (yargs) => {
      return yargs.option('out', {
        alias: 'o',
        type: 'string',
        description: 'Output directory for the extension',
        default: './local-port-detector-extension'
      });
    },
    (argv) => {
      exportExtension(argv.out);
    }
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv;
