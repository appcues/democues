console.log("Democues begin...");
// chrome.storage.sync.clear(function() {
//     // Notify that we saved.
//     console.log('Settings cleared');
// });
chrome.storage.sync.get(['appcutie'], function(result) {
    if(result.appcutie === undefined) {
        const appcutie = {appcutie: { accountId: '42328', userId: 'mog'}};
        chrome.storage.sync.set(appcutie, function() {
            // Notify that we saved.
            console.log('Settings saved');
            console.log('is appcues loaded?', Appcues);
            Appcues.identify(appcutie.userId);
        });
    } else {
        console.log('Value currently is ' + JSON.stringify(result.appcutie));
        console.log('is appcues loaded?', Appcues);
        Appcues.identify(result.appcutie.userId);
    }
});
