/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const path = require('path');

/**
 * @constant Set global paths.
 * @ignore
 */
const AUDIT_PATH = path.join(__dirname, '../audits');
const GATHERER_PATH = path.join(__dirname, '../gatherers');
const I18N_PATH = path.join(
  __dirname,
  '../../../lighthouse/lighthouse-core/lib/i18n/i18n.js'
);
const PAGE_FUNCTIONS = path.join(
  __dirname,
  '../../../lighthouse/lighthouse-core/lib/page-functions.js'
);

const paths = {
  audit: AUDIT_PATH,
  gatherer: GATHERER_PATH,
  i18n: I18N_PATH,
  pageFunctions: PAGE_FUNCTIONS,
};

module.exports = {
  paths,
};
