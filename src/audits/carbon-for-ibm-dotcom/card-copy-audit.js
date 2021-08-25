/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Audit = require('lighthouse').Audit;
const i18n = require('../../../node_modules/lighthouse/lighthouse-core/lib/i18n/i18n.js');

const UIStrings = {
  title: 'Carbon for IBM.com Card copy uses the recommended character count.',
  failureTitle:
    'Carbon for IBM.com Card copy does not use the recommended character count.',
  description:
    'The Card component has a recommended max amount of characters to be used in the copy. [Learn more](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/card).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const maxCopyLength = 200;

/**
 * @file Audits the recommended amount of characters in the `card` component copy.
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'card-copy-audit',
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
    const loadCard = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--card';
    });

    // Card not found, audit not applicable
    if (!loadCard[0]) {
      return {
        notApplicable: true,
        score: Number(0),
      };
    }

    // Card found, extracting copy if it exists
    const copy = loadCard[0].innerText.split('\n').filter((e) => {
      return e !== '';
    })[2];

    // binary scoring
    const score = copy && copy.length <= maxCopyLength ? 1 : 0;

    return {
      notApplicable: copy === undefined,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
