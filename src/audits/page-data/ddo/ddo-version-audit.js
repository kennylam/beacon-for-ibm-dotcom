/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Audit = require('lighthouse').Audit;
const constants = require('../../../config/constants');
const i18n = require(constants.paths.i18n);

const UIStrings = {
  title: 'The Digital Data Object `version` property is set.',
  failureTitle:
    'The Digital Data Object Carbon for IBM.com `version` property is missing.',
  description:
    'The Digital Data Object version property shows what Carbon for IBM.com version is being used on a page. This information can be helpful in troubleshooting bugs when authoring with Carbon for IBM.com packages. [Learn more](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/docs/building-for-ibm-dotcom.md#digital-data-object).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/**
 * @file Audits if `version` value is present in the Digital Data Object (DDO).
 */
class DDOAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'ddo-version-audit',
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
    const loadMetrics = artifacts.CheckDDO.page.pageInfo.version;
    const hasVersion = typeof loadMetrics !== 'undefined';

    // binary scoring
    const score = hasVersion ? 1 : 0;

    return {
      rawValue: hasVersion,
      score: Number(score),
    };
  }
}

module.exports = DDOAudit;
