/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Audit = require('lighthouse').Audit;
const i18n = require('../../../../node_modules/lighthouse/lighthouse-core/lib/i18n/i18n.js');

const UIStrings = {
  title: 'Digital Data Object `country` property is set.',
  failureTitle: 'Digital Data Object `country` property is missing.',
  description:
    'This property is used for localization and translation services. [Learn more](https://pages.github.ibm.com/digital-behavior/docs/stds-ddo.html#16-ibm-specific-page-information).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/**
 * @file Audits if `country` value is present in the Digital Data Object (DDO).
 */
class DDOAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'ddo-country-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckDDO'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    const loadMetrics = artifacts.CheckDDO.page.pageInfo.ibm.country;
    const hasDDO = typeof loadMetrics !== 'undefined';

    // binary scoring
    const score = hasDDO ? 1 : 0;

    return {
      rawValue: hasDDO,
      score: Number(score),
    };
  }
}

module.exports = DDOAudit;
