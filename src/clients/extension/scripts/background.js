async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(
  function (url, sender, onSuccess) {
    fetch(url)
      .then(response => response.text())
      .then(responseText => onSuccess(responseText))

    return true;  // Will respond asynchronously.
  }
);

chrome.tabs.query(
  {
    currentWindow: true,    // currently focused window
    active: true            // selected tab
  },
  function (foundTabs) {
    if (foundTabs.length > 0) {
      var url = foundTabs[0].url; // <--- this is what you are looking for
      console.log('url', url);
    } else {
      // there's no window or no selected tab
    }
  }
);
