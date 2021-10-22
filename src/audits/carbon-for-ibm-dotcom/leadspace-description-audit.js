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
    'The Carbon for IBM.com Leadspace component is using the recommended character count for the description.',
  failureTitle:
    'The Carbon for IBM.com Leadspace component is not using the recommended character count for the description.',
  description:
    'The Leadspace component has a recommended maximum number of characters for the description. See the [content guidance](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/leadspace#content-guidance) for more information.',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const maxDescriptionLength = 120;

/**
 * @file Audits the recommended amount of characters in the `leadspace` component description.
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'leadspace-description-audit',
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
    const loadLeadspace = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--leadspace';
    });

    const loadDescription = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--leadspace__description';
    });

    // Leadspace not found, audit not applicable
    if (!loadLeadspace[0]) {
      return {
        notApplicable: true,
        score: Number(0),
      };
    }

    const hasDescription = loadDescription.length !== 0;
    const description = !hasDescription
      ? loadLeadspace[0].innerText.split('\n').filter((e) => {
          return e !== '';
        })[1].length
      : loadDescription[0].innerText.length;

    // binary scoring
    const score = description <= maxDescriptionLength ? 1 : 0;

    return {
      rawValue: hasDescription,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
