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
  title:
    'The Carbon for IBM.com Content block component is using the recommended character count for the heading.',
  failureTitle:
    'The Carbon for IBM.com Content block component is not using the recommended character count for the heading.',
  description:
    'The Content block component has a recommended maximum number of characters for the heading. See the [content guidance](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/content-block-simple#content-guidance) for more information.',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const maxHeadingLength = 40;

/**
 * @file Audits the recommended amount of characters in the `content-block` component heading.
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'content-block-heading-audit',
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
      return link.dataAutoid === 'dds--content-block__heading';
    });

    const hasContentBlockHeading = loadMetrics.length !== 0;
    if (!hasContentBlockHeading) {
      return {
        notApplicable: true,
        score: Number(0),
      };
    }
    const contentBlockHeading = loadMetrics[0].innerText.length;

    // binary scoring
    const score = contentBlockHeading <= maxHeadingLength ? 1 : 0;

    return {
      rawValue: hasContentBlockHeading,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
