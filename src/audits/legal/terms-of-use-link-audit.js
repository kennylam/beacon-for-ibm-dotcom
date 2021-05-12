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
  title: 'Link to IBM Terms of use exists.',
  failureTitle: 'Link to IBM Terms of use does not exist.',
  description:
    'This is automatically included as part of the IBM Footer, but in case a custom implementation exists, this would potentially be omitted by the application team.',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/**
 * @file Audits if page contains the Terms of use legal link
 */
class LegalLinksAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'terms-of-use-link-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckLegalLinks'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    const loadMetrics = artifacts.CheckLegalLinks.filter((link) => {
      return link.node.nodeLabel === 'Terms of use';
    });

    const hasTermsOfUse = loadMetrics.length !== 0;

    // binary scoring
    const score = hasTermsOfUse ? 1 : 0;

    return {
      rawValue: hasTermsOfUse,
      score: Number(score),
    };
  }
}

module.exports = LegalLinksAudit;
