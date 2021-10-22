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
  title: 'The Carbon for IBM.com Footer component is in use on the page.',
  failureTitle: 'The Carbon for IBM.com Footer component is missing.',
  description:
    'The Carbon for IBM.com Footer component is required on all pages on IBM.com. [Learn more](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/footer).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/**
 * @file Audits if page contains the `footer` component.
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'footer-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckComponents'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    const loadMetrics = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--footer';
    });

    const hasFooter = loadMetrics.length !== 0;

    // binary scoring
    const score = hasFooter ? 1 : 0;

    return {
      rawValue: hasFooter,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
