let companyName;
let jobTitle;
let url;
let pay = "";
let appliedDate = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
}).format(new Date());
if (location.hostname === "www.indeed.com") {
  const skills = document.getElementsByClassName('js-match-insights-provider-1vjtffa');
  const parent = document.querySelector("[data-testid='inlineHeader-companyName']") ?? document.querySelector('.jobsearch-JobInfoHeader-companyNameLink') ?? document.querySelector('.jobsearch-JobInfoHeader-companyNameSimple');
  for (const skill of skills) {
    if (skill.innerText.includes("$")) {
      pay = skill.innerText;
      break;
    }
  }
  companyName = parent.getElementsByTagName("a")[0]?.innerText || parent.innerText;
  jobTitle = (document.querySelector("[data-testid='jobsearch-JobInfoHeader-title']") ?? document.querySelector("[data-testid='simpler-jobTitle']")).innerText;
  url = location.href.split('?')[0] + `?jk=${Object.fromEntries(new URLSearchParams(location.search)).jk}`;
}
else {
  let skills = document.getElementsByClassName('job-details-preferences-and-skills__pill');
  const parent = document.getElementsByClassName('job-details-jobs-unified-top-card__company-name')[0];
  // Older way of processing skills... not sure if this conditional is ever used now
  if (skills.length) {
	  for (const skill of skills) {
		if (skill.innerText.includes("$")) {
		  pay = skill.innerText;
		  break;
		}
	  }
  }
  else {
	  skills = document.querySelectorAll('.job-details-fit-level-preferences')[0]?.querySelectorAll('.tvm__text.tvm__text--low-emphasis') ?? [];
	  for (const skill of skills) {
		if (skill.innerText.includes("$")) {
		  pay = skill.innerText;
		  break;
		}
	  }
  }
  companyName = parent.getElementsByTagName("a")[0]?.innerText || parent.innerText;
  jobTitle = document.getElementsByClassName('t-24 t-bold inline')[0].innerText;
  url = location.href.split('?')[0];
}
navigator.clipboard.writeText(`${companyName};${jobTitle};${appliedDate};${url};${pay}`);
