<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/**
	 * Switch Component
	 *
	 * @param {string} [label] - Optional text to display.
	 * @param {boolean} checked - Value
	 */
	export let label;
	export let checked;

	function onChange() {
		dispatch('change', {
			value: checked
		});
	}
</script>

<label class="relative inline-flex items-center cursor-pointer">
	<input type="checkbox" bind:checked on:change={onChange} class="sr-only peer" />
	<div
		class="w-11 h-6 rounded-full bg-black peer-checked:after:translate-x-full after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow"
	>
		<slot name="icon-indicator" />
	</div>
	{#if label}
		<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
	{/if}
</label>
