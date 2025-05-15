const ParentCard = ".transition-all";
const LastCompany = "JustWatch";
let found = false;

document.querySelectorAll('.flex.items-center.text-sm.font-medium.text-muted').forEach((el) => {
	if (el.innerText.includes(LastCompany)) {
		found = true;
	}
	if (found) {
		el.closest(ParentCard).remove();
	}
});
