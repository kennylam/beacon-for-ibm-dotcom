/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const config = require(path.join(__dirname, 'src/config/custom-config.js'));
const chromeLauncher = require('chrome-launcher');

/**
 * @param {object} args Command line options
 * @param {string} args.url URL to run Lighthouse on
 * @param {string} args.output Output format. Supports 'html', 'json', and 'csv'. Default is 'html'.
 * @example beacon-for-ibm-dotcom --url "https://example.com" --output json
 * @returns {*} Raw output as a string if --raw is passed, otherwise outputs to stdout.
 */
module.exports = (args) => {
  return Promise.resolve(runLightHouse(args));
};

/**
 * Runs Lighthouse on the given URL and outputs the results in the given format.
 *
 * @param {object} args Command line options
 * @returns {string} Raw output as a string if --raw is passed, otherwise outputs to stdout.
 */
async function runLightHouse(args) {
  try {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-dev-shm-usage'],
    });
    const options = {
      logLevel: 'info',
      output: args.output ? args.output : 'html',
      port: chrome.port,
    };
    const runnerResult = await lighthouse(args.url, options, config);

    // `.report` is the outputted report.
    const report = await runnerResult.report;

    await chrome.kill();

    if (args.raw) {
      return await report;
    } else {
      fs.writeFileSync(`beacon.report.${options.output}`, report);
    }

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
  } catch (err) {
    console.log(err);
  }
}
