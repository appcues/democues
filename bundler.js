console.log("begin bundler");
var appcutieAccountId = '42328';
var accountBundledSettings = null;

chrome.storage.sync.get(['appcutie'], function(result) {
    if(result.appcutie !== undefined) {
        console.log('setting up override', result);
        appcutieAccountId = result.appcutie.accountId;
        if (result.appcutie.bundledSettings) {
            accountBundledSettings = result.appcutie.bundledSettings;
        }
    }
});
console.log("end bundler");
