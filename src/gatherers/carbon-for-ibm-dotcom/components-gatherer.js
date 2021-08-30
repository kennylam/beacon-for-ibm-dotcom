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
 * Gets the Carbon for IBM.com components in the DOM DOM based on `data-autoid` attribute.
 *
 * @returns {Array} array of Carbon for IBM.com components
 */
function getComponentsInDOM() {
  // @ts-expect-error - getElementsInDocument put into scope via stringification
  const browserElements = getElementsInDocument(`[data-autoid^='dds--']`); // eslint-disable-line no-undef
  const components = [];

  for (const element of browserElements) {
    if (!(element instanceof HTMLElement)) continue;

    const dataAutoid = element.getAttribute('data-autoid') || '';
    components.push({
      rel: element.rel,
      href: element.href,
      hreflang: element.hreflang,
      as: element.as,
      crossOrigin: element.crossOrigin,
      innerText: element.innerText,
      dataAutoid,
      // @ts-expect-error - put into scope via stringification
      // eslint-disable-next-line no-undef
      node: getNodeDetails(element),
    });
  }
  return components;
}

/**
 * Gatherer to return Carbon for IBM.com components (`data-autoid=dds-*`) found on page.
 */
class CheckComponents extends Gatherer {
  /**
   * @param {object} passContext passContext object
   * @returns {Promise} promise of Carbon for IBM.com components found in DOM
   */
  static getComponentsInDOM(passContext) {
    // We'll use evaluateAsync because the `node.getAttribute` method doesn't actually normalize
    // the values like access from JavaScript does.
    return passContext.driver.executionContext.evaluate(getComponentsInDOM, {
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
    const driver = await CheckComponents.getComponentsInDOM(options);
    return driver;
  }
}

module.exports = CheckComponents;
