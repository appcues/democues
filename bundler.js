console.log("begin bundler");
var appCutieAccountId = '42328';
var accountBundledSettings = null;

chrome.storage.local.get(['appcutie'], function(result) {
    if(result.appcutie !== undefined) {
        console.log('setting up override', result);
        appCutieAccountId = result.appcutie.accountId;
        if (result.appcutie.bundledSettings) {
            accountBundledSettings = result.appcutie.bundledSettings;
        }
    }
});
console.log("end bundler");
