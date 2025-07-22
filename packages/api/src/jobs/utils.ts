import { DomainRegex } from "@/jobs/constants";

export function urlToSite(url: string) {
	let site = "";
	if (url.toLowerCase().includes("linkedin")) {
		site = "LinkedIn";
	}
	else if (url.includes("indeed")) {
		site = "Indeed";
	}
	else if (url.includes("reddit")) {
		site = "Reddit";
	}
	else if (url.includes("vuejobs")) {
		site = "VueJobs";
	}
	else {
		site = url.match(DomainRegex)?.[1]?.replace(/\..*/, "") ?? "";
		if (site) {
			site = site[0].toUpperCase() + site.substring(1);
		}
	}
	return site;
}
