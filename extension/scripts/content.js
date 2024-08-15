(function content() {
	const titleElement = document.querySelector(
		'h1[data-testid="title-content"]'
	);
	const titleText = titleElement?.textContent;
	if (!titleElement || !titleText) return;

	const icon = document.createElement("img");
	icon.src = chrome.runtime.getURL("icons/discord.svg");
	// make it be inline with the title without growing infinitely
	icon.style = `
		width: 20px;
		margin-left: 5px;
		cursor: pointer;
	`;
	icon.title = "Copy as Discdord message";

	icon.onclick = () => {
		const url = window.location.href;
		const text = `:merge_request: [${titleText.trim()}](${url})`;

		navigator.clipboard.writeText(text);
	};
	titleElement.appendChild(icon);
})();
