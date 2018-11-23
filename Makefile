all:
	curl -o build/temp.js https://fast.appcues.com/42328.debug.js
	echo "console.log('begin javascriptSDK');" > build/javascriptSDK.js
	cat build/temp.js >> build/javascriptSDK.js
	rm build/temp.js
	echo "" >> build/javascriptSDK.js
	echo "console.log('end javascriptSDK');" >> build/javascriptSDK.js
	sed -i 's/}, bundledSettings));/}, (accountBundledSettings) ? accountBundledSettings : bundledSettings));/g' build/javascriptSDK.js
	sed -i "s/    accountId:  false ? '' + \$$APPCUES_ACCOUNT_ID : '42328',/    accountId:  (appcutieAccountId) ? appcutieAccountId  : (false ? '' + \$$APPCUES_ACCOUNT_ID : '42328'),/g" build/javascriptSDK.js
