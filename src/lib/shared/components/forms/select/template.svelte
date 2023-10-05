<script>
  /**
   * @param {string} [label]
   * @param {string} [name]
   * @param {string} value
   * @param {Array.<string>} items
   */
  export let label;
  export let name;
  export let value;
  export let items;
</script>

{#if label}
  <label for={name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
{/if}
<select id={name} bind:value={value} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>{name}</option>
  {#each items as item}
    <option value={item}>{item}</option>
  {/each}
</select>