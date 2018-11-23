console.log("Democues begin...");

// chrome.storage.local.clear(function() {
//     // Notify that we saved.
//     console.log('Settings cleared');
// });

chrome.storage.local.get(['appcutie'], function(result) {
    if(result.appcutie === undefined) {
        const newResult = {appcutie: { accountId: '42328', userId: 'mog'}};
        chrome.storage.local.set(newResult, function() {
            // Notify that we saved.
            console.log('Settings saved');
            console.log('is appcues loaded?!?', newResult.appcutie, Appcues);
            Appcues.identify(newResult.appcutie.userId);
        });
    } else {
        console.log('Value currently is ' + JSON.stringify(result.appcutie));
        console.log('is appcues loaded?', Appcues);
        Appcues.identify(result.appcutie.userId);
    }
});
