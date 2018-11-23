chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
      if (details.url.indexOf("http://democues.reload") >= 0) {
          console.log('hit blocker for reloader');
      chrome.runtime.reload();
        return {
            redirectUrl: 'javascript:void(0)'
      };
    }
    return {cancel: false};
  },
  {
    urls: ["http://democues.reload/"],
    types: ["main_frame"]
  },
  ["blocking"]
);
