// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log("The color is green.");
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'developer.chrome.com'},
//       })
//       ],
//         actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });

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
                        console.log('Settings saved');
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

// This handles csp bugs i was having before and its magical!
chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
        // probably a better place to define these too.
        var ourRules = [
            {"name": "frame-src",  "rule": "https://my.appcues.com https://*.firebaseio.com"},
            {"name": "bs-frame-src",  "rule": "https://my.appcues.com https://*.firebaseio.com"},
            {"name": "style-src",  "rule": "https://fast.appcues.com https://fonts.googleapis.com"},
            {"name": "script-src", "rule": "https://fast.appcues.com https://my.appcues.com https://cdn.firebase.com https://*.firebaseio.com https://appcues-quickstart.s3-us-west-2.amazonaws.com"},
            {"name": "img-src",    "rule": "https://vulpix.appcues.com https://res.cloudinary.com"},
            {"name": "connect-src","rule":"https://fast.appcues.com https://api.appcues.net wss://api.appcues.net https://vulpix.appcues.com https://appcues-content-api-prod.herokuapp.com https://nh436jpc4i.execute-api.us-west-2.amazonaws.com https://104cl9psz3.execute-api.us-west-2.amazonaws.com https://appcues-quickstart.s3-us-west-2.amazonaws.com https://*.firebase.com wss://*.firebaseio.com https://*.firebaseio.com"}
        ];

        // if details.url  not in our list of domains jump out
        var headers = details.responseHeaders;
        headers = headers.map((header) => {
            let name = header.name.toLowerCase();
            if (name !== "content-security-policy" &&
                name !== "content-security-policy-report-only" &&
                name !== "x-webkit-csp") {
                return header;
            }

            var modifiedCSP = "";
            var theirRules = header.value.split(';').map(s => s.trim());
            ourRules.map((ourRule) => {
                // let found = 0;
                theirRules = theirRules.map((theirRule) => {
                    if (theirRule.indexOf(ourRule.name) >= 0) {
                        theirRule = theirRule + ' ' + ourRule.rule;
                        // found = 1;
                    }
                    return theirRule;
                });
                // if its not found we dont need to do anything
                // if (!found) {
                //     theirRules.push(ourRule.name + ' ' + '\'self\'' + ' ' + ourRule.rule);
                // }
            });
            theirRules.map((theirRule) => {
                if (theirRule != "") {
                    modifiedCSP =  modifiedCSP + ' ' + theirRule + ';';
                }
            });
            header.value = modifiedCSP;
            return header;
        });
        return {responseHeaders: headers};
    },
    {
        urls: ["*://*/*"],
        types: ["main_frame", "sub_frame"]
    }, ["blocking", "responseHeaders"]);
