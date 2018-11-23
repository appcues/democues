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
        var parser = document.createElement('a');
        parser.href = details.url;
        if (parser.hostname.indexOf("democues.reload") >= 0) {
      chrome.runtime.reload();
          return {
              redirectUrl: 'https://my.appcues.com/'
          };
        } else if (parser.hostname.indexOf("democues.init") >= 0) {
            const urlParams = new URLSearchParams(parser.search);
            const userId = urlParams.get('userId');
            const accountId = urlParams.get('accountId');
            chrome.storage.sync.get(['appcutie'], function(result) {
                if(result.appcutie === undefined) {
                    const newResult = {appcutie: { accountId: accountId, userId: userId}};
                    chrome.storage.sync.set(newResult, function() {
                        console.log('Settings saved', newResult);
                    });
                } else {
                    const newResult = {appcutie: { accountId: (accountId) ? accountId : result.appcutie.accountId,
                                                   userId: (userId) ? userId: result.appcutie.userId}};
                    if(newResult.appcutie.userId && newResult.appcutie.accountId) {
                        chrome.storage.sync.set(newResult, function() {
                            console.log('Settings saved');
                        });
                    }
                }
            });
          chrome.runtime.reload();
          return {
              redirectUrl: 'https://my.appcues.com/'
          };
      }
      return {cancel: false};
  },
    {
        urls: ["http://democues.reload/", "http://democues.init/*"],
        types: ["main_frame"]
    },
    ["blocking"]
);
