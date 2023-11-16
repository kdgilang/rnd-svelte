import { writable } from 'svelte/store';

function createCart() {
	const { subscribe, set, update } = writable({
		id: 'wsdfasfdsfd',
		user: {},
		items: []
	});

	return {
		set,
		update,
		subscribe,
		updateItems: items =>
			update((n) => ({
				...n,
				items
			})),
		reset: () =>
			set(n => ({
				...n,
				items: []
			}))
	};
}

export const cartStore = createCart();
