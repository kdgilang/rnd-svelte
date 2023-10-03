import { writable } from 'svelte/store';

export const siteSettings = writable({
  isDarkMode: false
});
