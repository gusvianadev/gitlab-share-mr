function createDiscordShareButton() {
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
		shareWithDiscordBot();
	};
	titleElement.appendChild(icon);
}

async function shareWithDiscordBot() {
	// First let's just test the bot at localhost:8000/up
	// make a URL object for the URL, we'll use it later and simply make the get request
	try {
		const url = new URL("http://localhost:8000/up");
		await fetch(url);
	} catch (error) {
		console.error(error);
	}
}

(function content() {
	createDiscordShareButton();
})();
