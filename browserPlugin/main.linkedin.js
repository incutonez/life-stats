/**
 * In order to use this, go to about:debugging#/runtime/this-firefox and load the manifest.json file as the Temporary Add-on
 */
 const HideViewed = true;
 const HideApplied = true;
 const HidePromoted = false;
const MatchRegex = [HideViewed ? "Viewed" : "", HideApplied ? "Applied" : "", HidePromoted ? "Promoted" : ""].filter(Boolean).join("|");
const Today = new Date();
const OneWeek = 604800000;
const HoursAgoRegex = /(\d+) hours ago/;
const MinutesAgoRegex = /minutes ago/;
const RemoteOrLocalRegex = /, (va|md|dc)|\(remote\)/i;
const HoursToCheck = undefined;
const cardClass = ".ember-view.scaffold-layout__list-item";
const LocationClass = ".artdeco-entity-lockup__caption";

async function main() {
	const { CompaniesRegex } = await import(chrome.runtime.getURL("companies.js"));
	setInterval(removeJobs, 100);

	function removeJobs() {
		document.querySelectorAll(LocationClass).forEach((el) => {
			if (!el.innerText.match(RemoteOrLocalRegex)) {
				el.closest(cardClass)?.remove();
			}
		});
		document.querySelectorAll(".job-card-container__footer-item").forEach((el) => {
			if (el.innerHTML.match(MatchRegex)) {
				el.closest(cardClass).remove();
			}
		});
		document.querySelectorAll(".artdeco-entity-lockup__subtitle").forEach((el) => {
			if (el.innerHTML.match(CompaniesRegex)) {
				el.closest(cardClass).remove();
			}
		});
		document.querySelectorAll(".job-card-container__footer-item time").forEach((el) => {
			const text = el.innerText;
			if (Today - new Date(el.getAttribute("datetime")) > OneWeek) {
				el.closest(cardClass).remove();
			}
			else if (HoursToCheck && !MinutesAgoRegex.test(text)) {
				const match = text?.match(HoursAgoRegex)?.[1];
				if (!match || +match > HoursToCheck) {
					el.closest(cardClass).remove();
				}
			}
		});
	}
}

main();