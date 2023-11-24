<script>
	/**
	 * @param {string} [label]
	 * @param {string} [name]
	 * @param {string} [defaultValue]
	 * @param {string} value
	 * @param {Array.<string>} items
	 */
	export let label;
	export let name;
	export let value;
	export let items;
	export let defaultValue;
</script>

{#if label}
	<label for={name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>{label}</label
	>
{/if}
<select
	id={name}
	bind:value
	class="bg-slate-200 dark:bg-slate-600 border border-slate-300 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-yellow focus:border-yellow block w-full p-2.5 dark:border-slate-700 dark:placeholder-slate-400"
>
	<option selected>{defaultValue}</option>
	{#each items as item}
		<option value={item}>{item}</option>
	{/each}
</select>
