console.log("Democues begin...");

chrome.storage.sync.get(['appcutie'], function(result) {
    if(result.appcutie === undefined) {
        console.log('no appcutie found going anonymous');
        Appcues.anonymous();
    } else {
        console.log('Value currently is ' + JSON.stringify(result.appcutie));
        console.log('is appcues loaded?', Appcues);
        Appcues.identify(result.appcutie.userId);
    }
});
console.log("Democues end.");
