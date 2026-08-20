export function initAreaFilter(cardSelector: string) {
	const bar = document.querySelector<HTMLElement>('[data-filters]');
	const status = document.querySelector<HTMLElement>('[data-filter-status]');
	const cards = Array.from(document.querySelectorAll<HTMLElement>(cardSelector));

	if (!bar || cards.length === 0) return;

	const links = Array.from(bar.querySelectorAll<HTMLAnchorElement>('[data-filter]'));
	const template = bar.dataset.template ?? '';

	function apply(area: string, updateHistory: boolean) {
		let shown = 0;
		for (const card of cards) {
			const list = (card.dataset.areas ?? '').split(' ');
			const match = area === '' || list.includes(area);
			card.hidden = !match;
			if (match) shown++;
		}

		for (const link of links) {
			if (link.dataset.filter === area) {
				link.setAttribute('aria-current', 'true');
			} else {
				link.removeAttribute('aria-current');
			}
		}

		if (status) {
			status.textContent = template.replace('{shown}', String(shown)).replace('{total}', String(cards.length));
		}

		if (updateHistory) {
			const url = new URL(window.location.href);
			if (area) {
				url.searchParams.set('area', area);
			} else {
				url.searchParams.delete('area');
			}
			history.replaceState(null, '', url);
		}
	}

	for (const link of links) {
		link.addEventListener('click', (event) => {
			event.preventDefault();
			apply(link.dataset.filter ?? '', true);
		});
	}

	const requested = new URL(window.location.href).searchParams.get('area') ?? '';
	const known = links.some((link) => link.dataset.filter === requested);
	apply(known ? requested : '', false);
}
