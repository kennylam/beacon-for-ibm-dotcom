/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const constants = require('../../config/constants');
const Gatherer = require('lighthouse').Gatherer;
const pageFunctions = require(constants.paths.pageFunctions);

/**
 * Gets the legal links in the DOM based on `data-autoid` attribute.
 *
 * @returns {Array} array of legal links in the Carbon for IBM.com `footer` component
 */
function getLegalLinksInDOM() {
  // @ts-expect-error - getElementsInDocument put into scope via stringification
  const browserElements = getElementsInDocument('a'); // eslint-disable-line no-undef
  const linkElements = [];

  for (const link of browserElements) {
    if (!(link instanceof HTMLElement)) continue;

    const hrefRaw = link.getAttribute('href') || '';
    const dataAutoid = link.getAttribute('data-autoid') || '';
    const source = link.closest('head') ? 'head' : 'body';

    // check if the data-autoid is one of a legal link or specifically the cookie preferences link
    if (
      dataAutoid === 'dds--footer-legal-nav__link-privacy' ||
      dataAutoid === 'dds--footer-legal-nav__link-terms-of-use' ||
      dataAutoid === 'dds--footer-legal-nav__link-accessibility' ||
      dataAutoid === 'dds--privacy-cp__link'
    ) {
      linkElements.push({
        rel: link.rel,
        href: link.href,
        hreflang: link.hreflang,
        as: link.as,
        crossOrigin: link.crossOrigin,
        hrefRaw,
        source,
        dataAutoid,
        // @ts-expect-error - put into scope via stringification
        // eslint-disable-next-line no-undef
        node: getNodeDetails(link),
      });
    }
  }

  return linkElements;
}

/**
 * Gatherer to return legal links found in the Carbon for IBM.com `footer` component.
 */
class CheckLegalLinks extends Gatherer {
  /**
   * @param {object} passContext passContext object
   * @returns {Promise} promise of legal links found in the Carbon for IBM.com `footer` component
   */
  static getLegalLinksInDOM(passContext) {
    // We'll use evaluateAsync because the `node.getAttribute` method doesn't actually normalize
    // the values like access from JavaScript does.
    return passContext.driver.executionContext.evaluate(getLegalLinksInDOM, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getNodeDetailsString,
        pageFunctions.getElementsInDocument,
      ],
    });
  }

  /**
   * @param {object} options Gatherer options
   * @returns {*} Gatherer artifact
   */
  async afterPass(options) {
    const driver = await CheckLegalLinks.getLegalLinksInDOM(options);

    return driver;
  }
}

module.exports = CheckLegalLinks;
