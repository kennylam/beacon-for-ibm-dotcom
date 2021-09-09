#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const yargs = require('yargs');
const beaconForIBM = require('.');

const options = yargs
  .demandOption(['u'])
  .alias('u', 'url')
  .describe('url', 'URL to audit')
  .alias('o', 'output')
  .describe('output', 'Output file format [default: HTML]')
  .alias('r', 'raw')
  .describe('raw', 'Output raw data')
  .alias('h', 'help')
  .help('h').argv;

beaconForIBM(options);
