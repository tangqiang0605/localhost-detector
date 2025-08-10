#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { startServer } = require('../lib/server');
const { buildExtension } = require('../lib/build');
const { exportExtension } = require('../lib/export');

yargs(hideBin(process.argv))
  .command(
    'serve',
    'Serve the local port detector web UI and API',
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
    'build',
    'Build the Chrome extension',
    (yargs) => {
      return yargs
    },
    () => {
      buildExtension();
    }
  )
  .command(
    'export',
    'Export the Chrome extension',
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