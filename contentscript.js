console.log("Appending Appcues Javascript...");

// Add the script and anonymous identify
const s = document.createElement("script");
s.src = "//fast.appcues.com/31123.js";
(document.head || document.documentElement).appendChild(s);
s.onload = function() {
  console.log('Appcues script appended.');
};
