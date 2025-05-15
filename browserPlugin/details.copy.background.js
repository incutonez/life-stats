/**
 * Had to change a lot of this for manifest v3
 * Source: https://stackoverflow.com/a/76567695/1253609
 */
chrome.runtime.onInstalled.addListener(() => {
	browser.contextMenus.create({
	  id: "details-copy",
	  title: "Copy Job Details",
	});
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
	chrome.scripting.executeScript({
	  target: { tabId: tab.id, allFrames: true },
	  files: ['details.copy.context.js']
	});
});