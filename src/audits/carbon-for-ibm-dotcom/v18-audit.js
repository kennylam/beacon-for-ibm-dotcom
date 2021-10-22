/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Audit = require('lighthouse').Audit;
const constants = require('../../config/constants');
const i18n = require(constants.paths.i18n);

const UIStrings = {
  title: 'No v18 or v19a library files found on the page.',
  failureTitle: 'Library files from v18 and/or v19a were found on this page.',
  description:
    'V18 and v19a will no longer be supported after December 2021. Continuing with these libraries may cause problems on the page in the future. To avoid issues, please remove all v18 and v19a library files and replace them with Carbon for IBM.com components. [Learn more](https://www.ibm.com/standards/carbon/all-about-carbon-for-ibm.com/get-started/).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/**
 * @file Audits if page contains Northstar v18 classes
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'v18-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckV18'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    if (!artifacts.CheckV18) {
      return {
        rawValue: true,
        score: Number(1),
      };
    }

    const totalClasses = artifacts.CheckV18.length;

    const score = !totalClasses ? 1 : 0;
    const displayString = totalClasses
      ? `${totalClasses} v18 classes found`
      : '';

    return {
      notApplicable: !artifacts.CheckV18,
      rawValue: artifacts.CheckV18,
      score: Number(score),
      displayValue: displayString,
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
