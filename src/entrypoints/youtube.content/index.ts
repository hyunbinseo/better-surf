import questionMark from './question-mark.svg?raw';

const createMenuItem = (label: string, icon: string, onclick: (e: MouseEvent) => void) => {
	const a = document.createElement('a');
	a.innerHTML = `
<div class="ytp-menuitem-icon">${icon}</div>
<div class="ytp-menuitem-label">${label}</div>
<div class="ytp-menuitem-content"></div>`;
	a.setAttribute('class', 'ytp-menuitem');
	a.setAttribute('role', 'menuitem');
	a.onclick = (e) => {
		e.preventDefault();
		onclick(e);
	};
	return a;
};

const identifier = 'better-surf';
const selector = `.ytp-popup.ytp-contextmenu .ytp-panel-menu:not(.${identifier})`;

const openCobalt = () => window.open(`https://cobalt.tools/#${window.location.href}`, '_blank');

export default defineContentScript({
	matches: ['https://www.youtube.com/*'],
	main: () => {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (!mutation.addedNodes?.length) continue;

				const panel = document.querySelector(selector);
				if (!panel) continue;

				panel.classList.add(identifier);
				panel.prepend(createMenuItem('영상 다운로드', questionMark, openCobalt));

				observer.disconnect();
			}
		});

		const observe = () => {
			observer.disconnect();
			observer.observe(document.body, { childList: true, subtree: true });
		};

		observe();
		document.addEventListener('yt-navigate-finish', observe);
	},
});
