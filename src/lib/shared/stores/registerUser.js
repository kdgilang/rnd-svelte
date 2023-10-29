import { writable } from 'svelte/store';

export const registerUser = writable({
    waNumber: '',
    code: ''
});
