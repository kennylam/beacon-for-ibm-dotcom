/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Gatherer = require('lighthouse').Gatherer;

/**
 * Gatherer to return the DDO (Digital Data Object) if present on page.
 *
 * @returns {object} Digital Data Object
 */
class CheckDDO extends Gatherer {
  /**
   * @param {object} options Gatherer options
   * @returns {*} Gatherer artifact
   */
  afterPass(options) {
    const driver = options.driver;
    return (
      driver
        .evaluateAsync('window.digitalData')
        // Ensure returned value is what we expect.
        .then((loadMetrics) => {
          if (!loadMetrics) {
            throw new Error('Unable to find load metrics in page');
          }
          return loadMetrics;
        })
    );
  }
}

module.exports = CheckDDO;
