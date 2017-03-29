//-----------------------handle alarms----------------------------
var DELAY = 0.2; //12 Seks
/**
	Restart alarm for the currently active tab, whenever a new tab becomes active.
*/
browser.tabs.onActivated.addListener((activeInfo) => {
  restartAlarm(activeInfo.tabId);
});

/**
	restartAlarm: clear all alarms,
	then set a new alarm for the given tab.
*/
function restartAlarm(tabId) {
  browser.alarms.clearAll();
  var gettingTab = browser.tabs.get(tabId);
  gettingTab.then((tab) => {
  browser.alarms.create("", {delayInMinutes: DELAY});
  });
}

/**
	On alarm, show div.
*/
browser.alarms.onAlarm.addListener(injectScript);

//------------------------------------------------------------------
function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

function getHostname(href){
	var l = document.createElement("a");
    l.href = href;
    return l.hostname;
}

function injectScript() {
	console.log("erstes Div erscheint");
	getActiveTab().then((tabs) => {
		var inject1 = browser.tabs.executeScript(null, {
			file: "/content_scripts/content.js"
		});
		inject1.then(null, handleError);
		var inject2 = browser.tabs.executeScript(null, {
			file: "/html2canvas/dist/html2canvas.js"
		});
		inject2.then(null, handleError);
		var inject3 = browser.tabs.executeScript(null, {
			file: "/html2canvas/src/renderers/bundle.js"
		});
		inject3.then(null, handleError);
		// send message to contentscript. Only the host part of url
		browser.tabs.sendMessage(tabs[0].id, {currentUrl: getHostname(tabs[0].url)});
	}); 	
}

function handleError(error) {
	console.log(`Error: ${error}`);
}