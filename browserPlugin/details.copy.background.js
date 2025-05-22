/**
 * Had to change a lot of this for manifest v3
 * Source: https://stackoverflow.com/a/76567695/1253609
 * 
 * Also had issues with details.copy.context.js running twice and having an error in it... fixed it by wrapping the
 * file in a try catch and removing the allFrames in the target property below
 * Source: https://discourse.mozilla.org/t/manifest-v3-background-script-issue/143408
 */
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "details-copy",
		title: "Copy Job Details",
	});
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['details.copy.context.js']
	});
});