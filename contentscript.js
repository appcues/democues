console.log("Democues begin...");
console.log("Democues begin...", bundledSettings, "just in case");
// chrome.storage.local.clear(function() {
//     // Notify that we saved.
//     console.log('Settings cleared');
// });

chrome.storage.local.get(['appcutie'], function(result) {
    if(result.appcutie === undefined) {
        Appcues.anonymous();
    } else {
        console.log('Value currently is ' + JSON.stringify(result.appcutie));
        console.log('is appcues loaded?', Appcues);
        Appcues.identify(result.appcutie.userId);
    }
});
console.log("Democues end.");
