const ParentCls = ".css-1ac2h1w";
const VisitedCls = ".underShelfFooter";
const CompanyCls = ".css-1h7lukg";

async function main() {
	const { CompaniesRegex } = await import(chrome.runtime.getURL("companies.js"));
	
	setInterval(removeJobs, 100);

	function removeJobs() {
		document.querySelectorAll(CompanyCls).forEach((el) => {
			if (el.innerHTML.match(CompaniesRegex)) {
				el.closest(ParentCls).remove();
			}
		});
		
		document.querySelectorAll(".css-ggmybd").forEach((el) => {
				el.closest(ParentCls).remove();
		});

		document.querySelectorAll(VisitedCls).forEach((el) => {
			if (el.innerText.includes("Visited ")) {
				el.closest(ParentCls).remove();
			}
		});
	}
}

main();