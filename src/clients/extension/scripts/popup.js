const API_URL = `https://beacon-for-ibm-dotcom-api.gz4o4xx2g28.us-south.codeengine.appdomain.cloud`;
const PAGE_URL = window.location;
const TEST_URL = `https://beacon-for-ibm-dotcom-api.gz4o4xx2g28.us-south.codeengine.appdomain.cloud/?url=https://www.ibm.com`;

/**
 * Audit current page with @ibmdotcom/beacon
 */
function auditPage() {
  // console.log(`auditing {API_URL}/?url=${PAGE_URL}`);
  // `${API_URL}/?url=${PAGE_URL}`
  // fetch(`${TEST_URL}`)
  //   .then((response) => response.json())
  //   .then((data) => console.log('data', data));
  console.log('auditing');


  chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
    function (tabs) {
      window.open(`${API_URL}/?url=` + tabs[0].url);
    }
  );
  // chrome.runtime.sendMessage(`${TEST_URL}`, (response) => console.log('response:', response));
}

/**
 *
 */
async function init() {
  const analyzeBtn = document.getElementById('analyze-button');
  // const btn = document.querySelector('button.click-button');
  analyzeBtn.addEventListener('click', () => {
    auditPage();
  });
}

init();
